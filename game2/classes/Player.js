export class Player {
    constructor(x, y, radius) {
        this.x = x
        this.y = y
        this.radius = radius
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'black';
        ctx.fill();
    }
}