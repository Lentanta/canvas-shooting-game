class Player {
  constructor(x, y, radius, color, isAlive, speed) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.isAlive = isAlive
    this.speed = speed
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.draw();
  }

  moveUp() {
    if (this.y - this.radius > 0) {
      this.y -= this.speed
    }
  }
  moveDown() {
    if (this.y + this.radius < canvas.height) {
      this.y += this.speed
    }
  }
  moveRight() {
    if (this.x + this.radius < canvas.width) {
      this.x += this.speed
    }
  }
  moveLeft() {
    if (this.x - this.radius > 0) {
      this.x -= this.speed
    }
  }
}