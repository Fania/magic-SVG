"use strict";



function filterByLength(len, type) {
  let tmp = index4.filter( square => square.lens[type] == len );
  let out = tmp.map( t => index4.indexOf(t) );
  return out;
}


function populateOptions(style) {
  lenOptions.innerHTML = "";
  if(style !== "numbers") {
    let list = eval(`${style}Lens`);
    lenOptions.disabled=false;
    for (let l in list) {
      let opt = document.createElement("option");
      opt.value = l;
      opt.innerText = `${l} (${list[l].length})`;
      lenOptions.appendChild(opt);
    }
  } else {
    lenOptions.disabled=true;
  }
}


function displayDetails(num, original) {
  let id = `square-${num}`;
  let elem = document.getElementById(id).parentElement;
  let det = document.createElement("p");
  let txt = document.createTextNode(`# ${original + 1}`);
  det.appendChild(txt);
  elem.insertAdjacentElement("afterend", det);
}

