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

