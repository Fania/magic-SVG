"use strict";

const squareOrder = {
  "3": order3,
  "4": order4,
  "4a": order4a,
  "5": order5,
  "6": order6
}


styleOptions.addEventListener("change", ()=> load(getPageType()));
orderOptions.addEventListener("change", ()=> load(getPageType()));


load(getPageType());  // first page load


function load(pageType) {
  // let tar = event ? event.target.id : "";
  // console.log(`loading new ${tar.includes("style-options") ? "display style" : tar === "" ? "page for the first time" : "order group"}`);
  // console.log(`loading ${getPageType()}`);

  svgGrid.innerHTML = "";
  constant.innerHTML = "";


  if (pageType === "orderGroups") {
    let style = styleOptions[styleOptions.selectedIndex].value;
    let order = orderOptions[orderOptions.selectedIndex].value;
    let coordsArray = {};
    let size = Math.sqrt(squareOrder[order][0].split(" ").length);
    let counter = 0;
    for (let line in squareOrder[order]) {
      counter = parseInt(line) + 1;
      // console.log(`processing magic square ${counter}`);
      let valuesArray = squareOrder[order][line].split(" ").map(Number);
      coordsArray[counter] = getCoords(size,valuesArray);
      drawSquare(prepareSVG(style,size,coordsArray[counter],counter));
    }
    svgGrid.classList.remove("single");
  }

  if (pageType === "singleInput") {
    const valuesString = document.getElementById("values");
    let valuesArray = valuesString.value.split(" ").map(Number);
    let size = Math.sqrt(valuesArray.length);
    
    magicConstant(size,valuesArray);

    const coordsArray = getCoords(size,valuesArray,1);

    drawSquare(prepareSVG("numbers",size,coordsArray,0));
    drawSquare(prepareSVG("straight",size,coordsArray,1));
    drawSquare(prepareSVG("quadvertix",size,coordsArray,2));
    drawSquare(prepareSVG("quadline",size,coordsArray,3));
    drawSquare(prepareSVG("arc",size,coordsArray,4));

    svgGrid.classList.add("single");
  }
  updateColours();
  updateMenuStates();
}


function getPageType() {
  // console.log(document.querySelector('input[name="singleMultiple"]:checked').id);
  return document.querySelector('input[name="singleMultiple"]:checked').id;
}


// size, valuesArray
function getCoords(s, v, c) {
  // console.log(`creating coordinate system for square ${c}`);
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
function prepareSVG(style, s, a, c) {
  // console.log(`preparing ${style} SVG for square ${c}`);
  switch(style) {
    case "straight":
      return createPolyline(s, a, c);
      // break;
    case "quadvertix":
      return createQuadraticCurveVertices(s, a, c);
      // break;
    case "quadline":
      return createQuadraticCurveLines(s, a, c);
      // break;
    case "arc":
      return createArc(s, a, c);
      // break;
    case "numbers":
      return createNumberSVGs(s, a);
      // break;
    default:
      return createQuadraticCurveVertices(s, a, c);
  }
} 