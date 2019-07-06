"use strict";
(function(){
  // const svgbox = document.getElementById("order-x");
  // const table = document.getElementById("grid");
  // const valuesString = document.getElementById("values");
  // const lineGrid = document.getElementById("lines");
  const orderOptions = document.getElementById("order-options");
  const settings = document.getElementById("settings");
  const svgGrid = document.getElementById('svgGrid')
// console.log(orderOptions[orderOptions.selectedIndex].value);
/*
  preferences TODO:
  - swap between multi and single square
  - set padding between squares
  - set size of squares
*/

  const squareOrder = {
    "4": orders4,
    "5": orders5,
    "6": orders6
  }
  let pad = 30; // 1 is adjacent, 30/40 gives a good separation
  let sizeInc = 100; // scale (line weight hack) 100 is optimal
/* ----------- */

  settings.addEventListener("submit", setup, false);

  function createCoords(valuesArray) {
    let size = Math.sqrt(valuesArray.length);
    const coordsArray = {};
    let offset = 0;
    for (let r=0; r<size; r++) {
      for (let c=0; c<size; c++) {
        coordsArray[valuesArray[c+offset]] = [r,c];
      }
      offset += size;
    }
    event.preventDefault();
    createPolyline(size, coordsArray);
  }

  function setup() {
    let order = '';
    order = orderOptions[orderOptions.selectedIndex].value;
    // console.log(orderOptions.);
    // console.log(squareOrder[order]);
      // let order = "6";
    let valuesArray = [];
    let line;
    svgGrid.innerHTML = '';
    for (line in squareOrder[order]) {
      valuesArray = squareOrder[order][line].split(" ").map(Number);
      console.log(valuesArray);
      if (valuesArray.includes(0)) {
        valuesArray = valuesArray.map((x) => x-1);
      }
      createCoords(valuesArray);
      valuesArray = [];
    }
  }

  function createPolyline(size, arr) {
    let w = size * sizeInc;
    let coords = "";
    let i;
    for (i in arr) {
      coords += `${arr[i][1] * sizeInc},${arr[i][0] * sizeInc} `;
    }
    coords += `${arr[1][1] * sizeInc},${arr[1][0] * sizeInc} `;
    let svgCode = `<svg id="order-x" class="order-x" viewbox="${-pad} ${-pad} ${w-sizeInc+pad+pad} ${w-sizeInc+pad+pad}"><polyline id="lines" fill="none" points="${coords}"/></svg>`;
    svgGrid.innerHTML += svgCode;
  }
})();