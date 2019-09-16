"use strict";
(function(){
  const orderOptions = document.getElementById("order-options");
  const styleOptions = document.getElementById("style-options");
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
  let svgFill = "transparent";
  let svgStroke = "white";
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

    switch(styleOptions[styleOptions.selectedIndex].value) {
      case "straight":
        console.log("straight");
        createPolyline(size, coordsArray);
        break;
      case "quadvertix":
        console.log("quadvertix");
        createQuadraticCurveVertices(size, coordsArray);
        break;
      case "quadline":
        console.log("quadline");
        createQuadraticCurveLines(size, coordsArray);
        break;
      case "arc":
        console.log("arc");
        createPolyline(size, coordsArray);
        break;
      default:
        console.log("quadvertix");
        createPolyline(size, coordsArray);
    }
    
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
      // console.log(valuesArray);
      if (valuesArray.includes(0)) {
        valuesArray = valuesArray.map((x) => x-1);
      }
      createCoords(valuesArray);
      valuesArray = [];
    }
  }

  function createQuadraticCurveVertices(size, arr) {
    console.log("quadratic curve on vertices");
    let w = size * sizeInc;
    let coords = "";
    // svgStroke===undefined ? svgStroke="none" : svgStroke;
    // svgFill===undefined ? svgFill="none" : svgFill;

    for (let a=1; a <= Object.keys(arr).length; a++) {
      // coords += `${arr[a][1] * sizeInc},${arr[a][0] * sizeInc} `;
      // coords += `A 30,30 0,0 1 ${arr[a][1] * sizeInc},${arr[a][0] * sizeInc} `;
      // coords += `Q ${arr[a][1] * sizeInc},${arr[a][0] * sizeInc} ${arr[a+1][1] * sizeInc},${arr[a+1][0] * sizeInc} `;

      let c1x = arr[a][1] * sizeInc;
      let c1y = arr[a][0] * sizeInc;
      let c2x, c2y, c3x, c3y;

      // next to last
      if (a == (Object.keys(arr).length)) {
        c2x = arr[1][1] * sizeInc;
        c2y = arr[1][0] * sizeInc;
        c3x = arr[2][1] * sizeInc;
        c3y = arr[2][0] * sizeInc;

      // last
      } else if (a == (Object.keys(arr).length - 1)) {
        c2x = arr[a+1][1] * sizeInc;
        c2y = arr[a+1][0] * sizeInc;
        c3x = arr[1][1] * sizeInc;
        c3y = arr[1][0] * sizeInc;

      // all previous
      } else {
        c2x = arr[a+1][1] * sizeInc;
        c2y = arr[a+1][0] * sizeInc;
        c3x = arr[a+2][1] * sizeInc;
        c3y = arr[a+2][0] * sizeInc;
      }

      let m1x = (c1x + c2x) / 2;
      let m1y = (c1y + c2y) / 2;
      let m2x = (c2x + c3x) / 2;
      let m2y = (c2y + c3y) / 2;

      // console.log(c1x, c1y, m1x, m1y, c2x, c2y, m2x, m2y, c3x, c3y);
      coords += `M ${m1x},${m1y} Q ${c2x},${c2y} ${m2x},${m2y} `;
    }

    let svgPath = `<svg class="order-x" style="fill: ${svgFill}; stroke: ${svgStroke}" viewbox="${-pad} ${-pad} ${w-sizeInc+pad+pad} ${w-sizeInc+pad+pad}"><path id="lines" d="${coords}"/></svg>`;
    // console.log(svgPath);
    svgGrid.innerHTML += svgPath;
  }

function createQuadraticCurveLines(size, arr) {
    console.log("quadratic curve on lines");
    let w = size * sizeInc;
    let coords = "";

    for (let a=1; a <= (Object.keys(arr).length - 1); a++) {
      // coords += `${arr[a][1] * sizeInc},${arr[a][0] * sizeInc} `;
      // coords += `A 30,30 0,0 1 ${arr[a][1] * sizeInc},${arr[a][0] * sizeInc} `;
      // coords += `Q ${arr[a][1] * sizeInc},${arr[a][0] * sizeInc} ${arr[a+1][1] * sizeInc},${arr[a+1][0] * sizeInc} `;

      let c1x = arr[a][1] * sizeInc;
      let c1y = arr[a][0] * sizeInc;
      let c2x, c2y, c3x, c3y;

      // next to last
      if (a == (Object.keys(arr).length)) {
        c2x = arr[1][1] * sizeInc;
        c2y = arr[1][0] * sizeInc;
        c3x = arr[2][1] * sizeInc;
        c3y = arr[2][0] * sizeInc;

      // last
      } else if (a == (Object.keys(arr).length - 1)) {
        c2x = arr[a+1][1] * sizeInc;
        c2y = arr[a+1][0] * sizeInc;
        c3x = arr[1][1] * sizeInc;
        c3y = arr[1][0] * sizeInc;

      // all previous
      } else {
        c2x = arr[a+1][1] * sizeInc;
        c2y = arr[a+1][0] * sizeInc;
        c3x = arr[a+2][1] * sizeInc;
        c3y = arr[a+2][0] * sizeInc;
      }

      coords += `Q ${arr[a][1] * sizeInc},${arr[a][0] * sizeInc} ${arr[a+1][1] * sizeInc},${arr[a+1][0] * sizeInc} `;
    }

    let svgPath = `<svg class="order-x" style="fill: ${svgFill}; stroke: ${svgStroke}" viewbox="${-pad} ${-pad} ${w-sizeInc+pad+pad} ${w-sizeInc+pad+pad}"><path id="lines" d="${coords}"/></svg>`;
    // console.log(svgPath);
    svgGrid.innerHTML += svgPath;
  }


  function createPolyline(size, arr) {
    console.log("polyline");
    let w = size * sizeInc;
    let coords = "";
    let i;
    svgStroke===undefined ? svgStroke="none" : svgStroke;
    svgFill===undefined ? svgFill="none" : svgFill;

    const round = document.getElementById("curve").checked;
    if (round) {
      console.log("round");
      for (let a=1; a <= Object.keys(arr).length; a++) {
        // coords += `${arr[a][1] * sizeInc},${arr[a][0] * sizeInc} `;
        // coords += `A 30,30 0,0 1 ${arr[a][1] * sizeInc},${arr[a][0] * sizeInc} `;
        // coords += `Q ${arr[a][1] * sizeInc},${arr[a][0] * sizeInc} ${arr[a+1][1] * sizeInc},${arr[a+1][0] * sizeInc} `;

        let c1x = arr[a][1] * sizeInc;
        let c1y = arr[a][0] * sizeInc;
        let c2x, c2y, c3x, c3y;

        // next to last
        if (a == (Object.keys(arr).length)) {
          c2x = arr[1][1] * sizeInc;
          c2y = arr[1][0] * sizeInc;
          c3x = arr[2][1] * sizeInc;
          c3y = arr[2][0] * sizeInc;

        // last
        } else if (a == (Object.keys(arr).length - 1)) {
          c2x = arr[a+1][1] * sizeInc;
          c2y = arr[a+1][0] * sizeInc;
          c3x = arr[1][1] * sizeInc;
          c3y = arr[1][0] * sizeInc;

        // all previous
        } else {
          c2x = arr[a+1][1] * sizeInc;
          c2y = arr[a+1][0] * sizeInc;
          c3x = arr[a+2][1] * sizeInc;
          c3y = arr[a+2][0] * sizeInc;
        }

        let m1x = (c1x + c2x) / 2;
        let m1y = (c1y + c2y) / 2;
        let m2x = (c2x + c3x) / 2;
        let m2y = (c2y + c3y) / 2;

        // console.log(c1x, c1y, m1x, m1y, c2x, c2y, m2x, m2y, c3x, c3y);
        coords += `M ${m1x},${m1y} Q ${c2x},${c2y} ${m2x},${m2y} `;
      }

      let svgPath = `<svg class="order-x" style="fill: ${svgFill}; stroke: ${svgStroke}" viewbox="${-pad} ${-pad} ${w-sizeInc+pad+pad} ${w-sizeInc+pad+pad}"><path id="lines" d="${coords}"/></svg>`;
      // console.log(svgPath);
      svgGrid.innerHTML += svgPath;

    } else {
      // straight polyline
      console.log("straight polyline");
      for (i in arr) {
        coords += `${arr[i][1] * sizeInc},${arr[i][0] * sizeInc} `;
      }
      coords += `${arr[1][1] * sizeInc},${arr[1][0] * sizeInc} `;
      let svgCode = `<svg class="order-x" style="fill: ${svgFill}; stroke: ${svgStroke}" viewbox="${-pad} ${-pad} ${w-sizeInc+pad+pad} ${w-sizeInc+pad+pad}"><polyline id="lines" points="${coords}"/></svg>`;
      // console.log(svgCode);
      svgGrid.innerHTML += svgCode;
    }

  }
})();