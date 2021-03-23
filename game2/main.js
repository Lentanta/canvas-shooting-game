import { Player } from './classes/Player.js';
import { Game } from './classes/Game.js';
import { Sprite } from './classes/Sprite.js';

window.canvas = document.getElementById('canvas-game');
window.ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const game = new Game();
const player = new Player(100, 100, 30);
const sprite = new Sprite('./assets/cannon.png', 100, 100, 100, 100)

const run = () => {
    let now = performance.now();
    let dt = (now - game.lastTime) / 1000.0;
    console.log(dt)

    game.lastTime = now;
    game.animationFrame = requestAnimationFrame(run);
    game.clearScreen();

    sprite.rotate(0, 0, 500, 500, 0);

}
run();