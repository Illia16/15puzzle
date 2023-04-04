import java.util.Arrays;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

public class Game {
    private int[] data;
    private final int[] gaveOver = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0};
    private String userName;

    public Game() {
        int[] arr = this.initRandomize();
//      TO TEST when game is over
//      int[] arr = {1,2,3,4,5,6,7,8,9,10,11,12,13,0,14,15};
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
            int index = rnd.nextInt(i + 1);
            int a = arr[index];
            arr[index] = arr[i];
            arr[i] = a;
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
}
