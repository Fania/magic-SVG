"use strict";




// see data folder
const sources = {
  "agrippa": sourceAgrippa,
  "3": sourceOrder3,
  "4": sourceSuzuki,
  "4R": sourceRaczinski880,
  // "4RNC": sourceRaczinski3520,
  "4RA": sourceRaczinski7040,
  "5": sourceOrder5,
  "6": sourceOrder6,
  "7": sourceOrder7,
  "8": sourceOrder8,
  "9": sourceOrder9,
  "10": sourceOrder10,
  "11": sourceOrder11,
  "12": sourceOrder12,
  "13": sourceOrder13,
  "14": sourceOrder14,
  "15": sourceOrder15,
  "16": sourceOrder16,
  "17": sourceOrder17,
  "18": sourceOrder18,
  "19": sourceOrder19,
  "20": sourceOrder20
}

// see data folder
const indices = {
  "3": index3,
  "4": index4,
  // "4s": index4sorted,
  "4R": index4R,
  // "4RNC": index4RNC,
  "4RA": index4RA,
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
  "16": index16,
  "17": index17,
  "18": index18,
  "19": index19,
  "20": index20
}





function getCurrent(thing) {
  // let size = parseInt(orderOptions[orderOptions.selectedIndex].value);
  let size = orderOptions[orderOptions.selectedIndex].value;
  switch (thing) {
    case "index": 
      return indices[size];
    case "style":
      return styleOptions[styleOptions.selectedIndex].value;
    case "order":
      return size;
    case "group":
      return groupOptions[groupOptions.selectedIndex].value;
    case "dataset":
      return sources[datasetOptions[datasetOptions.selectedIndex].value];
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



  if (pageType === "filterGroups" && style !== "numbers") {
    errorMsg.innerText = "";
    populateOptions(order,style);
    // make sure appropriate length is selected
    if (selectedLenIndex > lenOptions.options.length) { selectedLenIndex = 0; }
    lenOptions.options[selectedLenIndex].selected = true;
    const chosenLength = lenOptions.options[selectedLenIndex].value;
    const allPerChosenLength = index.filter(i => 
      Object.keys(i[style])[0] === chosenLength);
    for (let i in allPerChosenLength) {
      let square = allPerChosenLength[i];
      let str = (square.numbers.array).join(" ");
      let text = `
        <div>
          ${square[style]["svg"]}
          ${square["numbers"]["svg"]}
          <p><strong>#${square.id}:</strong> ${str}</p>
        </div>
      `;
      drawSquare(text);
    }
    svgGrid.classList.add("filter");
    svgGrid.classList.remove("search", "single", "dataSet");
  } // end filterGroups
  if (pageType === "filterGroups" && style == "numbers") {
    errorMsg.innerText = "Can't select length filter for number style.";
  }



  if (pageType === "singleInput") {
    // DISPLAY BY NUMBER VALUES
    if (event.type === "change" || event.target.id === "values") {
      const valuesString = document.getElementById("values").value;
      // CLEAN INPUT AND CHECK
      const valuesArray = valuesString.split(" ").map(Number);
      const size = Math.sqrt(valuesArray.length);
      const source = indices[size] ? indices[size] : [];
      const match = source.find(i => i.numbers.string === valuesString);
      const id = match ? match.id : 0;

      if (errorChecks(valuesArray)) {
        errorMsg.innerHTML = errorChecks(valuesArray)[1];
        // call other input checks with 'valuesArray' here
      } else {
        drawAllStyles(size, valuesArray, id);
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
        const size = parseInt(getCurrent("order"));
        const square = inputArray[i];
        if (!index[square - 1]) {
          errorMsg.innerHTML += `#${square} doesn't exist for order ${size}. `;
        } else {
          const valuesArray = index[square - 1]["numbers"]["array"];
          // console.log(size, valuesString, square);
          drawAllStyles(size, valuesArray, square);
        }
      }
      svgGrid.classList.add("search");
      svgGrid.classList.remove("filter", "single", "dataSet");
      values.classList.remove("current");
      search.classList.add("current");
    }
  } // end singleInput


  if (pageType === "dataSets") {
    const chosenDataSet = getCurrent("dataset");
    for (let i in chosenDataSet) {
      let square = chosenDataSet[i];
      let order = Math.sqrt(square.length);
      drawAllStyles(order,square,0)
    }
    svgGrid.classList.add("dataSet");
    svgGrid.classList.remove("search", "single", "filter");
  } // end dataSets






  updateColours();
  updateMenuStates();
}

