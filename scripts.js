"use strict";
(function(){
  const orderOptions = document.getElementById("order-options");
  const padding = document.getElementById("padding");
  const settings = document.getElementById("settings");
  const svgGrid = document.getElementById('svgGrid');
/*
  preferences TODO:
  - swap between multi and single square
  - set size of squares
  - set fill-opacity/stroke-opacity="0.0" - "1.0"
  - loop trhough colour change
  - background colour
*/

  const squareOrder = {
    "4": orders4,
    "5": orders5,
    "6": orders6
  }

  // COLOUR =====================================
  let svgFill, svgStroke;
  fillColour.addEventListener("change", function() { svgFill = fillColour.value });
  strokeColour.addEventListener("change", function () { svgStroke = strokeColour.value });
  backColour.addEventListener("change", function () { svgStroke = document.body.style.backgroundColor = backColour.value });

  let pad; // 1 is adjacent, 30 gives a good separation
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
    let order = orderOptions[orderOptions.selectedIndex].value;
    // console.log(squareOrder[order]);
    // console.log(padding.checked);
    let valuesArray = [];
    padding.checked ? pad = 30 : pad = 1;
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
    svgStroke===undefined ? svgStroke="none" : svgStroke;
    svgFill===undefined ? svgFill="none" : svgFill;
    for (i in arr) {
      coords += `${arr[i][1] * sizeInc},${arr[i][0] * sizeInc} `;
    }
    coords += `${arr[1][1] * sizeInc},${arr[1][0] * sizeInc} `;
    let svgCode = `<svg class="order-x" style="fill: ${svgFill}; stroke: ${svgStroke}" viewbox="${-pad} ${-pad} ${w-sizeInc+pad+pad} ${w-sizeInc+pad+pad}"><polyline id="lines" points="${coords}"/></svg>`;
    svgGrid.innerHTML += svgCode;
  }
})();