import java.lang.reflect.Array;
import java.util.Scanner;
import java.util.Arrays;

public class Main {
    static Store data = new Store();
    public static void main(String[] args) {
        getInput();
    }

    public static void getInput() {
        Scanner scanner = new Scanner(System.in);

        if (scanner.hasNextInt()) {
            String input = scanner.nextLine();

            if (checkForNumber(input)) {
                int num = Integer.parseInt(input);
//                TO DO:
//                1) Check if movable // DONE
//                2) Move if movable, else return // DONE
//                3) Check if game is over // DONE


                int[] currentPosition = CurrentPositionXY.getXY(num, data.getData());
                int[] currentPositionHole = CurrentPositionXY.getXY(0, data.getData());

                if (checkIfMovable(currentPosition, currentPositionHole)) {
                    int idxNum = getPositionOfNumber(num, data.getData());
                    int idxHole = getPositionOfNumber(0, data.getData());
                    data.setNumber(num, idxNum, idxHole);
                    PrintBoard.printArr(data.getData());
                    System.out.println(Arrays.toString(data.getData()));
                    System.out.println(Arrays.toString(data.getGaveOver()));
                    if (Arrays.equals(data.getData(), data.getGaveOver())) {
                        System.out.println("Game over");
                        System.exit(0);
                        scanner.close();
                    }
                } else {
                    System.out.println("Number is present, but not movable:");
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
        return Arrays.stream(data.getData()).anyMatch(i -> i == Integer.parseInt(v));
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