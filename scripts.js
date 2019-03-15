"use strict";
(function(){
  const svgbox = document.getElementById("order-x");
  const table = document.getElementById("grid");
  const settings = document.getElementById("settings");
  // const options = document.getElementById("order-options");
  const valuesString = document.getElementById("values");
  const lineGrid = document.getElementById("lines");

/* preferences */
  let squareOrder = order6;
  let pad = 1; // 1 is adjacent, 40 gives a good separation
  let sizeInc = 100; // line weight, 100 is optimal
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

  function setup(e){
    let valuesArray = [];
    let line;
    for (line in squareOrder) {
      valuesArray = squareOrder[line].split(" ").map(Number);
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
    for (let i in arr) {
      coords += `${arr[i][1] * sizeInc},${arr[i][0] * sizeInc} `;
    }
    coords += `${arr[1][1] * sizeInc},${arr[1][0] * sizeInc} `;
    let svgCode = `<svg id="order-x" class="order-x" viewbox="${-pad} ${-pad} ${w-sizeInc+pad+pad} ${w-sizeInc+pad+pad}"><polyline id="lines" fill="none" points="${coords}"/></svg>`;
    document.getElementById('svgGrid').innerHTML += svgCode;
  }
})();