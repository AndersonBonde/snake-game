function createSnake(p, size) {
  let pos = p.createVector(0, 0);
  let speed = p.createVector(1, 0);
  let ateFood = true;
  let snake = [];
  
  function update() {
    pos.x += speed.x * size;
    pos.y += speed.y * size;

    pos.x = p.constrain(pos.x, 0, p.width - size);
    pos.y = p.constrain(pos.y, 0, p.height - size);

    snake.unshift(pos.copy());

    if (!ateFood) {
      snake.pop();
    } else {
      ateFood = false;
    }
  }

  function show() {
    p.fill(255);
    for (let i = 0; i < snake.length; i++) {
      const cur = snake[i];
      p.rect(cur.x, cur.y, size, size);
    }
  }

  function dir(newX, newY) {
    speed = p.createVector(newX, newY);
  }

  function eat(foodPos) {
    const distance = p.dist(pos.x, pos.y, foodPos.x, foodPos.y);
    
    if (distance < 5) {
      ateFood = true;
      return true;
    }
    
    return false;
  }

  function checkDeath() {
    const head = snake[0];

    for (let i = 1; i < snake.length; i++) {
      const cur = snake[i];
      const dist = p.dist(head.x, head.y, cur.x, cur.y);

      if (dist < 5) {
        snake = [head];
        return true;
      }
    }

    return false;
  }

  return {
    get xSpeed() { return speed.x },
    get ySpeed() { return speed.y },
    update,
    show,
    dir,
    eat,
    checkDeath,
  }
}

module.exports = createSnake;
