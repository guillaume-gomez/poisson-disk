import Poisson from "poisson-disk-sampling";

export function createCanvas() {
  const canvas = document.createElement("CANVAS");
  canvas.width = 600;
  canvas.height = 800;
  canvas.id = 'myCanvas';
  canvas.style.backgroundColor = '#9E82B8';
  document.body.appendChild(canvas);
  setup(canvas);
}

function setup(canvas) {
  let context = canvas.getContext('2d');

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