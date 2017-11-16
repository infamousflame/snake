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


var state = {
  x: (width / 2),
  y: (height / 2),
  tail: 1
}

spawnApple()


function draw() {
  ctx.clearRect(0, 0, width, height)
  ctx.font = "30px Arial";
  ctx.fillText("Ayy your school lmao: " + state.tail, 100, 100);
  ctx.fillStyle = 'lightgreen';
  for(var i = 0; i < state.tail; i++){
    ctx.fillRect(state.x, state.y - (30 * i), 30, 30);
  }
  ctx.fillStyle = 'red';
  ctx.fillRect(state.appleX - 30, state.appleY - 30, 30, 30);
}

function keyDown(event){
  switch(event.key){
    case "ArrowRight":
      state.direction = "right";
      break;
    case "ArrowLeft":
      state.direction = "left";
      break;
    case "ArrowUp":
      state.direction = "up";
      break;
    case "ArrowDown":
      state.direction = "down";
      break;
  }
}

function keyUp(event){
  state.keyPressed = event.key;
}
var offset = 2;

function update(progress) {

  if((state.x >= state.appleX - 30 && state.x <= state.appleX + 40) && (state.y <= state.appleY + 40 && state.y >= state.appleY - 30)){
      spawnApple();
      state.tail++;
  }

  // console.log("X: " + state.x + " Y: " + state.y);
  // console.log("Apple X: " + state.appleX + " Apple Y: " + state.appleY);



  switch(state.direction){
    case "right":
      state.x += progress/offset;
      if(state.x > width){
        state.x = 0;
      }
      break;
    case "left":
      state.x -= progress/offset;
      if(state.x <= 0){
        state.x = width;
      }
      break;
    case "up":
      state.y -= progress/offset;
      if(state.y <= 0){
        state.y = height;
      }
      break;
    case "down":
      state.y += progress/offset;
      if(state.y > height){
        state.y = 0;
      }
      break;
  }
}

function loop(timestamp) {
  var progress = (timestamp - lastRender)

  update(progress)
  draw()

  lastRender = timestamp
  window.requestAnimationFrame(loop)
}

function spawnApple(){
  state.appleX = Math.floor((Math.random() * width) + 1);
  state.appleY = Math.floor((Math.random() * height) + 1);
}



var lastRender = 0
window.requestAnimationFrame(loop);
window.addEventListener("keydown", keyDown, false)
window.addEventListener("keyup", keyUp, false)
