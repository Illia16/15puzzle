import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

public class Store {
    int[] data;
    int [] gaveOver = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0};

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
//        TO TEST when game is over
//        int[] arr = {1,2,3,4,5,6,7,8,9,10,11,12,13,0,14,15};

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

    public int[] getGaveOver() {
        return gaveOver;
    }
}
