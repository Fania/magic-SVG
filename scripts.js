(function(){
  
let svg = document.getElementById("order-6");
let table = document.getElementById("grid");
let settings = document.getElementById("settings");
let options = document.getElementById("order-options");
let valuesString = document.getElementById("values");

settings.addEventListener("submit", createGrid, false);

function createGrid(e){
  // let values = valuesString.value;
  let values = "22 21 24 25 06 07 20 23 27 26 05 04 03 00 17 16 35 34 01 02 19 18 33 32 31 30 08 09 12 15 28 29 10 11 14 13";
  let valuesArray = values.split(" ").map(Number);
  let len = valuesArray.length;
  let size = Math.sqrt(len);

  // let optionsChoice = options.options[options.selectedIndex].value;
  // console.log(optionsChoice);
  // let size = optionsChoice;
  let coordsArray;
  table.innerHTML = "";
  let offset = 0;
  for (r=0; r<size; r++) {
    let row = document.createElement("tr");
    for (c=0; c<size; c++) {
      let cell = document.createElement("td");
      let content = document.createTextNode(`${valuesArray[c+offset]}`); 
      // coordsArray[c+offset] = [valuesArray[c+offset],r,c];
      cell.appendChild(content);
      row.appendChild(cell);
    }
    table.appendChild(row);
    offset += size;
  }
  // console.log(coordsArray[c+offset]);
  // createPolyline(size, valuesArray)
  e.preventDefault();
}

// function createPolyline(size, arr) {
//   console.log(arr);
//   let w = size * 100;
//   let lineSVG = document.getElementById("order-X");
//   lineSVG.setAttribute('viewBox', `0 0 ${w} ${w}`);

//   let lineGrid = document.getElementById("lines");
//   let coords = "";
  
//   for (r=0; r<size; r++) {
    
//     for (c=0; c<size; c++) {

//     }

//   }

  
//   lineGrid.setAttribute('points', coords);


// }


// 22 21 24 25 06 07 20 23 27 26 05 04 03 00 17 16 35 34 01 02 19 18 33 32 31 30 08 09 12 15 28 29 10 11 14 13

// 22 21 24 25 06 07
// 20 23 27 26 05 04
// 03 00 17 16 35 34
// 01 02 19 18 33 32
// 31 30 08 09 12 15
// 28 29 10 11 14 13 

})();