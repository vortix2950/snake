// game.js

import Snake from './snake';
import Food from './food';
import ball from './ball';
/** @class Game
  * Represents a snake game
  */
export default class Game {
  constructor() {
    this.snake = new Snake(80, 160, 20);
    this.ball=new ball(88,140,1);
    this.food = [];
    this.blocks=[
          ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
              ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                  ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                    ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                      ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                        ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                          ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                            ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                              ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                                ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                                  ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                                    ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                                      ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                                        ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                                          ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                                            ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                                              ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                                                ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                                                  ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                                                    ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                                                      ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                                                        ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                                                          ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                                                            ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                                                              ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                                                                ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                                                                  ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                                                                    ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                                                                      ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'],
                                                                        ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b']
                ];
    this.over = false;
    this.input = {
      direction: 'down'
    }
    var blockWidth;
    var blockHeight;
    var tileWidth  = Math.round(200/ 20),
        tileHeight = Math.round((200 / 20)/2);
       this. blockWidth=tileWidth;
        this.blockHeight=tileHeight;
    // Create the back buffer canvas
    this.backBufferCanvas = document.createElement('canvas');
    this.backBufferCanvas.width = 200;
    this.backBufferCanvas.height = 200;
    this.backBufferContext = this.backBufferCanvas.getContext('2d');
    // Create the screen buffer canvas
    this.screenBufferCanvas = document.createElement('canvas');
    this.screenBufferCanvas.width = 200;
    this.screenBufferCanvas.height = 200;
    document.body.appendChild(this.screenBufferCanvas);
    this.screenBufferContext = this.screenBufferCanvas.getContext('2d');
    // Create HTML UI Elements
    var message = document.createElement('div');
    message.id = "message";
    message.textContent = "";
    document.body.appendChild(message);
    var Score = document.createElement('div');
    Score.id = "Score";
    Score.textContent = "";
    document.body.appendChild(Score);
    var audio = document.createElement('audio');
    audio.id = "sound";
    audio.src = "bomb.mp3";
    audio.preload="auto";
    document.body.appendChild(audio);

    var laser = document.createElement('audio');
  laser.id = "laser";
    laser.src = "laser.mp3";
  laser.preload="auto";
    document.body.appendChild(laser);
    // Bind class functions
    this.gameOver = this.gameOver.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.loop = this.loop.bind(this);
    // Set up event handlers
    window.onkeydown = this.handleKeyDown;
    // Start the game loop
    this.interval = setInterval(this.loop,20);
  }
  /** @function gameOver
    * Displays a game over message using the DOM
    */
  gameOver() {
    var message = document.getElementById("message");
    message.innerText = "Game Over";
    this.over = true;
  }
  /** @method handleKeyDown
    * register when a key is pressed and change
    * our input object.
    */
  handleKeyDown(event) {
    event.preventDefault();
    switch(event.key){
      case 'w':
      case 'ArrowUp':
        this.input.direction = 'up';
          this.snake.update(this.input, this.gameOver);
        break;
      case 'a':
      case 'ArrowLeft':
        this.input.direction = 'left';
          this.snake.update(this.input, this.gameOver);
        break;
      case 's':
      case 'ArrowDown':
        this.input.direction = 'down';
          this.snake.update(this.input, this.gameOver);
        break;

      case 'd':
      case 'ArrowRight':
        this.input.direction = 'right';
          this.snake.update(this.input, this.gameOver);
        break;
    }
  }
  /** @method update
    * Updates the game world.
    */
  update() {

    if(!this.over) {
      // determine if the snake hit a wall
      var position = this.ball.getPosition();
      if(position.x < 0 || position.x >= 205 ||
         position.y < 0 || position.y >= 205) {
         return this.gameOver();
      }
  //document.getElementById("sound").play();
      // Create food
      //if(Math.random() < 0.1)
        this.food.push(new Food(Math.floor(Math.random() * 200), Math.floor(Math.random() * 200)));
      // Update snake and food
      this.food.forEach((food) => {
        food.update();
      });
    //  console.log(this.snake.getPosition().x,this.snake.getPosition().y,20,2, this.gameOver);

  this.ball.update(this.snake.getPosition().x,this.snake.getPosition().y,20,4,this.blocks,this.blockWidth,this.blockHeight, this.gameOver);
    }
  }
  /** @method render
    * Renders the game world
    */
  render() {
    this.backBufferContext.fillStyle = '#ccc';
    this.backBufferContext.fillRect(0, 0, 200, 200);
    this.food.forEach((food) => {
      food.render(this.backBufferContext);
    })
  this.renderBlocks();
    this.snake.render(this.backBufferContext);
    this.ball.render(this.backBufferContext);
    this.screenBufferContext.drawImage(this.backBufferCanvas,0,0);
  }
  loop() {
    this.update();
    this.render();
  }
  renderBlocks(){
   var rows=25;
   var columns=20;


       var tileWidth  = Math.round(200/ columns),
           tileHeight = Math.round((200 / rows)/2);
           //console.log("tileWidth:  " tileWidth );
          this. blockWidth=tileWidth;
           this.blockHeight=tileHeight;
            var Xindex;
             var Yindex;
             var currentColor = '#476ead';
         for(var x =0;x<20 ;x++){
           for(var y =0;y<20;y++){
             //this.backBufferContext.fillStyle ='#476ead';
             if(this.backBufferContext.fillStyle ==='#476ead'){
                this.backBufferContext.fillStyle = '#f9c24a';
             }
             else if(this.backBufferContext.fillStyle ==='#f9c24a'){
                this.backBufferContext.fillStyle = '#a81c70';
             }
             else if(this.backBufferContext.fillStyle ==='#a81c70'){
                this.backBufferContext.fillStyle = '#4a43ba';
             }
             else if(this.backBufferContext.fillStyle ==='#4a43ba'){
                this.backBufferContext.fillStyle = '#20e5ba';
             }
             else if(this.backBufferContext.fillStyle ==='#20e5ba'){
                this.backBufferContext.fillStyle = '#6bbf82';
             } else {    this.backBufferContext.fillStyle = '#476ead'}
            // console.log(this.blocks[y][x]);
        //  console.log(this.blocks[y][x]);
          //  console.log("x: "+x);

          //  console.log("y: "+ y + "  x:  "+ x +" this.block:   "+this.blocks[y][x] );

          //console.log("x: "+ x);
            if(this.blocks[y][x]==='b'){
              Xindex = x * tileWidth,
          Yindex = y * tileHeight;
 //console.log("tileWidth:  " +Yindex);
          this.backBufferContext.fillRect(Xindex, Yindex, tileWidth,tileHeight);
          this.screenBufferContext.drawImage(this.backBufferCanvas,x,y);
            }

             //  this.screenBufferContext.drawImage(this.backBufferCanvas,0,0)
           }

         }
 }



}
