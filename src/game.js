// game.js

import Snake from './snake';

/** @class Game
  * Represents a snake game
  */
export default class Game {
  constructor() {
    this.snake = new Snake(50, 50, 3);
    this.food = [];
    this.over = false;
    // Create the back buffer canvas
    this.backBufferCanvas = document.createElement('canvas');
    this.backBufferCanvas.width = 100;
    this.backBufferCanvas.height = 100;
    this.backBufferContext = this.backBufferCanvas.getContext('2d');
    // Create the screen buffer canvas
    this.screenBufferCanvas = document.createElement('canvas');
    this.screenBufferCanvas.width = 100;
    this.screenBufferCanvas.height = 100;
    document.body.appendChild(this.screenBufferCanvas);
    this.screenBufferContext = this.screenBufferCanvas.getContext('2d');
    // Bind class functions
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.loop = this.loop.bind(this);
    // Start the game loop
    this.interval = setInterval(this.loop, 500);
  }
  /** @method update
    * Updates the game world.
    */
  update() {
    this.food.forEach((food) => {
      food.update();
    });
    this.over = this.snake.update();
  }
  /** @method render
    * Renders the game world
    */
  render() {
    this.backBufferContext.fillStyle = '#ccc';
    this.backBufferContext.fillRect(0, 0, 100, 100);
    this.food.forEach((food) => {
      food.render(this.backBufferContext);
    })
    this.snake.render(this.backBufferContext);
    this.screenBufferContext.drawImage(this.backBufferCanvas,0,0)
  }
  loop() {
    this.update();
    this.render();
  }
}
