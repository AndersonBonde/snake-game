import './styles.css';
import p5 from 'p5';
import createSnake from './scripts/createSnake';
import createFood from './scripts/createFood';

const sketch = (p) => {
  const size = 40;
  const snake = createSnake(p, size);
  let food;

  p.setup = () => {
    const canvas = p.createCanvas(400, 400);
    canvas.parent(document.querySelector('main'));
    p.frameRate(10);

    food = createFood(p, size);
  };

  p.draw = () => {
    p.background(60);
    snake.checkDeath();
    snake.update();
    snake.show();
    
    if (snake.eat(food.getPos())) 
      food.updatePos();

    food.show();
  };

  p.keyPressed = () => {
    const { xSpeed, ySpeed } = snake;

    switch (p.keyCode) {
      case (p.UP_ARROW): 
        if (ySpeed !== 1) snake.dir(0, -1); 
        break;
      case (p.DOWN_ARROW): 
       if (ySpeed !== -1) snake.dir(0, 1); 
       break;
      case (p.RIGHT_ARROW): 
        if (xSpeed !== -1) snake.dir(1, 0); 
        break;
      case (p.LEFT_ARROW): 
        if (xSpeed !== 1) snake.dir(-1, 0); 
        break;
    }
  }
};

new p5(sketch);
