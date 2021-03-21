const canvas = document.getElementById('canvas-game');
const endgamepopup = document.getElementById('end-game')

const { innerWidth, innerHeight, requestAnimationFrame, cancelAnimationFrame } = window;

const main2D = canvas.getContext('2d');
console.log(main2D, innerWidth, innerHeight)

// Screen size
canvas.width = innerWidth - 10;
canvas.height = innerHeight - 10;

class Player {
    constructor(x, y, radius, color, isAlive) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.isAlive = isAlive
    }

    draw() {
        main2D.beginPath();
        main2D.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        main2D.fillStyle = this.color;
        main2D.fill();
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.veclocity = velocity;
    }

    draw() {
        main2D.beginPath();
        main2D.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        main2D.fillStyle = this.color;
        main2D.fill();
    }

    update() {
        this.draw()
        this.x += this.veclocity.x;
        this.y += this.veclocity.y;
    }
}

class Enemy {
    constructor(x, y, radius, color, veclocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.veclocity = veclocity
    }

    draw() {
        main2D.beginPath();
        main2D.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        main2D.fillStyle = this.color;
        main2D.fill();
    }
    update() {
        this.draw();
        this.x += this.veclocity.x;
        this.y += this.veclocity.y;
    }
}

const friction = 0.99;
class Particle {
    constructor(x, y, radius, color, veclocity, alpha) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.veclocity = veclocity
        this.alpha = alpha
    }

    draw() {
        main2D.save();
        main2D.globalAlpha = this.alpha;
        main2D.beginPath();
        main2D.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        main2D.fillStyle = this.color;
        main2D.fill();
        main2D.restore();
    }
    update() {
        this.draw();
        this.veclocity.x *= friction;
        this.veclocity.y *= friction;
        this.x += this.veclocity.x;
        this.y += this.veclocity.y;
        this.alpha -= 0.02;
    }
}

const scoreDisplay = (number) => {
    main2D.font = "20px Arial";
    main2D.fillStyle = 'white';
    main2D.fillText('Score: ' + number, 10, 30);
}

const player = new Player(innerWidth / 2, innerHeight / 2, 30, 'white', true);

let projectiles = [];
let enemies = [];
let particles = [];
let score = 0;

let spawnInterval = null;
const spawnEnemies = (spawnTime) => {
    spawnInterval = setInterval(() => {
        const radius = (Math.random() * 30) + 10;
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);

        let x = null;
        let y = null;

        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;

        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }

        const angle = Math.atan2(player.y - y, player.x - x)
        const velocity = {
            x: Math.cos(angle) * 5,
            y: Math.sin(angle) * 5
        }

        enemies.push(new Enemy(x, y, radius, `#${randomColor}`, velocity));
    }, spawnTime)
}

const hypot = (a, b) => {
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
}


window.addEventListener('click', (e) => {
    if (player.isAlive) {
        const angle = Math.atan2(e.clientY - player.y, e.clientX - player.x)
        const velocity = {
            x: Math.cos(angle) * 13,
            y: Math.sin(angle) * 13
        }
        const projectile = new Projectile(player.x, player.y,
            5, 'white', velocity);
        projectiles.push(projectile)
    }
})

window.addEventListener("keypress", (e) => {
    console.log(e.key)
    if (e.key === 'ArrowUp' || e.key === 'w') {
        player.y -= 10;
    }
    if (e.key === 'ArrowDown' || e.key === 's') {
        player.y += 10;
    }
    if (e.key === 'ArrowRight' || e.key === 'd') {
        player.x += 10;
    }
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        player.x -= 10;
    }
})


spawnEnemies(1000);

// Run time
let AnimationFrame = null;
const animate = () => {
    AnimationFrame = requestAnimationFrame(animate);
    main2D.fillStyle = 'rgba(0,0,0,0.2)';
    main2D.fillRect(0, 0, canvas.width, canvas.height); // clear everything
    scoreDisplay(score);
    if (player.isAlive) {
        player.draw();
    }


    particles.forEach((particle, particleIndex) => {
        particle.update();
        if (particle.alpha < 0) {
            particles.splice(particleIndex, 1)
        }
    })

    projectiles.forEach((projectile, projectileIndex) => {
        projectile.update();

        if (projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > canvas.width ||
            projectile.y - projectile.radius > canvas.height ||
            projectile.y + projectile.radius < 0) {

            projectiles.splice(projectileIndex, 1);

        }
    });

    // Hit enemy
    enemies.forEach((enemy, enemyIndex) => {
        enemy.update();
        const distant = hypot(player.x - enemy.x, player.y - enemy.y);

        // END GAME
        if (distant - player.radius - enemy.radius < 1) {
            clearInterval(spawnInterval);
            enemies = [];
            player.isAlive = false;

            for (let i = 0; i < 300; i++) {
                particles.push(new Particle(
                    player.x, player.y, 3, player.color, {
                        x: (Math.random() - 0.5) * 5,
                        y: (Math.random() - 0.5) * 5
                    }, 2))
            }

            setTimeout(() => {
                console.log("STOP")
                endgamepopup.style.display = 'block';
                endgamepopup.querySelector("#score").innerHTML = `Score: ${score}`
                cancelAnimationFrame(AnimationFrame);
            }, 3000)

        }


        // Hit enemy
        projectiles.forEach((projectile, projectileIndex) => {
            const distant = hypot(projectile.x - enemy.x, projectile.y - enemy.y);

            if (distant - projectile.radius - enemy.radius < 1) {
                enemy.radius -= 10;
                if (enemy.radius <= 8) {
                    score += 100;
                    setTimeout(() => {
                        enemies.splice(enemyIndex, 1);
                        projectiles.splice(projectileIndex, 1);
                    }, 0)
                }
                setTimeout(() => {
                    projectiles.splice(projectileIndex, 1);
                }, 0)


                for (let i = 0; i < enemy.radius; i++) {
                    particles.push(new Particle(
                        projectile.x, projectile.y, 3, enemy.color, {
                            x: (Math.random() - 0.5) * 5,
                            y: (Math.random() - 0.5) * 5
                        }, 2))
                }
            }
        })
    })
};

animate()