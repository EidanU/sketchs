const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [2048, 2048],
};
const num = 20;
const sphereArray = [];
const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < num; i++) {
      for (let y = 0; y < num; y++) {
        let sphere = new Sphere(width / num, height / num, 30, i, y);
        sphere.draw(context);
        sphereArray.push(sphere);
      }
    }

    document
      .getElementsByTagName("canvas")[0]
      .addEventListener("mousemove", (e) => {
        sphereArray.forEach((sphere) => {
          if (
            (e.clientX <= sphere.pos.x + sphere.radius ||
              e.clientX >= sphere.pos.x - sphere.radius) &&
            (e.clientY <= sphere.pos.y + sphere.radius ||
              e.clientY >= sphere.pos.y - sphere.radius)
          ) {
            console.log(e.clientX);
          } else {
            scaling;
          }
        });
      });
  };
};

// On map une premiere fois pour remplir un tableau avec la position en x et y de chaque sphere
// Le x et le y sont les memes pour tous, soit width / num, height / num

// On map dessus pour les draw et là

canvasSketch(sketch, settings);

class Sphere {
  constructor(x, y, radius, posX, posY) {
    this.x = x;
    this.y = y;
    this.pos = { x: this.x * posX, y: this.y * posY };
    this.radius = radius;
  }

  draw(context) {
    context.save();
    context.fillStyle = "black";
    context.translate(this.x / 2, this.y / 2);
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  scaling(context) {
    context.save();
    context.scale(2, 1);
    context.restore();
  }
}
