(function(){
"use strict";
const svgbox = document.getElementById("order-x");
const table = document.getElementById("grid");
const settings = document.getElementById("settings");
// const options = document.getElementById("order-options");
const valuesString = document.getElementById("values");
const lineGrid = document.getElementById("lines");

settings.addEventListener("submit", createGrid, false);

function createGrid(e){
  let values = valuesString.value;
  // let values = "22 21 24 25 06 07 20 23 27 26 05 04 03 00 17 16 35 34 01 02 19 18 33 32 31 30 08 09 12 15 28 29 10 11 14 13";
  let valuesArray = values.split(" ").map(Number);
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
  createPolyline(size, coordsArray);
  e.preventDefault();
}

function createPolyline(size, arr) {
  let w = size * 100;
  svgbox.setAttribute('viewBox', `0 0 ${w} ${w}`);
  let coords = "";
  for (let i in arr) {
    coords += `${arr[i][1] * 100},${arr[i][0] * 100} `;
  }
  coords += `${arr[0][1] * 100},${arr[0][0] * 100} `;
  lineGrid.setAttribute('points', coords);
}

/*
order 6
20 17 24 27 7 10 14 23 33 30 4 1 9 0 16 13 35 32 3 6 22 19 29 26 34 31 2 5 12 21 25 28 8 11 18 15 
22 21 24 25 06 07 20 23 27 26 05 04 03 00 17 16 35 34 01 02 19 18 33 32 31 30 08 09 12 15 28 29 10 11 14 13
order 5
1 7 13 19 25 14 20 21 2 8 22 3 9 15 16 10 11 17 23 4 18 24 5 6 12
*/

})();