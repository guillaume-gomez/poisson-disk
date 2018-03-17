import Poisson from "poisson-disk-sampling";

function createCanvas() {
  const canvas = document.createElement("CANVAS");
  canvas.width = 600;
  canvas.height = 800;
  canvas.id = 'myCanvas';
  canvas.style.backgroundColor = '#9E82B8';
  document.body.appendChild(canvas);
  return canvas;
}

function createExportButtonImg(canvas) {
  const button = document.createElement("BUTTON");
  button.innerHTML = 'export to png';
  button.onclick = () => { saveImage(canvas) };
  document.body.appendChild(button);
}

function createExportButtonImgNoBg(canvas) {
  const button = document.createElement("BUTTON");
  button.innerHTML = 'export to png without background color';
  button.onclick = () => { saveImage(canvas, false) };
  document.body.appendChild(button);
}

function createText(canvas) {
  let context = canvas.getContext('2d');
  context.font = "20px Arial";
  context.fillStyle = "black";
  context.textAlign = "center";
  context.fillText("g³", canvas.width - 15, canvas.height - 15); 
}

function init() {
  const canvas = createCanvas();
  createExportButtonImg(canvas);
  createExportButtonImgNoBg(canvas);
  createText(canvas);
  setup(canvas);
}

function setup(canvas) {
  let context = canvas.getContext('2d');
  let radius = 1;
  createGroup(context, radius, 200, 300, 15, 0);

}

function createDot(context, x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'black';
  context.fill();
}

function createGroup(context, radius, width, height, xOffset = 0, yOffset = 0) {
  const p = new Poisson([width, height], 5, 25, 30);
  const points = p.fill();
  points.forEach(([x,y]) => {
    createDot(context, x + xOffset, y + yOffset, radius);
  });
}

function saveImage(canvas, withBg = true) {
  // create a second canvas
  let destinationCanvas = document.createElement("canvas");
  destinationCanvas.width = canvas.width;
  destinationCanvas.height = canvas.height;

  let destCtx = destinationCanvas.getContext('2d');
  if (withBg) {
    //create a rectangle with the desired color
    destCtx.fillStyle = canvas.style.backgroundColor;
    destCtx.fillRect( 0, 0, canvas.width, canvas.height);
  }
  
  //draw the original canvas onto the destination canvas
  destCtx.drawImage(canvas, 0, 0);
  
  const image = destinationCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  window.location.href = image;
}


document.addEventListener('DOMContentLoaded', function () {
  init();
});
