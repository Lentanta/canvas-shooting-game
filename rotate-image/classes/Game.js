export class Game {
    constructor() {
        this.animationFrame = null;
        this.lastTime = 0;
    }
    clearScreen() {
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

}