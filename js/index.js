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

// shared variable
let arrayPoints = [];
let minRows = 1;
let maxRows = 4;
let minColumns = 2;
let maxColumns = 3;
let minDistanceMin = 2;
let minDistanceMax = 5;
let maxDistanceMin = 5;
let maxDistanceMax = 15;

function createCanvas() {
  const canvas = document.createElement("CANVAS");
  canvas.width = 100 * 10;
  canvas.height = 100 * 12;
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

function bindPickColor() {
  $("#dot-color").change( function() {
    const newColor = `#${$(this).val()}`;
    let canvas = document.getElementById("myCanvas");
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    arrayPoints.forEach(({x,y}) => {
      createDot(context, x, y, RADIUS, newColor);
    });
  })
}

function bindNbRows() {
  $("#nb-rows").slider({});
}

function bindNbColumns() {
  $("#nb-columns").slider({});
}

function bindMinDistance() {
  $("#min-distance").slider({});
}

function bindMaxDistance() {
  $("#max-distance").slider({});
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
    bindNbRows();
    bindNbColumns();
    bindMinDistance();
    bindMaxDistance();
  }
  setup(canvas, color);
}

function setup(canvas, color) {
  arrayPoints = [];
  let context = canvas.getContext('2d');
  const rowOptions = $("#nb-rows").slider('getValue');
  const columnOptions = $("#nb-columns").slider('getValue');
  const minDistanceOptions = $("#min-distance").slider('getValue');
  const maxDistanceOptions = $("#max-distance").slider('getValue');

  minRows = rowOptions[0];
  maxRows = rowOptions[1];
  minColumns = columnOptions[0];
  maxColumns = columnOptions[1];
  minDistanceMin = minDistanceOptions[0];
  minDistanceMax = minDistanceOptions[1];
  maxDistanceMin = maxDistanceOptions[0];
  maxDistanceMax = maxDistanceOptions[1];

  generateGroupTree(context, TREE_X, TREE_Y, canvas.width, canvas.height, 1, color);
}

function createDot(context, x, y, radius, color) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
}

function createGroup(context, radius, xOffset, yOffset, width, height, color) {
  const minDistance = getRandomInt(minDistanceMin, minDistanceMax);
  const maxDistance = getRandomInt(maxDistanceMin, maxDistanceMax);

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
  const rows = getRandomInt(minRows, maxRows);
  const heightGroup = height / rows;

  const columns = getRandomInt(minColumns, maxColumns);
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
  //window.location.download = "zozo.png";
  //window.location.href = image;

  var anchor = window.document.createElement('a');
  anchor.setAttribute('download', 'poison-disk-image.png');
  anchor.setAttribute('href', image);
  anchor.click();

  anchor.remove();
}

function getRandomInt(min, max) {
  return (Math.round((max - min) * Math.random()) + min);
}


document.addEventListener('DOMContentLoaded', function () {
  init();
});
