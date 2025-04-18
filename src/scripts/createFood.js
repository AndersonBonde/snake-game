function createFood(p, size) {
  const cols = Math.floor(p.width / size);
  const rows = Math.floor(p.height / size);
  let pos = pickNewLocation();

  function pickNewLocation() {
    const newPos = p.createVector(Math.floor(p.random(cols)), Math.floor(p.random(rows)));

    return newPos.mult(size);
  }

  function isOnSnake(newPos, snakeBody) {
    return snakeBody.some((segment) => segment.x === newPos.x && segment.y === newPos.y);
  }

  function updatePos(snakeBody) {
    let newPos;

    do {
      newPos = pickNewLocation();
    } while (isOnSnake(newPos, snakeBody));

    pos = newPos;
  }

  function show() {
    p.fill(255, 0, 100);
    p.rect(pos.x, pos.y, size, size);
  }

  return {
    getPos: () => pos.copy(),
    updatePos,
    show,
  }
}

module.exports = createFood;
