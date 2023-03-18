import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;
import java.util.Scanner;
import java.util.Arrays;

public class Main {
    static int[] arr = generateArray();
    public static void main(String[] args) {
        getInput();
    }

    public static int[] generateArray() {
        int[] arr = new int[16];
        for (int i = arr.length-1; i > 0; i--) {
            arr[i] = i;
        }

        Random rnd = ThreadLocalRandom.current();
        for (int i = arr.length - 1; i > 0; i--) {
            int index = rnd.nextInt(i + 1);
            int a = arr[index];
            arr[index] = arr[i];
            arr[i] = a;
        }

        return arr;
    }

    public static void getInput() {
        Scanner scanner = new Scanner(System.in);

        if (scanner.hasNextInt()) {
            System.out.println("Number");
            String input = scanner.nextLine();

            if (checkForNumber(input)) {
                System.out.println("Number is present!");
//                TO DO:
//                1) Check if movable
//                2) Move if movable, else return
//                3) Check if game is over


                PrintBoard.printArr(arr);


                int[] currentPosition = CurrentPositionXYStatic.getXY(Integer.parseInt(input), arr);
                int[] currentPositionHole = CurrentPositionXYStatic.getXY(0, arr);

                System.out.println(Arrays.toString(currentPosition));
                System.out.println(Arrays.toString(currentPositionHole));

                getInput();
            } else {
                System.out.println("Number is not present!");
                getInput();
            }
        } else {
            System.out.println("NaN");
            getInput();
        }
    }

    public static boolean checkForNumber(String v) {
        return Arrays.stream(arr).anyMatch(i -> i == Integer.parseInt(v));
    }
}