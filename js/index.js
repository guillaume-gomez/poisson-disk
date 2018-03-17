import Poisson from "poisson-disk-sampling";

const RADIUS = 1;
const TREE_X = 5;
const TREE_Y = 5;
const OFFSET_X_MIN = 0;
const OFFSET_X_MAX = 10;
const OFFSET_Y_MIN = 0;
const OFFSET_Y_MAX = 10;
const DEPTH_MAX = 2;



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
  setup(canvas);
}

function setup(canvas) {
  let context = canvas.getContext('2d');
  generateGroupTree(context, TREE_X, TREE_Y, canvas.width, canvas.height, 1);
}

function createDot(context, x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'black';
  context.fill();
}

function createGroup(context, radius, xOffset, yOffset, width, height) {
  const minDistance = getRandomInt(2, 5);
  const maxDistance = getRandomInt(5, 15);
  const p = new Poisson([width, height], minDistance, maxDistance, 30);
  const points = p.fill();
  points.forEach(([x,y]) => {
    createDot(context, x + xOffset, y + yOffset, radius);
  });
}

function generateGroupTree(context, x, y, width, height, depth) {
  if(depth > DEPTH_MAX) {
    createGroup(context, RADIUS, x, y, width, height);
    return;
  }
  const rows = getRandomInt(1, 4);
  const heightGroup = height / rows;
  
  const columns = getRandomInt(2, 3);
  const widhGroup = width / columns;

  for(let yOffset = 0; yOffset < rows; yOffset++) {
    const offsetGroupY = getRandomInt(OFFSET_X_MIN, OFFSET_X_MAX);
    for(let xOffset = 0; xOffset < columns; xOffset++) {
      const offsetGroupX = getRandomInt(OFFSET_Y_MIN, OFFSET_Y_MAX);
      generateGroupTree(context, x + (xOffset * widhGroup), y + (yOffset * heightGroup), widhGroup - offsetGroupX, heightGroup - offsetGroupY, depth + 1);
    }
  }
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

  //add signature :)
  createText(destinationCanvas);
  
  const image = destinationCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  window.location.href = image;
}

function getRandomInt(min, max) { 
  return (Math.round((max - min) * Math.random()) + min);
}


document.addEventListener('DOMContentLoaded', function () {
  init();
});
