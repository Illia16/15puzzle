public class CurrentPositionXY {
//    No point to have this done as NON-static since we're only retrieving the values
    public int x;
    public int y;

    public CurrentPositionXY(int v, int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == v) {
                this.x = (i % 4) + 1;
                this.y = (i / 4) + 1;
                break;
            }
        }
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }
}
