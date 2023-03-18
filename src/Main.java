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

        PrintBoard.printArr(arr);
        return arr;
    }

    public static void getInput() {
        Scanner scanner = new Scanner(System.in);

        if (scanner.hasNextInt()) {
            String input = scanner.nextLine();

            if (checkForNumber(input)) {
                int num = Integer.parseInt(input);
                System.out.println("Number is present:");
//                TO DO:
//                1) Check if movable // DONE
//                2) Move if movable, else return // DONE
//                3) Check if game is over


                int[] currentPosition = CurrentPositionXY.getXY(num, arr);
                int[] currentPositionHole = CurrentPositionXY.getXY(0, arr);

                if (checkIfMovable(currentPosition, currentPositionHole)) {
                    int idxNum = getPositionOfNumber(num, arr);
                    int idxHole = getPositionOfNumber(0, arr);
                    arr[idxNum] = 0;
                    arr[idxHole] = num;
                    PrintBoard.printArr(arr);
                }

                getInput();
            } else {
                System.out.println("Number is out of range: 1-15");
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

    public static boolean checkIfMovable(int[] cell, int[] hole) {
        return ( (Math.abs(cell[0]-hole[0]) == 1) && cell[1]-hole[1] == 0) || (cell[0]-hole[0]==
                0 && (Math.abs(cell[1]-hole[1]) ==1) );
    }

    public static int getPositionOfNumber(int number, int[] arr) {
        int pos = 0;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == number) {
                pos = i;
            }
        }

        return pos;
    }
}