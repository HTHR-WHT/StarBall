//space sketch

 let ball;
 let face;
 let bg;
 let clouds;
 let SCENE_W = 2000;
 let SCENE_H = 10000;

// let cloudx = (min, max) => (Math.floor(Math.random() * ()))

export function setup() {
  createCanvas(displayWidth, displayHeight);
  face = loadImage("assets/face.png");

  ball = createSprite(400, 200, 5, 5);

  ball.draw = function () {
    //the center of the sprite will be point 0,0
    //"this" in this function will reference the sprite itself

    //make the ellipse stretch in the sprite direction
    //proportionally to its speed
    push();
    rotate(radians(this.getDirection()));
    for (i = 0; i < 100; i += 10) {
      fill(255, 0, 255, 10); // transparent
      ellipse(0, 0, 105 + this.getSpeed() + i, 105 - this.getSpeed() + i);
    }
    fill(186, 85, 211);
    // fill(255, 0, 255);
    ellipse(0, 0, 100 + this.getSpeed(), 100 - this.getSpeed());
    pop();
    face.resize(45, 0);
    image(face, this.deltaX * 2, this.deltaY * 2);
  };

  ball.maxSpeed = 20;

  bg = new Group();

  //create some background for visual reference
  for (let i = 0; i < 900; i++) {
    //create a sprite
    let star = createSprite(
      random(-width, SCENE_W + width), //width is canvas (display) Width: 1440
      random(-height, SCENE_H + height) //height is canvas (display) Height: 900
    );
    //cycles through stars 0 1 2
    star.draw = function () {
      fill(255);
      ellipse(0, 0, 3, 3);
    };
    bg.add(star);
  }
  // make some clouds
  clouds = new Group();
  for (let i = 0; i < 55; i++) {
    let randomX = random(0, 1900);
    let randomY = random(0, 9000);

    let newCloud = new Cloud(randomX, randomY);

    let cloud = createSprite(newCloud.xPos, newCloud.yPos, 400, 30);
    cloud.draw = function () {
      newCloud.display();
    };
    clouds.add(cloud);
  }
}

export function draw() {
  background(0);

  //mouse trailer, the speed is inversely proportional to the mouse distance
  ball.velocity.x = (camera.mouseX - ball.position.x) / 20;
  ball.velocity.y = (camera.mouseY - ball.position.y) / 20;

  //a camera is created automatically at the beginning

  //.5 zoom is zooming out (50% of the normal size)
  if (mouseIsPressed) camera.zoom = 0.25;
  else camera.zoom = 1;

  //set the camera position to the ball position
  camera.position.x = ball.position.x;
  camera.position.y = ball.position.y;

  //limit the ball movements
  // if (ball.position.x < 0) ball.position.x = 0;
  // if (ball.position.y < 0) ball.position.y = 0;
  // if (ball.position.x > SCENE_W) ball.position.x = SCENE_W;
  // if (ball.position.y > SCENE_H) ball.position.y = SCENE_H;

  //draw the scene
  //stars first
  drawSprites(bg);
  //then ball
  drawSprite(ball);
  //clouds next
  drawSprites(clouds);
  //shadow using p5 drawing
  noStroke();
  fill(148, 0, 211, 50);
  //shadow
  // ellipse(ball.position.x, ball.position.y + 90, 80, 30);
  //character on the top
  if (ball.overlap(clouds)) {
    fill(255);
    text("yeeeeHAW!", ball.position.x + 20, ball.position.y + 5);
  }

  //I can turn on and off the camera at any point to restore
  //the normal drawing coordinates, the frame will be drawn at
  //the absolute 0,0 (try to see what happens if you don't turn it off
  camera.off();
}

export class Cloud {
  constructor(xPos, yPos) {
    this.cloudSize = 22;
    this.xPos = xPos;
    this.yPos = yPos;
    this.diameter;
    this.cloudArray = [];

    for (let i = 0; i < this.cloudSize; i++) {
      this.cloudArray.push({
        cloudX: int(random(this.xPos - 222, this.xPos + 222)),
        cloudY: int(random(this.yPos - 33, this.yPos + 3)),
        cloudD: int(random(33, 333)),
      });
    }
  }
  display() {
    push();
    noStroke();
    fill(222, 44);
    for (let i = 0; i < this.cloudArray.length - 1; i++) {
      ellipse(
        this.cloudArray[i].cloudX,
        this.cloudArray[i].cloudY,
        this.cloudArray[i].cloudD,
        this.cloudArray[i].cloudD
      );
    }
    pop();
  }
}
