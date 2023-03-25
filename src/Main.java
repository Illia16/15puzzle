import javax.swing.*;
import java.util.Scanner;
import java.util.Arrays;

public class Main {
    static Game data = new Game();
//    static UI ui = new UI(data);
    public static void main(String[] args) {
//        getInput();
        new UI(data);
    }

    public static void getInput() {
        Scanner scanner = new Scanner(System.in);

        // Get next input
        if (scanner.hasNextInt()) {
            String input = scanner.nextLine();

            // Check if input is a number
            if (data.checkForNumber(input)) {
                int num = Integer.parseInt(input);
                int[] currentPosition = data.getXYCoordinates(num, data.getData());
                int[] currentPositionHole = data.getXYCoordinates(0, data.getData());

                if (data.checkIfMovable(currentPosition, currentPositionHole)) {
                    int idxNum = data.getNumberIndex(num, data.getData());
                    int idxHole = data.getNumberIndex(0, data.getData());
                    System.out.printf("idxNum %s%n", idxNum);
                    System.out.printf("idxNum %s%n", idxHole);

                    data.makeMove(num, idxNum, idxHole);
                    data.printBoard(data.getData());
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
}