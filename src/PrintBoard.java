public class PrintBoard {
    public static void printArr(int[] array) {
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
}
