class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  add(v2) {
    this.x += v2.x;
    this.y += v2.y;
  }
  
  sub(v2) {
    this.x -= v2.x;
    this.y -= v2.y;
  }
  
  mult(x) {
    this.x *= x;
    this.y *= x;
  }
  
  mag(v2) {
    //returns the magnetude of the vector
    return sqrt((v2.x**2) + (v2.y**2));
  }
}

class Car {
  constructor(pos=new Vector2(0,0), angle=0, velocity=new Vector2(0,0), xs=0, ys=0) {
    //important variables for Car objects
    this.pos = pos;
    this.angle = angle;
    this.velocity = velocity;
    this.spinAccel = 0;
    this.speed = 0.5;
    this.xs = xs; this.ys = ys
    
    //trail variables
    this.Trail = [];
    this.trailDecayPercent = 0.01; //1 being 100% and 0.02 being 2%
    this.trailDecayCutoff = 0.8;
    
    //declare the vertexes of the rectangle
    this.points = [];
    this.points.push(spinZ(new Vector2(this.pos.x+xs,this.pos.y-ys),this.angle,this.pos));
    this.points.push(spinZ(new Vector2(this.pos.x+xs,this.pos.y+ys),this.angle,this.pos));
    this.points.push(spinZ(new Vector2(this.pos.x-xs,this.pos.y+ys),this.angle,this.pos));
    this.points.push(spinZ(new Vector2(this.pos.x-xs,this.pos.y-ys),this.angle,this.pos));
  }
  
  draw(color) {
    //color and stuff
    fill(color);
    strokeWeight(1);
    stroke(0);
    
    //define points of the quadrelateral
    const xs = this.xs;
    const ys = this.ys;
    const p1 = spinZ(new Vector2(this.pos.x+xs,this.pos.y-ys),this.angle,this.pos); 
    const p2 = spinZ(new Vector2(this.pos.x+xs,this.pos.y+ys),this.angle,this.pos);
    const p3 = spinZ(new Vector2(this.pos.x-xs,this.pos.y+ys),this.angle,this.pos); 
    const p4 = spinZ(new Vector2(this.pos.x-xs,this.pos.y-ys),this.angle,this.pos);
    
    //store points in Car object
    this.points[0] = p1;this.points[1] = p2;
    this.points[2] = p3;this.points[3] = p4;
    quad(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
  }
  
  step() {
    //add velocity to postition and decay velocity
    this.angle += this.spinAccel;
    this.velocity.mult(0.9);   
    this.pos.add(this.velocity);
  }
  
  trail() {
    let remove = [];
    strokeWeight(5);
    
    for (let i=0; i<this.Trail.length; i++) {
      //decay the trail opacity
      this.Trail[i][2] -= this.Trail[i][2] * this.trailDecayPercent;
      stroke(color(0, 0, 0, this.Trail[i][2]));
      
      //draw trail lines
      const p1 = this.Trail[i][0]; const p2 = this.Trail[i][1];
      line(p1.x, p1.y, p2.x, p2.y);
      
      //check for decayed trails and mark for removal
      if (this.Trail[i][2] < this.trailDecayCutoff) {
        remove.push(this.Trail[i]);
      }
    }
    
    //remove decayed trails
    for (let item of remove) {
      const index = this.Trail.indexOf(item);
      this.Trail.splice(index, 1);
    }
    
    //add new trail segments
    let x2 = this.pos.x - this.velocity.x;
    let y2 = this.pos.y - this.velocity.y;
    let x1 = this.pos.x; let y1 = this.pos.y;
    this.Trail.push([new Vector2(x1, y1), new Vector2(x2, y2), 255]);
  }
}

function spinZ(vector, angle, axis=new Vector2(0,0)) {// takes degrees, !not radians!
  // cos(angle), -sin(angle)
  // sin(angle),  cos(angle)
  //transform the points to be at 0,0
  vector.x -= axis.x;
  vector.y -= axis.y;
  angle = radians(angle);
  rotatedX = (vector.x * cos(angle)) + (vector.y * -sin(angle));
  rotatedY = (vector.x * sin(angle)) + (vector.y *  cos(angle));
  //transform points back to origional position
  rotatedX += axis.x;
  rotatedY += axis.y;
  return new Vector2(rotatedX, rotatedY);
}

function ccw(A,B,C) {
  //magic
  return (C.y-A.y) * (B.x-A.x) > (B.y-A.y) * (C.x-A.x);
}
  
function intersect(p1, p2, p3, p4) {
  //more magic
  return ccw(p1,p3,p4) != ccw(p2,p3,p4) && ccw(p1,p2,p3) != ccw(p1,p2,p4)
}