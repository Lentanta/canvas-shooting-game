export class Player {
    constructor(id, x, y, width, height) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.angle = 0;
        this.speed = 0;
    }

    draw() {
        if (this.img) {
            this.img.src = './assets/plane.png';
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.drawImage(this.img, -(this.width / 2), -(this.height / 2),
                this.width,
                this.height)
            ctx.restore();
        }
    }

    rotate() {
        if (game.controller['d'].pressed) {
            this.angle += 0.02;
        }
        if (game.controller['a'].pressed) {
            this.angle -= 0.02;
        }
    }

    speedControll() {
        if (game.controller['w'].pressed && this.speed < 10 - 0.05) {
            this.speed += 0.05;
        }
        if (game.controller['s'].pressed && this.speed > 0 + 0.02) {
            this.speed -= 0.02;
        }
    }

    move() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
    }
    returnToScreen() {
        if (this.x - this.width / 2 > canvas.width) {
            this.x = 0;
        }
    }

    update() {
        this.draw()
        this.rotate()
        this.speedControll()
        this.move()
        this.returnToScreen()
    }
}