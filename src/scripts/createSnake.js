function createSnake(p, size) {
  let x = 0;
  let y = 0;
  let xSpeed = 1;
  let ySpeed = 0;
  let ateFood = true;
  let snake = [];
  
  function update() {
    x += xSpeed * size;
    y += ySpeed * size;

    x = p.constrain(x, 0, p.width - size);
    y = p.constrain(y, 0, p.height - size);

    const newPos = p.createVector(x, y);
    snake.unshift(newPos);

    if (!ateFood) {
      snake.pop();
    } else {
      ateFood = false;
    }
  }

  function show() {
    p.fill(255);
    for (let i = 0; i < snake.length; i++) {
      p.rect(snake[i].x, snake[i].y, size, size);
    }
  }

  function dir(newX, newY) {
    xSpeed = newX;
    ySpeed = newY;
  }

  function eat(pos) {
    const distance = p.dist(x, y, pos.x, pos.y);
    
    if (distance < 5) {
      ateFood = true;
      return true;
    }
    
    return false;
  }

  function checkDeath() {
    
  }

  return {
    get xSpeed() { return xSpeed },
    get ySpeed() { return ySpeed },
    update,
    show,
    dir,
    eat,
    checkDeath,
  }
}

module.exports = createSnake;
