"use strict";
(function(){
  const styleOptions = document.getElementById("style-options");
  const settings = document.getElementById("settings");
  const svgGrid = document.getElementById('svgGrid');
  const valuesString = document.getElementById("values");
  const table = document.getElementById("grid");
  const svgbox = document.getElementById("single-x");
  const anim = document.getElementById("animate");
/*
  preferences TODO:
  - set size of squares
  - set fill-opacity/stroke-opacity="0.0" - "1.0"
  - loop trhough colour change
*/

  // COLOUR =====================================
  let svgFill = "transparent";
  let svgStroke = "white";
  fillColour.addEventListener("change", function() { svgFill = fillColour.value });
  strokeColour.addEventListener("change", function () { svgStroke = strokeColour.value });
  backColour.addEventListener("change", function () { svgStroke = document.body.style.backgroundColor = backColour.value });

 
  let pad = 50; // 1 is adjacent, 30 gives a good separation
  let sizeInc = 100; // scale (line weight hack) 100 is optimal
/* ----------- */

  settings.addEventListener("submit", setup, false);


  function setup() {
    
    let values = valuesString.value;
    // let values = "22 21 24 25 06 07 20 23 27 26 05 04 03 00 17 16 35 34 01 02 19 18 33 32 31 30 08 09 12 15 28 29 10 11 14 13";
    let valuesArray = values.split(" ").map(Number);
    // valuesArray.includes(0) has no IE support
    if (valuesArray.indexOf(0) === -1) {
      valuesArray = valuesArray.map((x) => x-1);
    }
    // console.log(valuesArray);
    
    let size = Math.sqrt(valuesArray.length);
    const coordsArray = {};
    table.innerHTML = "";
    let offset = 0;
    for (let r=0; r<size; r++) {
      let row = document.createElement("tr");
      for (let c=0; c<size; c++) {
        let cell = document.createElement("td");
        let content = document.createTextNode(`${valuesArray[c+offset]}`);
        coordsArray[valuesArray[c+offset]] = [r,c];
        cell.appendChild(content);
        row.appendChild(cell);
      }
      table.appendChild(row);
      offset += size;
    }

    event.preventDefault();

    // console.log(coordsArray);

    switch(styleOptions[styleOptions.selectedIndex].value) {
      case "straight":
        createPolyline(size, coordsArray, 1);
        break;
      case "quadvertix":
        createQuadraticCurveVertices(size, coordsArray, 1);
        break;
      case "quadline":
        createQuadraticCurveLines(size, coordsArray, 1);
        break;
      case "arc":
        createArc(size, coordsArray, 1);
        break;
      default:
        createQuadraticCurveVertices(size, coordsArray, 1);
    }
  }

  function createQuadraticCurveVertices(size, arr, counter) {
    // console.log("quadratic curve on vertices");

    // console.log(size, arr);

    let w = size * sizeInc;
    let coords = "";

    let fstx = arr[0][1] * sizeInc;
    let fsty = arr[0][0] * sizeInc;
    let sndx = arr[1][1] * sizeInc;
    let sndy = arr[1][0] * sizeInc;
    let fstmx = (fstx + sndx) / 2;
    let fstmy = (fsty + sndy) / 2;

    coords += `M ${fstmx},${fstmy} `;

    // console.log("length: ", Object.keys(arr).length);
    for (let a=0; a < Object.keys(arr).length; a++) {
      let c1x = arr[a][1] * sizeInc;
      let c1y = arr[a][0] * sizeInc;
      let c2x, c2y, c3x, c3y;

      // console.log("a: ", a);
      // console.log("c1: ", c1x, c1y);

      // last
      if (a == (Object.keys(arr).length - 1)) {
        c2x = arr[0][1] * sizeInc;
        c2y = arr[0][0] * sizeInc;
        c3x = arr[1][1] * sizeInc;
        c3y = arr[1][0] * sizeInc;
        // console.log("c2: ", c2x, c2y);
        // console.log("c3: ", c3x, c3y);

      // next to last
      } else if (a == (Object.keys(arr).length - 2)) {
        c2x = arr[a][1] * sizeInc;
        c2y = arr[a][0] * sizeInc;
        c3x = arr[1][1] * sizeInc;
        c3y = arr[1][0] * sizeInc;
        // console.log("c2: ", c2x, c2y);
        // console.log("c3: ", c3x, c3y);

      // all previous
      } else {
        c2x = arr[a+1][1] * sizeInc;
        c2y = arr[a+1][0] * sizeInc;
        c3x = arr[a+2][1] * sizeInc;
        c3y = arr[a+2][0] * sizeInc;
        // console.log("c2: ", c2x, c2y);
        // console.log("c3: ", c3x, c3y);
      }

      let m1x = (c1x + c2x) / 2;
      let m1y = (c1y + c2y) / 2;
      let m2x = (c2x + c3x) / 2;
      let m2y = (c2y + c3y) / 2;

      // console.log(c1x, c1y, m1x, m1y, c2x, c2y, m2x, m2y, c3x, c3y);
      coords += `Q ${c2x},${c2y} ${m2x},${m2y} `;
    }

    let svgPath = `<path id="square-${counter}" class="lines" d="${coords}"/>`;
    svgbox.setAttribute('viewBox', `${-pad} ${-pad} ${w-sizeInc+pad+pad} ${w-sizeInc+pad+pad}`);
    svgbox.setAttribute('style', `fill: ${svgFill}; stroke: ${svgStroke}`);
    svgbox.innerHTML = svgPath;

    if (anim.checked) animate(counter);
  }

  function createQuadraticCurveLines(size, arr, counter) {
    // console.log("quadratic curve on lines");
    let w = size * sizeInc;
    let coords = "";

    coords += `M ${arr[0][1] * sizeInc},${arr[0][0] * sizeInc} `;

    for (let a=2; a <= (Object.keys(arr).length - 1); a = a+2) {
      coords += `Q ${arr[a][1] * sizeInc},${arr[a][0] * sizeInc} ${arr[a+1][1] * sizeInc},${arr[a+1][0] * sizeInc} `;
    }
    // coords += `Z `;  // loop back

    let svgPath = `<path id="square-${counter}" class="lines" d="${coords}"/>`;
    svgbox.setAttribute('viewBox', `${-pad} ${-pad} ${w-sizeInc+pad+pad} ${w-sizeInc+pad+pad}`);
    svgbox.setAttribute('style', `fill: ${svgFill}; stroke: ${svgStroke}`);
    svgbox.innerHTML = svgPath;

    if (anim.checked) animate(counter);
  }

  function createArc(size, arr, counter) {
    // console.log("arc experiment");
    let w = size * sizeInc;
    let coords = "";

    coords += `M${arr[1][1] * sizeInc},${arr[1][0] * sizeInc} `;

    for (let a=2; a <= (Object.keys(arr).length - 1); a = a+2) {
      // https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Arcs
      coords += `A 10,10 0 1 0 ${arr[a][1] * sizeInc},${arr[a][0] * sizeInc} `;
    }
    coords += `M ${arr[0][1] * sizeInc},${arr[0][0] * sizeInc} `;  // loop back

    let svgPath = `<path id="square-${counter}" class="lines" d="${coords}"/>`;
    svgbox.setAttribute('viewBox', `${-pad} ${-pad} ${w-sizeInc+pad+pad} ${w-sizeInc+pad+pad}`);
    svgbox.setAttribute('style', `fill: ${svgFill}; stroke: ${svgStroke}`);
    svgbox.innerHTML = svgPath;

    if (anim.checked) animate(counter);
  }

  function createPolyline(size, arr, counter) {
    // console.log("straight polyline");
    let w = size * sizeInc;
    let coords = "";
    let i;
    svgStroke===undefined ? svgStroke="none" : svgStroke;
    svgFill===undefined ? svgFill="none" : svgFill;

    for (i in arr) {
      coords += `${arr[i][1] * sizeInc},${arr[i][0] * sizeInc} `;
    }
    coords += `${arr[0][1] * sizeInc},${arr[0][0] * sizeInc} `;
    let svgCode = `<polyline id="square-${counter}" class="lines" points="${coords}"/>`;
    svgbox.setAttribute('viewBox', `${-pad} ${-pad} ${w-sizeInc+pad+pad} ${w-sizeInc+pad+pad}`);
    svgbox.setAttribute('style', `fill: ${svgFill}; stroke: ${svgStroke}`);
    svgbox.innerHTML = svgCode;
    if (anim.checked) animate(counter);
  }

})();
