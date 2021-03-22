class Particle {
	constructor(x, y, radius, color, veclocity, alpha, friction) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.veclocity = veclocity
		this.alpha = alpha
    this.friction = friction
	}

	draw() {
		ctx.save();
		ctx.globalAlpha = this.alpha;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.restore();
	}
	update() {
		this.draw();
		this.veclocity.x *= this.friction;
		this.veclocity.y *= this.friction;
		this.x += this.veclocity.x;
		this.y += this.veclocity.y;
		this.alpha -= 0.02;
	}
}