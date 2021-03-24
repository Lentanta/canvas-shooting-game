import { Game } from './classes/Game.js';
import { Player } from './classes/Player.js';

window.canvas = document.getElementById('canvas-game');
window.ctx = canvas.getContext('2d');

canvas.width = innerWidth - 30;
canvas.height = innerHeight - 30;
window.game = new Game();

game.eventListen();

const speedDiplay = (number) => {
    ctx.save();
    ctx.font = "20px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText('Tốc độ: ' + number.toFixed(1), 10, 30);
    ctx.restore();
}


// let lastTime = 0;
// const delay = (delayTime, callback) => {
//     const now = performance.now();
//     const activate = now - lastTime > delayTime;
//     if (activate) {
//         callback();
//         lastTime = now;
//     }
// }




const player = new Player(100, 100, 50, 50)
const run = () => {
    let now = performance.now();
    let dt = (now - game.lastTime) / 1000.0;
    game.lastTime = now;
    game.animationFrame = requestAnimationFrame(run);
    //===== RUN PART ====//
    game.clearScreen();
    player.update();
    speedDiplay(player.speed)


}

run();