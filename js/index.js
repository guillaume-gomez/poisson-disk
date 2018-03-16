import Poisson from "poisson-disk-sampling";

export function createCanvas() {
  const canvas = document.createElement("CANVAS");
  canvas.width = 600;
  canvas.height = 600;
  canvas.id = 'myCanvas';
  canvas.style.backgroundColor = 'rgba(158, 167, 184, 0.2)';
  document.body.appendChild(canvas);
  setup(canvas);
}

function setup(canvas) {
  let context = canvas.getContext('2d');
  let centerX = canvas.width / 2;
  let centerY = canvas.height / 2;
  let radius = 1;

  const p = new Poisson([200, 300], 5, 25, 30);
  const points = p.fill();
  points.forEach(([x,y]) => {
    createDot(context, x, y, radius);
  });
}


function createDot(context, x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'black';
  context.fill();
}

document.addEventListener('DOMContentLoaded', function () {
  createCanvas();
});