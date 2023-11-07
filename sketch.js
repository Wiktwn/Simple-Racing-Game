let car;
let spinRate = 0.3;
let speed = 0.6;
let spinDecay1 = 0.95;
let spinDecay2 = 0.85;
let fr=60;

function setup() {
  //setup the canvas to be the width and hight of its window
  createCanvas(windowWidth, windowHeight);
  strokeWeight(1);
  stroke(0);
  
  //instantiate the car
  car = new Car(new Vector2(width/2, height/2), 0, new Vector2(0,0), 12, 7);
  car.speed = speed;
  frameRate(60);
}

function draw() {
  background(90);
  
  //input function defined in input.js
  inp();
  
  //step the car forward and the compute the graphics | declared in assets.js
  car.step();
  //car.trail();
  car.draw("lightgrey");
  
  //displaying the framerate
  if (frameCount%10 == 0) {
    fr = round(frameRate());
    //console.log(car.Trail.length)
  }
  noStroke();
  text(fr, 50, 50);
}