"use strict";



function populateOptions(order,style) {
  lenOptions.innerHTML = "";
  if(style !== "numbers") {
    let list = eval(`${style}Lens${order}`);

    // const allPerChosenLength = index.filter(i => 
    //   Object.keys(i[style])[0] === chosenLength);

    


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


function displayDetails(num) {
  let id = `square-${num}`;
  let elem = document.getElementById(id).parentElement;
  let det = document.createElement("p");
  let txt = document.createTextNode(`# ${num}`);
  det.appendChild(txt);
  elem.insertAdjacentElement("afterend", det);
}

