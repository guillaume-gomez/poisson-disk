import Poisson from "poisson-disk-sampling";

const RADIUS = 1;
const TREE_X = 5;
const TREE_Y = 5;
const OFFSET_X_MIN = 0;
const OFFSET_X_MAX = 20;
const OFFSET_Y_MIN = 0;
const OFFSET_Y_MAX = 20;
const DEPTH_MAX = 2;
const VAR_X = 10;
const VAR_Y = 10;

// only shared variable
let arrayPoints = [];

function createCanvas() {
  const canvas = document.createElement("CANVAS");
  canvas.width = 100 * 8;
  canvas.height = 100 * 10;
  canvas.id = 'myCanvas';
  canvas.style.backgroundColor = '#9E82B8';

  const canvasDiv = document.getElementById("canvasId");
  canvasDiv.appendChild(canvas);
  return canvas;
}

function bindExportButtonImg(canvas) {
  $("#export-to-png").click( function() {
    saveImage(canvas);
  });
}

function bindExportButtonImgNoBg(canvas) {
  $("#export-to-png-no-bg").click( function() {
    saveImage(canvas, false);
  });
}

function bindResetButton(canvas) {
  $("#reset").click( function() {
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    init(false)
  });
}

function createText(canvas) {
  let context = canvas.getContext('2d');
  context.font = "20px Arial";
  context.fillStyle = "black";
  context.textAlign = "center";
  context.fillText("g³", canvas.width - 15, canvas.height - 15);
}

function init(createItems = true) {
  let canvas = document.getElementById("myCanvas");
  let color = `#${$("#dot-color").val()}` || "#FF0000";
  if(createItems) {
    canvas = createCanvas();
    bindExportButtonImg(canvas);
    bindExportButtonImgNoBg(canvas);
    bindResetButton(canvas);
    bindPickColor();
  }
  setup(canvas, color);
}

function setup(canvas, color) {
  arrayPoints = [];
  let context = canvas.getContext('2d');
  generateGroupTree(context, TREE_X, TREE_Y, canvas.width, canvas.height, 1, color);
}

function createDot(context, x, y, radius, color) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
}

function createGroup(context, radius, xOffset, yOffset, width, height, color) {
  const minDistance = getRandomInt(2, 5);
  const maxDistance = getRandomInt(5, 15);
  const p = new Poisson([width, height], minDistance, maxDistance, 30);
  const points = p.fill();
  points.forEach(([x,y]) => {
    //save points
    arrayPoints.push({x: x + xOffset, y: y + yOffset});

    createDot(context, x + xOffset, y + yOffset, radius, color);
  });
}

function generateGroupTree(context, x, y, width, height, depth, color) {
  if(depth > DEPTH_MAX) {
    createGroup(context, RADIUS, x, y, width, height, color);
    return;
  }
  const rows = getRandomInt(1, 4);
  const heightGroup = height / rows;

  const columns = getRandomInt(2, 3);
  const widthGroup = width / columns;

  let currentWidth = 0;
  let currentHeight = 0;
  for(let yOffsetIt = 0; yOffsetIt < rows; yOffsetIt++) {
    const offsetGroupY = getRandomInt(OFFSET_X_MIN, OFFSET_X_MAX);
    for(let xOffsetIt = 0; xOffsetIt < columns; xOffsetIt++) {
      const offsetGroupX = getRandomInt(OFFSET_Y_MIN, OFFSET_Y_MAX);

      currentWidth = (xOffsetIt * widthGroup);
      currentHeight = (yOffsetIt * heightGroup);
      const newWidth = widthGroup;
      const newHeight = heightGroup;
      const newX = x + currentWidth;
      const newY = y + currentHeight;
      generateGroupTree(context, newX, newY, newWidth - offsetGroupX, newHeight - offsetGroupY, depth + 1, color);
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
    destCtx.fillRect(0, 0, canvas.width, canvas.height);
  }

  //draw the original canvas onto the destination canvas
  destCtx.drawImage(canvas, 0, 0);

  //add signature :)
  //createText(destinationCanvas);
  const image = destinationCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  window.location.href = image;
}

function getRandomInt(min, max) {
  return (Math.round((max - min) * Math.random()) + min);
}


document.addEventListener('DOMContentLoaded', function () {
  init();
});
