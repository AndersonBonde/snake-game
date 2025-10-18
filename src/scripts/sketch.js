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
  let isPaused = true;

  p.setup = () => {
    const canvas = p.createCanvas(400, 400);
    canvas.parent(document.querySelector('main'));
    p.frameRate(10);

    snake = createSnake(p, size);
    food = createFood(p, size);
    scoreTracker = createScoreTracker();
    updateScoreDisplay(scoreTracker.score);
    checkPause();
  };
  
  p.draw = () => {
    if (snake.checkDeath()) {
      scoreTracker.reset();
      updateScoreDisplay(scoreTracker.score);
      pause();
    }

    if (queueDirection && !directionChange) {
      const { dx, dy } = queueDirection;
      snake.dir(dx, dy);
      directionChange = true;
      queueDirection = null;
    }
    
    p.background(60);

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

  function checkPause() {
    if (isPaused) p.noLoop();
    else p.loop();
  }
  
    function pause() {
      isPaused = true;
      checkPause();
    }

  function unpause(dx, dy) {
    const { xSpeed, ySpeed } = snake;

    if ((dx !== -xSpeed || dy !== -ySpeed && isPaused)) {
      isPaused = false;
    }

    checkPause();
  }

  p.keyPressed = () => {
    const directions = {
      [p.UP_ARROW]: { dx: 0, dy: -1 },
      [p.DOWN_ARROW]: { dx: 0, dy: 1 },
      [p.LEFT_ARROW]: { dx: -1, dy: 0 },
      [p.RIGHT_ARROW]: { dx: 1, dy: 0 },
    }

    if (directions[p.keyCode]) {
      const { dx, dy } = directions[p.keyCode];
      
      trySetDirection(dx, dy);
      if (isPaused) unpause(dx, dy);

      return;
    }

    if (p.keyCode === 32) {
      isPaused = !isPaused;
      checkPause();
    }
  };
}

module.exports = createSketch;
