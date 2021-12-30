var buttons = document.getElementsByClassName("btn");
var canvasContainer = document.getElementById("drawContainer");
var fillColor = document.getElementById("fillColor");
var strokeColor = document.getElementById("strockColor");
var strockWidth = document.getElementById("strockWidth");
var eraserSize = document.getElementById("eraserSize");
var brushSize = document.getElementById("brushSize");
var eSize = document.getElementById("size");
var bSize = document.getElementById("bsize");
var shape;
var clicked = false;
var pOneX;
var pOneY;
var pTwoX;
var pTwoY;

// adding event listeners
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    shape = this.id;
    console.log(shape);
  });
}

// show value of eraserSize
eraserSize.addEventListener("input", function () {
  eSize.value = "Size: " + eraserSize.value + "px";
});
brushSize.addEventListener("input", function () {
  bSize.value = "Size: " + brushSize.value + "px";
});

canvasContainer.onmousedown = function (e) {
  clicked = true;
  pOneX = e.offsetX;
  pOneY = e.offsetY;
  console.log("pOneX: " + pOneX);
  console.log("pOneY: " + pOneY);
};

canvasContainer.onmouseup = function (e) {
  clicked = false;
  pTwoX = e.offsetX;
  pTwoY = e.offsetY;
  console.log("pTwoX: " + pTwoX);
  console.log("pTwoY: " + pTwoY);
  draw(shape);
};

function draw(shape) {
  canvasContainer.onmousemove = function (e) {
    if (clicked) {
      var ctx = canvasContainer.getContext("2d");
      switch (shape) {
        case "line":
          console.log("draw line");
          drawLine(ctx);
          break;
        case "rect":
          console.log("draw rect");
          drawRect(ctx);
          break;
        case "circle":
          console.log("draw circle");
          drawCircle(ctx);
          break;
        default:
          if (shape == "brush") {
            console.log("using brush");
            ctx.beginPath();
            ctx.fillStyle = fillColor.value;
            ctx.arc(
              e.offsetX,
              e.offsetY,
              parseInt(brushSize.value),
              0,
              2 * Math.PI
            );
            ctx.fill();
            ctx.closePath();
          } else if (shape == "eraser") {
            console.log("using eraser");
            ctx.clearRect(
              e.offsetX,
              e.offsetY,
              parseInt(eraserSize.value),
              parseInt(eraserSize.value)
            );
          }
          break;
      }
    }
  };
}

function drawLine(canvas) {
  canvas.beginPath();
  canvas.moveTo(pOneX, pOneY);
  canvas.lineTo(pTwoX, pTwoY);
  setCommonAttributes(
    canvas,
    fillColor.value,
    strokeColor.value,
    parseInt(strockWidth.value)
  );
  canvas.closePath();
}

function drawRect(canvas) {
  canvas.beginPath();
  canvas.rect(pOneX, pOneY, Math.abs(pOneX - pTwoX), Math.abs(pOneY - pTwoY));
  setCommonAttributes(
    canvas,
    fillColor.value,
    strokeColor.value,
    parseInt(strockWidth.value)
  );
  canvas.closePath();
}

function drawCircle(canvas) {
  canvas.beginPath();
  canvas.arc(
    pOneX,
    pOneY,
    calculateRadius(pOneX, pOneY, pTwoX, pTwoY),
    0,
    2 * Math.PI
  );
  setCommonAttributes(
    canvas,
    fillColor.value,
    strokeColor.value,
    parseInt(strockWidth.value)
  );
  canvas.closePath();
}

function calculateRadius(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) / 2;
}

function setCommonAttributes(canvas, fill, stroke, lineWidth) {
  canvas.fillStyle = fill || "black";
  canvas.strokeStyle = stroke || "black";
  canvas.lineWidth = lineWidth || 0;
  canvas.fill();
  canvas.stroke();
}
