"use strict";




// see squares folder
const squareOrder = {
  "3": order3,
  "4": order4,
  "4s": suzukiSorted,
  "4FA": fania7040,
  "4FNC": fania3520,
  "4FR": fania880,
  // "4.0": reduced4,
  "5": order5,
  "6": order6,
  "7": order7,
  "8": order8,
  "9": order9,
  "10": order10,
  "11": order11,
  "12": order12,
  "13": order13,
  "14": order14,
  "15": order15,
  // "16": order16,
  "17": order17,
  "18": order18,
  "19": order19,
  "20": order20
}

// without png data
const orderIndex = {
  "3": index3,
  "4": index4,
  "4s": index4sorted,
  "4FA": indexFania7040,
  "4FNC": indexFania3520,
  "4FR": indexFania880,
  // "4m": index4mini,
  // "4m2": index4mini2,
  "5": index5,
  "6": index6,
  "7": index7,
  "8": index8,
  "9": index9,
  "10": index10,
  "11": index11,
  "12": index12,
  "13": index13,
  "14": index14,
  "15": index15,
  "17": index17,
  "18": index18,
  "19": index19,
  "20": index20
}

const datasetIndex = {
  "agrippa": agrippa,
  "suzuki": suzuki
}

// const orderPNGs = {
//   // "3": pngs3,
//   "4": pngs4
//   // "5": pngs5,
//   // "6": pngs6,
//   // "7": pngs7,
//   // "8": pngs8,
//   // "9": pngs9
// }



function getCurrent(thing) {
  // let size = parseInt(orderOptions[orderOptions.selectedIndex].value);
  let size = orderOptions[orderOptions.selectedIndex].value;
  switch (thing) {
    case "index": 
      return orderIndex[size];
    case "style":
      return styleOptions[styleOptions.selectedIndex].value;
    case "order":
      return size;
    case "group":
      return groupOptions[groupOptions.selectedIndex].value;
    case "dataSet":
      return datasetIndex[datasetOptions[datasetOptions.selectedIndex].value];
    case "pageType":
      return document.querySelector('input[name="pageType"]:checked').id;
    case "length":
      return lenOptions.selectedIndex;
  }
}






load(getCurrent("pageType"));  // first page load


function load(pageType) {
  svgGrid.innerHTML = "";
  constant.innerHTML = "";

  const style = getCurrent("style");
  const order = getCurrent("order");
  const group = getCurrent("group");
  const index = getCurrent("index");
  // console.log(style, order);

  updateBodyClasses(getCurrent("pageType"), getCurrent("order"));

  if (pageType === "orderGroups") {

    // console.log(group);
    if (group == "0") {
      index.forEach(idx => drawSquare(idx[style]["svg"]));
      svgGrid.classList.remove("filter", "search", "single", "dataSet");
    } else {
      console.log(group);


    }
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
      drawSquare(text);
    }
    svgGrid.classList.add("filter");
    svgGrid.classList.remove("search", "single", "dataSet");
  } // end filterGroups




  if (pageType === "singleInput") {
    // DISPLAY BY NUMBER VALUES
    if (event.type === "change" || event.target.id === "values") {
      const valuesString = document.getElementById("values").value;
      const valuesArray = valuesString.split(" ").map(Number);
      const size = Math.sqrt(valuesArray.length);
      const source = orderIndex[size] ? orderIndex[size] : [];
      const match = source.find(i => i.numbers.string === valuesString);
      const id = match ? match.id : 0;

      if (errorChecks(valuesArray)) {
        errorMsg.innerHTML = errorChecks(valuesArray)[1];
        // call other input checks with 'valuesArray' here
      } else {
        drawAllStyles(size, valuesString, id);
        svgGrid.classList.add("single");
        svgGrid.classList.remove("search", "filter", "dataSet");
        values.classList.add("current");
        search.classList.remove("current");
      }
    }
    // SEARCH BY ID
    if (event && event.target.id === "search") {
      errorMsg.innerHTML = "";
      const inputString = document.getElementById("search");
      const inputArray = inputString.value.split(",").map(Number);
      for (let i in inputArray) {
        const size = getCurrent("order");
        const square = inputArray[i];
        if (!index[square - 1]) {
          errorMsg.innerHTML += `#${square} doesn't exist for order ${size}. `;
        } else {
          const valuesString = index[square - 1]["numbers"]["string"];
          drawAllStyles(size, valuesString, square);
        }
      }
      svgGrid.classList.add("search");
      svgGrid.classList.remove("filter", "single", "dataSet");
      values.classList.remove("current");
      search.classList.add("current");
    }
  } // end singleInput


  if (pageType === "dataSets") {
    const chosenDataSet = getCurrent("dataSet");
    for (let i in chosenDataSet) {
      let square = chosenDataSet[i];
      let order = Math.sqrt(square.length);
      drawAllStyles(order,square.join(" "),0)
    }
    svgGrid.classList.add("dataSet");
    svgGrid.classList.remove("search", "single", "filter");
  } // end dataSets






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
    case "quadvertex":
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
