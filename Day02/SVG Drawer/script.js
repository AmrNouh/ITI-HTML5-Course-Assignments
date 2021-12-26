var buttons = document.getElementsByClassName("btn");
var svgContainer = document.getElementById("drawContainer");
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
  });
}

svgContainer.onmousedown = function (e) {
  clicked = true;
  pOneX = e.offsetX;
  pOneY = e.offsetY;
  console.log("pOneX: " + pOneX);
  console.log("pOneY: " + pOneY);
};

svgContainer.onmouseup = function (e) {
  clicked = false;
  pTwoX = e.offsetX;
  pTwoY = e.offsetY;
  console.log("pTwoX: " + pTwoX);
  console.log("pTwoY: " + pTwoY);
  draw(shape);
};

function draw(shape) {
  switch (shape) {
    case "line":
      console.log("draw line");
      drawLine();
      break;
    case "rect":
      console.log("draw rect");
      drawRect();
      break;
    case "circle":
      console.log("draw circle");
      drawCircle();
      break;
  }
}

function drawLine() {
  var line = document.createElementNS("http://www.w3.org/2000/svg", "path");
  setCommonAttributes(line, "black", "black", "5");
  line.setAttribute("stroke-linecap", "round");
  line.setAttribute(
    "d",
    "M" + pOneX + " " + pOneY + " " + "L" + pTwoX + " " + pTwoY
  );
  svgContainer.appendChild(line);
}

// issue Need to Calculate Width and Height
// x1 = ?  ;  y1 = ? ;    // First diagonal point
//   x2 = ?  ;  y2 = ? ;    // Second diagonal point

//   xc = (x1 + x2)/2  ;  yc = (y1 + y2)/2  ;    // Center point
//   xd = (x1 - x2)/2  ;  yd = (y1 - y2)/2  ;    // Half-diagonal

//   x3 = xc - yd  ;  y3 = yc + xd;    // Third corner
//   x4 = xc + yd  ;  y4 = yc - xd;    // Fourth corner

function drawRect() {
  var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  setCommonAttributes(rect, "black", "none", "none");
  rect.setAttribute("x", pOneX);
  rect.setAttribute("y", pOneY);
  rect.setAttribute("width", pTwoY);
  rect.setAttribute("height", pTwoY);
  svgContainer.appendChild(rect);
}

function drawCircle() {
  var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  setCommonAttributes(circle, "black", "none", "none");
  circle.setAttribute("cx", pOneX);
  circle.setAttribute("cy", pOneY);
  circle.setAttribute("r", calculateRadius(pOneX, pOneY, pTwoX, pTwoY));
  svgContainer.appendChild(circle);
}

function calculateRadius(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function setCommonAttributes(shape, fill, stroke, strokeWidth) {
  shape.setAttribute("fill", fill);
  shape.setAttribute("stroke", stroke);
  shape.setAttribute("stroke-width", strokeWidth);
}
