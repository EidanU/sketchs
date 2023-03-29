const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.lineWidth = 4;

    const myWidth = width * 0.1;
    const myHeight = height * 0.1;
    const gap = width * 0.03;
    let ix = width * 0.17;
    let iy = height * 0.17;
    let x, y;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        x = ix + (myWidth + gap) * i;
        y = iy + (myHeight + gap) * j;
        context.beginPath();
        context.strokeRect(x, y, myWidth, myHeight);
        context.stroke();
        if (Math.random() > 0.5) {
          context.beginPath();
          context.strokeRect(x + 10, y + 10, myWidth - 20, myHeight - 20);
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
