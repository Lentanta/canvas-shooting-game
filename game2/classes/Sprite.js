export class Sprite {
    constructor(fileName, x, y, width, height) {
        this.image = new Image();
        this.fileName = fileName;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw() {
        this.image.src = this.fileName;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    rotate(x, y, w, h, angle) {
        this.image.src = this.fileName;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle * Math.PI / 180);
        ctx.drawImage(this.image, -(w / 2), -(h / 2), w, h)
        ctx.restore();
    }
}