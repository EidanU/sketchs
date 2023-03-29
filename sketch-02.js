const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const settings = {
  dimensions: [1080, 1080],
};

const degToRadian = (deg) => {
  return (deg / 180) * Math.PI;
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.08;
    const num = 24;
    const radius = width * 0.3;
    // Slice est la valeur en radian de 30 degrés
    const slice = degToRadian(360 / num);
    let x, y;

    for (let i = 0; i < num; i++) {
      const angle = slice * i;

      x = cx + radius * Math.sin(-angle);
      y = cy + radius * Math.cos(-angle);

      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.scale(random.range(0.7, 2), 1);

      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5, w, h);
      context.fill();

      context.restore();

      context.save();
      context.lineWidth = random.range(1, 20);
      context.translate(cx, cy);
      context.rotate(-angle);

      context.beginPath();
      context.arc(
        0,
        0,
        radius * random.range(0.7, 1.2),
        -slice * random.range(0.7, 3),
        slice * random.range(0.7, 3)
      );

      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);

/*
    context.save();
    context.translate(x, y);
    context.rotate(0.3);

    context.beginPath();
    context.rect(-w * 0.5, -h * 0.5, w, h);
    context.fill();
    context.restore();
*/
