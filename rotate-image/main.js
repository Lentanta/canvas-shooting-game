import { Player } from './classes/Player.js';
import { Game } from './classes/Game.js';
import { Sprite } from './classes/Sprite.js';

window.canvas = document.getElementById('canvas-game');
window.ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const game = new Game();
const player = new Player(100, 100, 30);
const sprite = new Sprite('./assets/cannon.png', 100, 100, 50, 50)
const sprite1 = new Sprite('./assets/cannon.png', 50, 500, 50, 50)
const sprite2 = new Sprite('./assets/cannon.png', 300, 700, 50, 50)
const sprite3 = new Sprite('./assets/cannon.png', 800, 50, 50, 50)

let angle = 0;
let x;
let y
addEventListener('mousemove', (e) => {
    x = e.clientX;
    y = e.clientY;
    angle = Math.atan2(e.clientY - 100, e.clientX - 100) ;
})


const run = () => {
    let now = performance.now();
    let dt = (now - game.lastTime) / 1000.0;
    // console.log(dt)  
    console.log("Angle: ", angle)

    game.lastTime = now;
    game.animationFrame = requestAnimationFrame(run);
    game.clearScreen();

    // ctx.beginPath();
    // ctx.moveTo(100, 100);
    // ctx.lineTo(x, y);
    // ctx.stroke();

    sprite.draw(Math.atan2(y - sprite.y, x - sprite.x) , 90);
    sprite1.draw(Math.atan2(y - sprite1.y, x - sprite1.x), 90);
    sprite2.draw(Math.atan2(y - sprite2.y, x - sprite2.x), 90);
    sprite3.draw(Math.atan2(y - sprite3.y, x - sprite3.x), 90);

}
run();