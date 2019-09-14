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

    // straight polyline
    // for (i in arr) {
    //   coords += `${arr[i][1] * sizeInc},${arr[i][0] * sizeInc} `;
    // }
    // coords += `${arr[1][1] * sizeInc},${arr[1][0] * sizeInc} `;
    // let svgCode = `<svg class="order-x" style="fill: ${svgFill}; stroke: ${svgStroke}" viewbox="${-pad} ${-pad} ${w-sizeInc+pad+pad} ${w-sizeInc+pad+pad}"><polyline id="lines" points="${coords}"/></svg>`;
    // console.log(svgCode);
    // svgGrid.innerHTML += svgCode;



    // rounded corners
    console.log(arr);
    coords += `M${arr[1][1] * sizeInc},${arr[1][0] * sizeInc} `;

    for (let a=2; a <= (Object.keys(arr).length - 1); a = a+2) {
      console.log("a: ", a);
      console.log(`${arr[a][1] * sizeInc}, ${arr[a][0] * sizeInc}`);
      // coords += `${arr[a][1] * sizeInc},${arr[a][0] * sizeInc} `;
      // coords += `A 30,30 0,0 1 ${arr[a][1] * sizeInc},${arr[a][0] * sizeInc} `;
      // coords += `Q ${arr[a][1] * sizeInc},${arr[a][0] * sizeInc} ${arr[a+1][1] * sizeInc},${arr[a+1][0] * sizeInc} `;

      let nx = ((arr[a][1] * sizeInc) + (arr[a+1][1] * sizeInc)) / 2;
      let ny = ((arr[a][0] * sizeInc) + (arr[a+1][0] * sizeInc)) / 2;

      coords += `Q ${arr[a][1] * sizeInc},${arr[a][0] * sizeInc} ${arr[a+1][1] * sizeInc},${arr[a+1][0] * sizeInc} `;
    }
    coords += `M ${arr[1][1] * sizeInc},${arr[1][0] * sizeInc} `;  // loop back
    let svgPath = `<svg class="order-x" style="fill: ${svgFill}; stroke: ${svgStroke}" viewbox="${-pad} ${-pad} ${w-sizeInc+pad+pad} ${w-sizeInc+pad+pad}"><path id="lines" d="${coords}"/></svg>`;
    console.log(svgPath);
    svgGrid.innerHTML += svgPath;


    // <svg class="order-x" style="fill: transparent; stroke: white" viewbox="-30 -30 560 560"><path id="lines" d="M100,200 Q 100,300 400,400 Q 400,500 200,0 Q 300,100 500,100 Q 400,0 300,200 Q 300,300 0,500 Q 100,400 200,400 Q 200,500 0,100 Q 0,0 500,300 Q 500,200 0,300 Q 0,200 500,500 Q 500,400 300,0 Q 200,100 400,100 Q 500,0 200,200 Q 200,300 100,500 Q 0,400 300,400 Q 300,500 100,0 Q 100,100 400,300 M 100,200 "/></svg>

    // <path d="M100,100 h200 a20,20 0 0 1 20,20 v200 a20,20 0 0 1 -20,20 h-200 a20,20 0 0 1 -20,-20 v-200 a20,20 0 0 1 20,-20 z" />
    // a20,20 0 0 1 20,20  svg arc rounded corner
  }
})();