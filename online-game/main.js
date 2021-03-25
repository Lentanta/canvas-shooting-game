import { Game } from './classes/Game.js';

window.canvas = document.getElementById('canvas-game');
window.ctx = canvas.getContext('2d');
window.ws = new WebSocket('ws://localhost:1337');

canvas.width = 700;
canvas.height = 700;
window.game = new Game();

game.eventListen();
ws.addEventListener('open', (m) => {
  const msg = JSON.stringify({ type: 'CONNECT', id: Math.floor((Math.random() * 100) + 1) })
  ws.send(msg)
})

ws.addEventListener('message', ({ data }) => {
  console.log(data)
})

const run = () => {
  let now = performance.now();
  let dt = (now - game.lastTime) / 1000;
  game.lastTime = now;
  game.animationFrame = requestAnimationFrame(run);
  //===== RUN PART ====//
  game.clearScreen();
}

run();