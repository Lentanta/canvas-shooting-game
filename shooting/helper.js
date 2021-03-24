const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const destroyItemOutside = (itemArray, item, itemIndex) => {
    if (item.x + item.radius < 0 ||
        item.x - item.radius > canvas.width ||
        item.y - item.radius > canvas.height ||
        item.y + item.radius < 0) {
        itemArray.splice(itemIndex, 1);
    }
}

let lastTime = 0;
const delay = (delayTime, callback) => {
    const now = performance.now();
    const activate = now - lastTime > delayTime;
    if (activate) {
        callback();
        lastTime = now;
    }
}