// Snake.js

/** @class Snake
  * The snake in a Snake game
  */
export default class Snake {
  constructor(x, y, segments) {
    this.body = [];
    for(var i = 0; i < segments; i++) {
      this.body.push({
        x: x + i,
        y: y
      });
    }
    this.direction = 'down';
    // bind class methods
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.getPosition = this.getPosition.bind(this);
  }
  getPosition() {
    return {x: this.body[0].x, y: this.body[0].y};
  }
  update(input, gameOver) {
    var x = this.body[0].x;
    var y = this.body[0].y;

    // Prevent turning back on ourselves
  /*  if(!(this.direction === 'right' && input.direction === 'left'
      || this.direction === 'left' && input.direction === 'right'
      || this.direction === 'up' && input.direction === 'down'
      || this.direction === 'down' && input.direction === 'up'
    ))*/
    this.direction = input.direction;
    // Apply our movement
    switch(this.direction) {
      case 'right':
      //  x++;

        this.body.forEach(function(segment) {
        //    this.body.pop();
        segment.x=segment.x+8;

        })
        break;
      case 'left':
      this.body.forEach(function(segment) {
        //  this.body.pop();
        segment.x=segment.x-8;

      })
       //x--;
        break;
    ///  case 'up':
    //  this.body.forEach(function(segment) {
    //    segment.y--;
        //  this.body.pop();
    //  })
        //y--;
      //  break;
      //case 'down':
    //  y++;
    //this.body.forEach(function(segment) {
  //    segment.y++;
      //  this.body.pop();
  //  })
    //    break;
    }

    // Move the snake
  //  this.body.pop();
    //this.body.unshift({x: x, y: y});
    // Did we eat ourselves?
  //  for(var i = 1; i < this.body.length; i++) {
  //    if(x === this.body[i].x && y === this.body[i].y) {
  //      gameOver();
  //    }
  //  }

    // Did we eat food?
    // Do we need to grow?
  }
  /** @function render
    * Render the snake
    */
  render(ctx) {
    this.body.forEach(function(segment) {
      ctx.save();
      ctx.fillStyle = 'green';
      ctx.fillRect(segment.x,segment.y,2,2);
      ctx.restore();
    })
  }
}
