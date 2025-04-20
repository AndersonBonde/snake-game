const createSnake = require("./createSnake");
const createFood = require("./createFood");
const createScoreTracker = require('./scoreTracker');
const { updateScoreDisplay } = require('./UIController');

function createSketch(p) {
  const size = 25;
  let snake;
  let food;
  let scoreTracker;
  let directionChange;
  let queueDirection;

  p.setup = () => {
    const canvas = p.createCanvas(400, 400);
    canvas.parent(document.querySelector('main'));
    p.frameRate(10);

    snake = createSnake(p, size);
    food = createFood(p, size);
    scoreTracker = createScoreTracker();
    updateScoreDisplay(scoreTracker.score);
  };

  p.draw = () => {
    if (queueDirection && !directionChange) {
      const { dx, dy } = queueDirection;
      snake.dir(dx, dy);
      directionChange = true;
      queueDirection = null;
    }
    
    p.background(60);

    if (snake.checkDeath()) {
      scoreTracker.reset();
      updateScoreDisplay(scoreTracker.score);
    }

    snake.update();
    snake.show();
    
    if (snake.eat(food.pos)) {
      food.updatePos(snake.getBody());
      scoreTracker.increment();
      updateScoreDisplay(scoreTracker.score);
    }
    
    food.show();

    directionChange = false;
  };

  function trySetDirection(dx, dy) {
    const { xSpeed, ySpeed } = snake;

    if ((dx !== -xSpeed || dy !== -ySpeed)) {
      if (!directionChange) {
        snake.dir(dx, dy);
        directionChange = true;
      } else {
        queueDirection = { dx, dy };
      }
    }
  };

  p.keyPressed = () => {
    switch (p.keyCode) {
      case (p.UP_ARROW): trySetDirection(0, -1); break;
      case (p.DOWN_ARROW): trySetDirection(0, 1); break;
      case (p.RIGHT_ARROW): trySetDirection(1, 0); break;
      case (p.LEFT_ARROW): trySetDirection(-1, 0); break;
    }
  };
}

module.exports = createSketch;
