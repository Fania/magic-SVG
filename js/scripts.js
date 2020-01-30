"use strict";

// see squares folder
const squareOrder = {
  "3": order3,
  "4": order4,
  "4.0": reduced4,
  "5": order5,
  "6": order6
}
const orderIndex = {
  "3": index3,
  "4": index4,
  "5": index5,
  "6": index6
}



function getCurrent(thing) {
  switch (thing) {
    case "style":
      return styleOptions[styleOptions.selectedIndex].value;
    case "order":
      return parseInt(orderOptions[orderOptions.selectedIndex].value);
    case "pageType":
      return document.querySelector('input[name="pageType"]:checked').id;
    case "length":
      return lenOptions.selectedIndex;
  }
}



styleOptions.addEventListener("change", ()=> load(getCurrent("pageType")));
orderOptions.addEventListener("change", ()=> load(getCurrent("pageType")));
// lenFilter.addEventListener("change", ()=> load(getCurrent("pageType")()));

let selectedLenIndex = 0;
lenOptions.addEventListener("change", ()=> {
  selectedLenIndex = getCurrent("length");
  load("filterGroups");
});



load(getCurrent("pageType"));  // first page load


function load(pageType) {
  // let tar = event ? event.target.id : "";
  // console.log(`loading new ${tar.includes("style-options") ? "display style" : tar === "" ? "page for the first time" : "order group"}`);
  // console.log(`loading ${getCurrent("pageType")()}`);

  svgGrid.innerHTML = "";
  constant.innerHTML = "";

  const style = getCurrent("style");
  const order = getCurrent("order");
  const index = orderIndex[order];


  if (pageType === "orderGroups") {
    for (let i in index) {
      let square = index[i];
      let valuesArray = square.nums.split(" ").map(Number);
      drawSquare(prepareSVG(style,
                            getCoords(order,valuesArray),
                            square.id));
    }
    svgGrid.classList.remove("filter");
    svgGrid.classList.remove("single");
  } // end orderGroups



  if (pageType === "filterGroups") {
    populateOptions(order,style);
    // make sure appropriate length is selected
    if (selectedLenIndex > lenOptions.options.length) { selectedLenIndex = 0; }
    lenOptions.options[selectedLenIndex].selected = true;
    const chosenLength = lenOptions.options[selectedLenIndex].value;
    const allPerChosenLength = index.filter(i => 
      Object.keys(i[style])[0] === chosenLength);
    for (let i in allPerChosenLength) {
      let square = allPerChosenLength[i];
      let valuesArray = square.nums.split(" ").map(Number);
      drawSquare(prepareSVG(style,
                            getCoords(order,valuesArray),
                            square.id));
      displayDetails(square.id);
    }
    svgGrid.classList.add("filter");
    svgGrid.classList.remove("single");
  } // end filterGroups




  if (pageType === "singleInput") {
    const valuesString = document.getElementById("values");
    const valuesArray = valuesString.value.split(" ").map(Number);
    if (errorChecks(valuesArray)) {
      errorMsg.innerHTML = errorChecks(valuesArray)[1];
      // call other input checks with 'valuesArray' here
    } else {
      const size = Math.sqrt(valuesArray.length);
      magicConstant(size,valuesArray);
      const coordsObject = getCoords(size,valuesArray);
      drawSquare(prepareSVG("numbers",coordsObject,1));
      drawSquare(prepareSVG("straight",coordsObject,2));
      drawSquare(prepareSVG("quadvertix",coordsObject,3));
      drawSquare(prepareSVG("quadline",coordsObject,4));
      drawSquare(prepareSVG("arc",coordsObject,5));
      svgGrid.classList.add("single");
      svgGrid.classList.remove("filter");
    }
  } // end singleInput



  updateColours();
  updateMenuStates();
}







// order, valuesArray
function getCoords(order, valuesArray) {
  // console.log(`creating coordinate system for square ${c}`);
  const coordsObject = {};
  let offset = 0;
  for (let row=0; row < order; row++) {
    for (let col=0; col < order; col++) {
      coordsObject[valuesArray[col+offset]] = [col,row];  // x,y
    }
    offset += order;  // increase offset by one row every 4(order) columns
  }
  return coordsObject;
}

// style, coordsObject, id
function prepareSVG(style, coordsObject, id) {
  // console.log(`preparing ${style} SVG for square ${c}`);
  switch(style) {
    case "straight":
      return createPolyline(coordsObject, id);
    case "quadvertix":
      return createQuadraticCurveVertices(coordsObject, id);
    case "quadline":
      return createQuadraticCurveLines(coordsObject, id);
    case "arc":
      return createArc(coordsObject, id);
    case "numbers":
      return createNumberSVGs(coordsObject, id);
    default:
      return createQuadraticCurveVertices(coordsObject, id);
  }
}
