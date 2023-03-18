import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

public class Store {
    int[] data;

    public Store() {
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
        data = arr;
    }

    public int[] getData() {
        return data;
    }

    public void setNumber(int num, int idxNum, int idxHole) {
        this.data[idxNum] = 0;
        this.data[idxHole] = num;
    }
}
