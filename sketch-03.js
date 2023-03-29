const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const settings = {
  dimensions: [2048, 2048],
  animate: true,
};

const animate = () => {
  requestAnimationFrame(animate);
};
animate();

const sketch = ({ context, width, height }) => {
  const agents = [];

  for (let i = 0; i < 20; i++) {
    let x = random.range(100, width);
    let y = random.range(100, height);
    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    agents.forEach((agentFirstLoop) => {
      agents.forEach((agentSecondLoop) => {
        let distanceX = Math.abs(agentFirstLoop.pos.x - agentSecondLoop.pos.x);
        let distanceY = Math.abs(agentFirstLoop.pos.y - agentSecondLoop.pos.y);
        let hyp = distanceX + distanceY;

        if (hyp < 500) {
          context.lineWidth = math.mapRange(hyp, 0, 500, 12, 1);

          context.beginPath();
          context.moveTo(agentFirstLoop.pos.x, agentFirstLoop.pos.y);
          context.lineTo(agentSecondLoop.pos.x, agentSecondLoop.pos.y);
          context.stroke();
        }
      });
    });

    agents.forEach((agent) => {
      agent.bounce(height, width);
      agent.update();
      agent.draw(context);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.velocity = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4, 12);
  }

  update() {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }
  bounce(height, width) {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.velocity.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.velocity.y *= -1;
    }
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);

    // context.fillStyle = "black";
    context.lineWidth = 4;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    //context.fill();
    context.stroke();

    context.restore();
  }
}
class linkStroke {
  constructor() {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(300, 100);
    ctx.stroke();
  }
  draw() {}
}
