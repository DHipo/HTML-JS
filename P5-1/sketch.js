let bird = new Bird(200, 400);
let wall = new Wall(800, 800);
let time

function setup() {
  createCanvas(800, 600)
}

function draw() {
  background(0,0,255, 100)
  if(bird.stillAlive == true){
    //Wbird.Update(time)
    wall.Update()
    let check = checkCollision()
  }else{
    menu()
  }
}

function checkCollision(){
  if(bird.x >= wall.x && bird.x <= wall.sizeX)
    return true
    else return false
}

function mousePressed(){
  let time = 10
  return time
}

function menu(){
  textAlign(CENTER, CENTER)
  fill(0)
  for(let i=1; i<50; i+10){
    textSize(i)
    text("Haz click para iniciar", width/2, height/2)
  }
}