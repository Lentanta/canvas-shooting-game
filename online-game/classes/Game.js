const controller = {
    'w': { pressed: false },
    's': { pressed: false },
    'a': { pressed: false },
    'd': { pressed: false }
};

export class Game {
    constructor() {
        this.animationFrame = null;
        this.lastTime = 0;
        this.controller = controller;
        this.isConnect = false;
    }
    clearScreen() {
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    eventListen() {
        addEventListener("keydown", (e) => {
            if (this.controller[e.key]) {
                console.log(e.key)
                this.controller[e.key].pressed = true;
            };
        })
        addEventListener("keyup", (e) => {
            if (this.controller[e.key]) {
                this.controller[e.key].pressed = false;
            };
        })
    }

}