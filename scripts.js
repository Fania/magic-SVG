"use strict";

const orderOptions = document.getElementById("order-options");
const styleOptions = document.getElementById("style-options");
const padding = document.getElementById("padding");
const settings = document.getElementById("settings");
const svgGrid = document.getElementById('svgGrid');
const anim = document.getElementById("animate");

const squareOrder = {
  "3": order3,
  "4": order4,
  "4a": order4a,
  "5": order5,
  "6": order6
}

let pad; // 1 is adjacent, 30 gives a good separation
let sizeInc = 100; // scale (line weight hack) 100 is optimal

anim.addEventListener("change", () => { 
  anim.checked ? startAnimatingAll() : stopAnimatingAll(); });

styleOptions.addEventListener("change", loadMultiple);
orderOptions.addEventListener("change", loadMultiple);


loadMultiple();  // first page load


function loadMultiple() {
  // let tar = event ? event.target.id : "";
  // console.log(`loading new ${tar.includes("style-options") ? "display style" : tar === "" ? "page for the first time" : "order group"}`);
  let style = styleOptions[styleOptions.selectedIndex].value;
  let order = orderOptions[orderOptions.selectedIndex].value;
  let coordsArray = {};
  padding.checked ? pad = 30 : pad = 1;
  svgGrid.innerHTML = '';
  let size = Math.sqrt(squareOrder[order][0].split(" ").length);
  let counter = 0;
  for (let line in squareOrder[order]) {
    counter = parseInt(line) + 1;
    // console.log(`processing magic square ${counter}`);
    let valuesArray = squareOrder[order][line].split(" ").map(Number);
    coordsArray[counter] = getCoords(size, valuesArray);
    chooseStyle(style,size,coordsArray[counter],counter);
  }
  updateColours();
  style === "numbers" ? numberSettings() : squareSettings();
}

// size, valuesArray
function getCoords(s, v) {
  // console.log(`creating coordinate system for square ${counter}`);
  const coordsObject = {};
  let offset = 0;
  for (let r=0; r<s; r++) {
    for (let c=0; c<s; c++) {
      coordsObject[v[c+offset]] = [c,r];  // column, row = x , y
    }
    offset += s;  // increase offset by one row every 4 columns
  }
  return coordsObject;
}

// style, size, coordsArray, counter
function chooseStyle(style, s, a, c) {
  switch(style) {
    case "straight":
      createPolyline(s, a, c);
      break;
    case "quadvertix":
      createQuadraticCurveVertices(s, a, c);
      break;
    case "quadline":
      createQuadraticCurveLines(s, a, c);
      break;
    case "arc":
      createArc(s, a, c);
      break;
    case "numbers":
      createNumberSVGs(s, a);
      break;
    default:
      createQuadraticCurveVertices(s, a, c);
  }
} 