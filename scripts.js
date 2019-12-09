"use strict";

const orderOptions = document.getElementById("order-options");
const styleOptions = document.getElementById("style-options");
const padding = document.getElementById("padding");
const settings = document.getElementById("settings");
const svgGrid = document.getElementById('svgGrid');
const anim = document.getElementById("animate");

const squareOrder = {
  "4": order4,
  "4a": order4a,
  "5": order5,
  "6": order6
}



// COLOURS
let currentColours = {
  "fill": "none",
  "stroke": "#eeeeee",
  "back": "#222222",
  "text": "#eeeeee"
};

fillColour.addEventListener("change", updateColours);
strokeColour.addEventListener("change", updateColours);
textColour.addEventListener("change", updateColours);
backColour.addEventListener("change", updateColours);
clearFill.addEventListener("change", () => toggleFill(clearFill.checked));


let pad; // 1 is adjacent, 30 gives a good separation
let sizeInc = 100; // scale (line weight hack) 100 is optimal

styleOptions.addEventListener("change", load);
orderOptions.addEventListener("change", load);

load();  // first page load

function load() {
  updateColours();
  let order = orderOptions[orderOptions.selectedIndex].value;
  let valuesArray = [];
  let counter = 1;
  extra_styles.innerHTML = "";
  padding.checked ? pad = 30 : pad = 1;
  let line;
  svgGrid.innerHTML = '';
  for (line in squareOrder[order]) {
    valuesArray = squareOrder[order][line].split(" ").map(Number);
    if (valuesArray.includes(0)) {
      valuesArray = valuesArray.map((x) => x-1);
    }
    createCoords(valuesArray, counter);
    valuesArray = [];      
    counter++;
  }
}



function createCoords(valuesArray, counter) {
  // console.log(valuesArray);
  let size = Math.sqrt(valuesArray.length);
  const coordsArray = {};
  let offset = 0;
  for (let r=0; r<size; r++) {
    for (let c=0; c<size; c++) {
      coordsArray[valuesArray[c+offset]] = [r,c];
    }
    offset += size;
  }

  switch(styleOptions[styleOptions.selectedIndex].value) {
    case "straight":
      createPolyline(size, coordsArray, counter);
      break;
    case "quadvertix":
      createQuadraticCurveVertices(size, coordsArray, counter);
      break;
    case "quadline":
      createQuadraticCurveLines(size, coordsArray, counter);
      break;
    case "arc":
      createArc(size, coordsArray, counter);
      break;
    case "numbers":
      createNumberSVGs(size, coordsArray);
      break;
    default:
      createQuadraticCurveVertices(size, coordsArray, counter);
  }
}