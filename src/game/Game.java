package game;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Arrays;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;
import java.util.HashMap;
import java.util.UUID;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import io.github.cdimascio.dotenv.Dotenv;

public class Game {
    private static final Dotenv dotenv = Dotenv.load();
    private int[] data;
    private final int[] gaveOver = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0};
    private String userName;
    private int userMoves;
    private int userTime = 0;
    private ScheduledExecutorService scheduler;

    public Game() {
        int[] arr = this.initRandomize();
        //  TO TEST when game is over
        //  int[] arr = {1,2,3,4,5,6,7,8,9,10,11,12,13,0,14,15};
        this.printBoard(arr);
        data = arr;
    }

    public int[] getData() {
        return data;
    }
    public int[] getGaveOver() { return gaveOver; }


    public int[] initRandomize() {
        int[] arr = new int[16];
        for (int i = arr.length-1; i > 0; i--) {
            arr[i] = i;
        }

        Random rnd = ThreadLocalRandom.current();
        for (int i = arr.length - 1; i > 0; i--) {
            int randomIndex = rnd.nextInt(i + 1);
            int valToReplace = arr[randomIndex];
            arr[randomIndex] = arr[i];
            arr[i] = valToReplace;
        }

        return arr;
    }

    public boolean checkIfMovable(int[] cell, int[] hole) {
        return ( (Math.abs(cell[0]-hole[0]) == 1) && cell[1]-hole[1] == 0) || (cell[0]-hole[0]==
                0 && (Math.abs(cell[1]-hole[1]) ==1) );
    }

    public void makeMove(int num, int idxNum, int idxHole) {
        this.data[idxNum] = 0;
        this.data[idxHole] = num;
    }

    public boolean checkForNumber(String v) {
        return Arrays.stream(this.getData()).anyMatch(i -> i == Integer.parseInt(v));
    }

    public int getNumberIndex(int number, int[] arr) {
        int pos = 0;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == number) {
                pos = i;
            }
        }

        return pos;
    }

    public int[] getXYCoordinates(int v, int[] arr) {
        int[] position = new int[2];

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == v) {
                position[0] = (i % 4) + 1;
                position[1] = (i / 4) + 1;
                break;
            }
        }

        return position;
    }

    public void printBoard(int[] array) {
        for (int i = 0; i < array.length; i++) {
            if (array[i] < 10) {
                System.out.print(" ");
            }
            System.out.print(array[i] + " ");
            if ((i + 1) % 4 == 0) {
                System.out.println();
            }
        }
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getUserMoves() {
        return userMoves;
    }

    public void setUserMoves(int userMoves) {
        this.userMoves = userMoves;
    }

    public int getUserTime() {
        return userTime;
    }

    public void setUserTime(int userTime) {
        this.userTime = userTime;
    }

    public String getApiUrl() {
        return dotenv.get("API_URL");
    }

    public String getApiKey() {
        return dotenv.get("API_KEY");
    }

    public List<Map<String, Object>> getUsersData() {
        String apiUrl = this.getApiUrl();
        String apiKey = this.getApiKey();

        // Create an HttpClient
        HttpClient client = HttpClient.newHttpClient();

        // Build the GET request with the x-api-key in the headers
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("x-api-key", apiKey)
                .GET()
                .build();

        // Send the request and get the response
        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                 // Parse the JSON response
                 ObjectMapper mapper = new ObjectMapper();
                 return mapper.readValue(response.body(), new TypeReference<List<Map<String, Object>>>(){});
            } else {
                System.out.println("Error: " + response.statusCode());
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

        // Return an empty list if there's an error
        return new ArrayList<>();
    }

    public void postUsersData() {
        String apiUrl = this.getApiUrl();
        String apiKey = this.getApiKey();

        ObjectMapper mapper = new ObjectMapper();
        String jsonPayload;
        String uniqueId = "java_" + UUID.randomUUID().toString();
        try {
            // Create a map with the required fields
            HashMap<String, Object> payload = new HashMap<>();
            payload.put("moves", this.getUserMoves());
            payload.put("time", this.getUserTime());
            payload.put("id", uniqueId);
            payload.put("name", this.getUserName());
            jsonPayload = mapper.writeValueAsString(payload);
        } catch (IOException e) {
            e.printStackTrace();
            return;
        }

        // Create an HttpClient
        HttpClient client = HttpClient.newHttpClient();

        // Build the GET request with the x-api-key in the headers
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("x-api-key", apiKey)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                .build();

        // Send the request and get the response
        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }


    public void startTimer() {
        scheduler = Executors.newScheduledThreadPool(1);

        Runnable task = () -> {
            userTime++;
        };

        // Schedule the task to run every second
        scheduler.scheduleAtFixedRate(task, 0, 1, TimeUnit.SECONDS);
    }

    public void stopTimer() {
        if (scheduler != null) {
            scheduler.shutdown();
            try {
                // Wait for currently running tasks to finish
                if (!scheduler.awaitTermination(1, TimeUnit.SECONDS)) {
                    scheduler.shutdownNow(); // Force shutdown if not terminated
                }
            } catch (InterruptedException e) {
                scheduler.shutdownNow();
                Thread.currentThread().interrupt();
            }
        }
    }
}
