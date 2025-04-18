function createSnake(p, size) {
  let x = 0;
  let y = 0;
  let xSpeed = 1;
  let ySpeed = 0;
  let total = 0;
  let tail = [];
  
  function update() {
    if (total === tail.length) {
      for (let i = 0; i < tail.length - 1; i++) {
        tail[i] = tail[i + 1];
      }
    }
    tail[total - 1] = p.createVector(x, y);

    x += xSpeed * size;
    y += ySpeed * size;

    x = p.constrain(x, 0, p.width - size);
    y = p.constrain(y, 0, p.height - size);
  }

  function show() {
    p.fill(255);
    for (let i = 0; i < tail.length; i++) {
      p.rect(tail[i].x, tail[i].y, size, size);
    }
    p.rect(x, y, size, size);
  }

  function dir(newX, newY) {
    xSpeed = newX;
    ySpeed = newY;
  }

  function eat(pos) {
    const distance = p.dist(x, y, pos.x, pos.y);
    
    if (distance < 5) {
      total++;
      return true;
    }
    
    return false;
  }

  function checkDeath() {
    for (let i = 0; i < tail.length; i++) {
      const distance = p.dist(x, y, tail[i].x, tail[i].y);

      if (distance < 5) {
        total = 0;
        tail = [];

        return true;
      }
    }

    return false;
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
