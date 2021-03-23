// import { Mouse } from './objects/Mouse.js';

const canvas = document.getElementById('canvas-game');
const endgamepopup = document.getElementById('end-game');

const ctx = canvas.getContext('2d');

// Screen size
canvas.width = innerWidth - 10;
canvas.height = innerHeight - 10;

const scoreDisplay = (number) => {
    ctx.font = "20px Arial";
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + number, 10, 30);
}

const energyDisplay = (number) => {
    ctx.font = "20px Arial";
    ctx.fillStyle = 'white';
    ctx.fillText('energy: ' + number, 150, 30);
}

const player = new Player(innerWidth / 2, innerHeight / 2, 30, 'white', true, 5);

let projectiles = [];
let enemies = [];
let particles = [];
let shooting = {
    isShooting: false,
    xCoordinate: null,
    yCoordinate: null,
}
let score = 0;

let spawnInterval = null;


const hypot = (a, b) => {
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
}

const controller = {
    'w': {
        isPress: false,
        func: () => {
            player.moveUp()
        }
    },
    's': {
        isPress: false,
        func: () => {
            player.moveDown()
        }
    },
    'd': {
        isPress: false,
        func: () => {
            player.moveRight()
        }
    },
    'a': {
        isPress: false,
        func: () => {
            player.moveLeft()
        }
    },
}

let lastShoot = 0;
const shootRate = 200;

const executeShoot = () => {
    const now = performance.now();
    const canShoot = now - lastShoot > shootRate;

    if (player.isAlive && shooting.isShooting && canShoot) {
        const angle = Math.atan2(
            shooting.yCoordinate - player.y,
            shooting.xCoordinate - player.x)
        const velocity = {
            x: Math.cos(angle) * 13,
            y: Math.sin(angle) * 13
        }
        const projectile = new Projectile(player.x, player.y,
            5, 'white', velocity);
        projectiles.push(projectile)
        lastShoot = now;
    }
}

window.addEventListener('mousemove', (e) => {
    shooting = {...shooting, xCoordinate: e.clientX, yCoordinate: e.clientY }
})
window.addEventListener('mousedown', (e) => {
    shooting = {...shooting, isShooting: true }
})
window.addEventListener('mouseup', (e) => {
    shooting = {...shooting, isShooting: false }
})
window.addEventListener("keydown", (e) => {
    if (controller[e.key]) {
        controller[e.key].pressed = true;
    };
})
window.addEventListener("keyup", (e) => {
    if (controller[e.key]) {
        controller[e.key].pressed = false;
    };
})
const executeMoves = () => {
    Object.keys(controller).forEach(key => {
        controller[key].pressed && controller[key].func()
    })
}
const spawnEnemies = () => {
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
        x: Math.cos(angle) * ((Math.random() * 8) + 5),
        y: Math.sin(angle) * ((Math.random() * 8) + 5)
    }

    enemies.push(new Enemy(x, y, radius, `#${randomColor}`, velocity));
}
let delaySpawnTime = 1000;

// ====================================================================== //
let AnimationFrame = null;
const animate = (time) => {
    AnimationFrame = requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height); // clear everything

    // console.log(projectiles.length,enemies.length)
    if (player.isAlive) {
        player.update();
        delay(delaySpawnTime, () => spawnEnemies())
    };

    scoreDisplay(score);
    executeMoves();
    executeShoot();
    energyDisplay(player.energy);



    particles.forEach((particle, particleIndex) => {
        particle.update();
        if (particle.alpha < 0) {
            particles.splice(particleIndex, 1)
        }
    })

    projectiles.forEach((projectile, projectileIndex) => {
        projectile.update();
        destroyItemOutside(projectiles, projectile, projectileIndex)
    });


    // Hit enemy
    enemies.forEach((enemy, enemyIndex) => {
        enemy.update();
        destroyItemOutside(enemies, enemy, enemyIndex)
            // END GAME
        const distant = hypot(player.x - enemy.x, player.y - enemy.y);
        if (distant - player.radius - enemy.radius < 1) {
            clearInterval(spawnInterval);
            enemies = [];
            player.isAlive = false;

            for (let i = 0; i < 300; i++) {
                particles.push(new Particle(
                    player.x, player.y, 3, `#${Math.floor(Math.random() * 16777215).toString(16)}`, {
                        x: (Math.random() * Math.random() < 0.5 ? -1 : 1) * ((Math.random() * 5) + 1),
                        y: (Math.random() * Math.random() < 0.5 ? -1 : 1) * ((Math.random() * 5) + 1)
                    }, (Math.random() * 2) + 0.5, 0.98))
            }

            setTimeout(() => {
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
                    score += 50;
                    delaySpawnTime -= 50;
                    setTimeout(() => {
                        enemies.splice(enemyIndex, 1);
                        projectiles.splice(projectileIndex, 1);
                    }, 0)
                }
                setTimeout(() => {
                    projectiles.splice(projectileIndex, 1);
                }, 0)


                for (let i = 0; i < 12; i++) {

                    particles.push(new Particle(
                        projectile.x, projectile.y, 3, enemy.color, {
                            x: (Math.random() - 0.5) * 5,
                            y: (Math.random() - 0.5) * 5
                        }, (Math.random() * 2) + 0.5, 0.98))
                }
            }
        })
    })
};

animate()