class Mouse {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.isPress = false;
    }
    isPressDown() {
        this.isPress = true;
    }
    isPressUp() {
        this.isPress = false;
    }
}