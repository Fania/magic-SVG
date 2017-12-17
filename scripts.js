(function(){
  
let svg = document.getElementById("order-6");
let table = document.getElementById("grid");
let settings = document.getElementById("settings");
let options = document.getElementById("order-options");
let valuesString = document.getElementById("values");

settings.addEventListener("submit", createGrid, false);

function createGrid(e){
  let values = valuesString.value;
  // let values = "22 21 24 25 06 07 20 23 27 26 05 04 03 00 17 16 35 34 01 02 19 18 33 32 31 30 08 09 12 15 28 29 10 11 14 13";
  // 20 17 24 27 7 10 14 23 33 30 4 1 9 0 16 13 35 32 3 6 22 19 29 26 34 31 2 5 12 21 25 28 8 11 18 15 
  let valuesArray = values.split(" ").map(Number);
  let len = valuesArray.length;
  let size = Math.sqrt(len);
  let coordsArray = {};
  table.innerHTML = "";
  let offset = 0;
  for (r=0; r<size; r++) {
    let row = document.createElement("tr");
    for (c=0; c<size; c++) {
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
  let lineSVG = document.getElementById("order-X");
  lineSVG.setAttribute('viewBox', `0 0 ${w} ${w}`);
  let lineGrid = document.getElementById("lines");
  let coords = "";
  for (i in arr) {
    coords += `${arr[i][1] * 100},${arr[i][0] * 100} `;
  }
  coords += `${arr[0][1] * 100},${arr[0][0] * 100} `;
  lineGrid.setAttribute('points', coords);
}


// 22 21 24 25 06 07 20 23 27 26 05 04 03 00 17 16 35 34 01 02 19 18 33 32 31 30 08 09 12 15 28 29 10 11 14 13

// 22 21 24 25 06 07
// 20 23 27 26 05 04
// 03 00 17 16 35 34
// 01 02 19 18 33 32
// 31 30 08 09 12 15
// 28 29 10 11 14 13 

})();