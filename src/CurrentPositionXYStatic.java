public class CurrentPositionXYStatic {
    public static int[] getXY (int v, int[] arr) {
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
}
