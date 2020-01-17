"use strict";


let uniquestraight = [...new Set(lensStraight)]; 
let uniquequadvertix = [...new Set(lensQuad)]; 
let uniquequadline = [...new Set(lensQLine)]; 
let uniquearc = [...new Set(lensArc)]; 


// only used to update lists in filtered.js
function generateList(type) {
  let list = eval(`unique${type}`);
  let output = {};
  for (let i=0; i < list.length; i++) {
    let len = list[i];
    let filtered = filterByLength(len, type);
    output[len] = filtered;
  };
  return output;
}


function filterByLength(len, type) {
  let tmp = index4.filter( square => square.lens[type] == len );
  let out = tmp.map( t => index4.indexOf(t) );
  return out;
}




function populateOptions(style) {





}


// lenOptions



// for(element in langArray)
// {
//    var opt = document.createElement("option");
//    opt.value= index;
//    opt.innerHTML = element; // whatever property it has

//    // then append it to the select element
//    newSelect.appendChild(opt);
//    index++;
// }