var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var width
var height

var resize = function() {
  width = window.innerWidth * 2
  height = window.innerHeight * 2
  canvas.width = width
  canvas.height = height
}
window.onresize = resize
resize()


var state = [
  {
    x: (width / 2),
    y: (height / 2),
  }
]


spawnApple()


function draw() {
  ctx.clearRect(0, 0, width, height)
  ctx.font = "60px Arial";
  ctx.fillText("Ayy your score lmao: " + state.length, 100, 100);
  ctx.fillStyle = 'lightgreen';
  for(var i = 0; i < state.length; i++){
    ctx.fillRect(state[i].x, state[i].y, 30, 30);
  }
  ctx.fillStyle = 'red';
  ctx.fillRect(state.appleX, state.appleY, 30, 30);
}

function keyDown(event){
  switch(event.key){
    case "ArrowRight":
      if(state.direction != "left"  || state.length == 1){
        state.direction = "right";
      }
      break;
    case "ArrowLeft":
      if(state.direction != "right"  || state.length == 1){
        state.direction = "left";
      }
      break;
    case "ArrowUp":
      if(state.direction != "down"  || state.length == 1){
        state.direction = "up";
      }
      break;
    case "ArrowDown":
      if(state.direction != "up"  || state.length == 1){
        state.direction = "down";
      }
      break;
  }
}

function keyUp(event){
  state.keyPressed = event.key;
}
var offset = 2;

function update(progress) {
  // console.log("Apple: " + state.appleX + " " + state.appleY + " Sneke " + Math.floor(state[0].x) + " "  + Math.floor(state[0].y));
  if((Math.floor(state[0].x) >= state.appleX - 20 && Math.floor(state[0].x) <= state.appleX + 30) && (Math.floor(state[0].y) <= state.appleY + 20 && Math.floor(state[0].y) >= state.appleY - 30)){
      spawnApple();
      state.push({});
  }

  // console.log("X: " + state[0].x + " Y: " + state[0].y);
  // console.log("Apple X: " + state.appleX + " Apple Y: " + state.appleY);



  switch(state.direction){
    case "right":
      state[0].x += progress/offset;
      if(state[0].x > width){
        state[0].x = 0;
      }
      break;
    case "left":
      state[0].x -= progress/offset;
      if(state[0].x <= 0){
        state[0].x = width;
      }
      break;
    case "up":
      state[0].y -= progress/offset;
      if(state[0].y <= 0){
        state[0].y = height;
      }
      break;
    case "down":
      state[0].y += progress/offset;
      if(state[0].y > height){
        state[0].y = 0;
      }
      break;
  }
}

var fps = 15;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;


function snakeTail(firstState){
  for(var i = state.length - 1; i > 0; i--){
    if(i != 0){
      state[i].x = firstState[i - 1].x;
      state[i].y = firstState[i - 1].y;
    }
  }
}
var idk = 0;

function loop() {
    requestAnimationFrame(loop);
    now = Date.now();
    delta = now - then;
    // if(state.length > 1){
      // console.log(state[0].x + " " + state[1].x);
    // }
    if (delta > interval) {
        update(delta)
        draw()
        snakeTail(state);
        selfCollision();
        then = now - (delta % interval);
    }
}

function selfCollision(){
  for(var i = 2; i < state.length; i++){
    if(state[0].x == state[i].x && state[0].y == state[i].y){
      console.log("shitter");
    }
  }
}

function spawnApple(){
  state.appleX = Math.floor((Math.random() * width) + 1);
  state.appleY = Math.floor((Math.random() * height) + 1);
}

var lastRender = 0
window.requestAnimationFrame(loop);
window.addEventListener("keydown", keyDown, false)
window.addEventListener("keyup", keyUp, false)
