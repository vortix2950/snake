// game.js

import Snake from './snake';

/** @class Game
  * Represents a snake game
  */
export default class Game {
  constructor() {
    this.snake = new Snake();
    this.food = [];
    // Create the canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = 100;
    this.canvas.height = 100;
    document.body.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');
  }
  update() {
    this.snake.update();
  }
  render() {
    this.snake.render(this.context);
  }
}
