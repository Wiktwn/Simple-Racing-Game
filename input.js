//function for taking inputs from the player
function inp() {
  if (keyIsDown(65)) {       // key 65 is the "a" key
    car.spinAccel += -spinRate;
  } else if (keyIsDown(68)) {// key 68 is the "d" key
    car.spinAccel += spinRate;
  }
  
  //if turning keys are pressed, decrease rotational friction
  if (!keyIsDown(65) && !keyIsDown(68)) {
    car.spinAccel *= spinDecay2;
  } else {
    car.spinAccel *= spinDecay1;
  }
  
  //defining the angle, x velocity and y velocity
  const a = radians(car.angle);
  const x = car.speed * cos(a);
  const y = car.speed * sin(a);
  
  //changing amounts of speed for forwards and backwards input
  if (keyIsDown(87)) {       // key 87 is the "w" key
    car.velocity.add(new Vector2(x, y));
  } else if (keyIsDown(83)) {//key 83 is the "s" key
    car.velocity.sub(new Vector2(x/3, y/3));
  }
}