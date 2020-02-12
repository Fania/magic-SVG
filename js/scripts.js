"use strict";




// see squares folder
const squareOrder = {
  "3": order3,
  "4": order4,
  "4.0": reduced4,
  "5": order5,
  "6": order6
}

// without png data
const orderIndex = {
  "3": index3new,
  "4": index4new,
  "5": index5new,
  "6": index6new
}



function getCurrent(thing) {
  let size = parseInt(orderOptions[orderOptions.selectedIndex].value);
  switch (thing) {
    case "index": 
      return orderIndex[size];
    case "style":
      return styleOptions[styleOptions.selectedIndex].value;
    case "order":
      return size;
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
  svgGrid.innerHTML = "";
  constant.innerHTML = "";

  const style = getCurrent("style");
  const order = getCurrent("order");
  const index = getCurrent("index");

  updateBodyClasses(getCurrent("pageType"), getCurrent("order"));

  if (pageType === "orderGroups") {
    for (let i in index) {
      drawSquare(index[i][style]["svg"]);
    }
    svgGrid.classList.remove("filter");
    svgGrid.classList.remove("search");
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
      let text = `
        <div>
          ${square[style]["svg"]}
          ${square["numbers"]["svg"]}
          <p><strong>#${square.id}:</strong> ${square.numbers.string}</p>
        </div>
      `;
      svgGrid.insertAdjacentHTML("beforeend", text);
    }
    svgGrid.classList.add("filter");
    svgGrid.classList.remove("search");
    svgGrid.classList.remove("single");
  } // end filterGroups




  if (pageType === "singleInput") {
    // DISPLAY BY NUMBER VALUES
    if (event.type === "change" || event.target.id === "values") {
      const valuesString = document.getElementById("values").value;
      const valuesArray = valuesString.split(" ").map(Number);
      const size = Math.sqrt(valuesArray.length);
      const source = orderIndex[size];
      const match = source.filter(idx => idx.numbers.string === valuesString)[0];
      const id = match ? match.id : 0;

      if (errorChecks(valuesArray)) {
        errorMsg.innerHTML = errorChecks(valuesArray)[1];
        // call other input checks with 'valuesArray' here
      } else {
        magicConstant(size,valuesArray);
        const coordsObject = getCoords(size,valuesArray);
        drawSquare(prepareSVG("numbers",coordsObject,id));
        drawSquare(prepareSVG("straight",coordsObject,id));
        drawSquare(prepareSVG("quadvertix",coordsObject,id));
        drawSquare(prepareSVG("quadline",coordsObject,id));
        drawSquare(prepareSVG("arc",coordsObject,id));
        svgGrid.classList.add("single");
        svgGrid.classList.remove("search");
        svgGrid.classList.remove("filter");
        values.classList.add("current");
        search.classList.remove("current");
      }
    }
    // SEARCH BY ID
    if (event && event.target.id === "search") {
      const squaresString = document.getElementById("search");
      const squaresArray = squaresString.value.split(",").map(Number);
      for (let i in squaresArray) {
        let square = squaresArray[i];
        let valuesString = index[square - 1]["numbers"]["string"];
        let valuesArray = index[square - 1]["numbers"]["array"];
        magicConstant(order,valuesArray);
        const coordsObject = getCoords(order,valuesArray);
        let text = `
          <div>
            ${prepareSVG("numbers",coordsObject,square)}
            ${prepareSVG("straight",coordsObject,square)}
            ${prepareSVG("quadvertix",coordsObject,square)}
            ${prepareSVG("quadline",coordsObject,square)}
            ${prepareSVG("arc",coordsObject,square)}
            <p><strong>#${square}</strong>: ${valuesString}</p>
          </div>
        `;
        svgGrid.insertAdjacentHTML("beforeend", text);
      }
      svgGrid.classList.add("search");
      svgGrid.classList.remove("filter");
      svgGrid.classList.remove("single");
      values.classList.remove("current");
      search.classList.add("current");
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
