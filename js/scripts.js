"use strict";

// see squares folder
const squareOrder = {
  "3": order3,
  "4": order4,
  "4.0": reduced4,
  "5": order5,
  "6": order6
}


function getCurrent(thing) {
  switch (thing) {
    case "style":
      return styleOptions[styleOptions.selectedIndex].value;
    case "order":
      return orderOptions[orderOptions.selectedIndex].value;
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
  const size = parseInt(order);



  if (pageType === "orderGroups") {

    let coordsArray = {};
    // let size = order;
    let size = Math.sqrt(squareOrder[order][0].split(" ").length);
    let counter = 0;
    for (let line in squareOrder[order]) {
      counter = parseInt(line) + 1;
      // console.log(`processing magic square ${counter}`);
      let valuesArray = squareOrder[order][line].split(" ").map(Number);
      coordsArray[counter] = getCoords(size,valuesArray);
      drawSquare(prepareSVG(style,size,coordsArray[counter],counter,parseInt(line)));
    }
    svgGrid.classList.remove("filter");
    svgGrid.classList.remove("single");
  } // end orderGroups



  if (pageType === "filterGroups") {
    // console.log("filter groups selected");
    populateOptions(order,style);

    // make sure appropriate length is selected
    if (selectedLenIndex > lenOptions.options.length) { selectedLenIndex = 0; }
    lenOptions.options[selectedLenIndex].selected = true;



    const allPerStyle = eval(`${style}Lens${order}`);


    const index = eval(`index${order}`);
    // let index = squareOrder[order];
    let indexNew = index4new;


    const chosenLength = lenOptions.options[selectedLenIndex].value;

    const allPerChosenLength = indexNew.filter(i => 
      Object.keys(i[style])[0] === chosenLength
    );
    console.log(allPerChosenLength);
    const numsPerChosenLength = allPerChosenLength.map(n => n.nums);
    console.log(numsPerChosenLength);


    if (chosenLength in allPerStyle) {

      let filtered = allPerStyle[chosenLength];
      // [8,12]
      // console.log(filtered);
      let filteredNums = filtered.map(n => index[n].nums);
      console.log(filteredNums);
      // ["1 2 3 4", "1 3 2 4"]

      // let order = "4";
      let coordsArray = {};
      
      let counter = 0;
      for (let line in filteredNums) {
        counter = parseInt(line) + 1;
        // console.log(`processing magic square ${counter}`);
        let valuesArray = filteredNums[line].split(" ").map(Number);
        coordsArray[counter] = getCoords(size,valuesArray);
        drawSquare(prepareSVG(style,size,coordsArray[counter],counter,filtered[line]));
        displayDetails(counter, filtered[line]);
      }
    // if (chosenLength in allPerStyle) {

    //   let filtered = allPerStyle[chosenLength];
    //   // console.log(filtered);
    //   let filteredNums = filtered.map(n => index[n].nums);

    //   // let order = "4";
    //   let coordsArray = {};
    //   let size = Math.sqrt(filteredNums[0].split(" ").length);
    //   let counter = 0;
    //   for (let line in filteredNums) {
    //     counter = parseInt(line) + 1;
    //     // console.log(`processing magic square ${counter}`);
    //     let valuesArray = filteredNums[line].split(" ").map(Number);
    //     coordsArray[counter] = getCoords(size,valuesArray);
    //     drawSquare(prepareSVG(style,size,coordsArray[counter],counter,filtered[line]));
    //     displayDetails(counter, filtered[line]);
    //   }
    } else {
      // console.log("input doesn't exist");
      constant.innerHTML = "input doesn't exist"
    }
    svgGrid.classList.add("filter");
    svgGrid.classList.remove("single");

  } // end filterGroups




  if (pageType === "singleInput") {
    const valuesString = document.getElementById("values");
    let valuesArray = valuesString.value.split(" ").map(Number);
    
    if (errorChecks(valuesArray)) {
      errorMsg.innerHTML = errorChecks(valuesArray)[1];
      // call other input checks with 'valuesArray' here
    } else {
    
      let size = Math.sqrt(valuesArray.length);

      magicConstant(size,valuesArray);

      const coordsArray = getCoords(size,valuesArray,1);

      drawSquare(prepareSVG("numbers",size,coordsArray,0,0));
      drawSquare(prepareSVG("straight",size,coordsArray,1,0));
      drawSquare(prepareSVG("quadvertix",size,coordsArray,2,0));
      drawSquare(prepareSVG("quadline",size,coordsArray,3,0));
      drawSquare(prepareSVG("arc",size,coordsArray,4,0));

      svgGrid.classList.add("single");
      svgGrid.classList.remove("filter");
    }
  } // end singleInput



  updateColours();
  updateMenuStates();
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
function prepareSVG(style, s, a, c, n) {
  // console.log(`preparing ${style} SVG for square ${c}`);
  switch(style) {
    case "straight":
      return createPolyline(s, a, c, n);
      // break;
    case "quadvertix":
      return createQuadraticCurveVertices(s, a, c, n);
      // break;
    case "quadline":
      return createQuadraticCurveLines(s, a, c, n);
      // break;
    case "arc":
      return createArc(s, a, c, n);
      // break;
    case "numbers":
      return createNumberSVGs(s, a, n);
      // break;
    default:
      return createQuadraticCurveVertices(s, a, c, n);
  }
}
