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

    draw(angle, offset) {
        ctx.save();
        this.image.src = this.fileName;
        ctx.translate(this.x, this.y);
        ctx.rotate(angle + (offset * Math.PI / 180));
        ctx.drawImage(this.image,
            -(this.width / 2),
            -(this.height / 2),
            this.width,
            this.height)
        ctx.restore();
    }
}