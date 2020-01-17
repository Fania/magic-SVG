"use strict";


function updateMenuStates() {
  let type = getPageType();
  let style = styleOptions[styleOptions.selectedIndex].value;

  style==="numbers" ? clearFill.disabled=true : clearFill.disabled=false;
  fillColour.disabled = clearFill.checked;
  style==="numbers" ? strokeColour.disabled=true : strokeColour.disabled=false;
  type==="orderGroups" && style==="numbers" || type==="singleInput"
    ? textColour.disabled=false : textColour.disabled=true;
  type==="orderGroups" && style==="arc" || type==="singleInput" 
    ? padding.disabled=true : padding.disabled=false;
  // type==="filterGroups"
  //   ? lenFilter.disabled=false : lenFilter.disabled=true;
  type==="filterGroups"
    ? lenOptions.disabled=false : lenOptions.disabled=true;
  type==="filterGroups"
    ? animateOut.disabled=true : animateOut.disabled=false;
  style==="numbers" ? animate.disabled=true : animate.disabled=false;
  type==="orderGroups" || type==="filterGroups"
    ? styleOptions.disabled=false : styleOptions.disabled=true;
  type==="orderGroups" 
    ? orderOptions.disabled=false : orderOptions.disabled=true;
  type==="orderGroups" || type==="filterGroups"
    ? values.disabled=true : values.disabled=false;
  // type==="singleInput" ? svgGrid.classList.add("single") 
  //   : svgGrid.classList.remove("single");
  let state = padding.checked ? "add" : "remove";
  changePadding(state);
}


const singleMultiple = document.getElementsByName("singleMultiple");
singleMultiple.forEach(sm => {
  sm.addEventListener("change", () => {
    // let id = event.target.id;
    // console.log(`changed page to ${event.target.id}`);
    // let type = getPageType();
    // let style = styleOptions[styleOptions.selectedIndex].value;
    // if(type === "filterGroups") {
    //   populateOptions(style);
    // }
    load(getPageType());  // reload page setup
  });
});


// update when user inputs manual magic square numbers
settings.addEventListener("submit", () => {
  load("singleInput");
  event.preventDefault();
});


padding.addEventListener("change", () => {
  let state = padding.checked ? "add" : "remove";
  changePadding(state);
});

function changePadding(state) {
  const squares = document.querySelectorAll(".order-x");
  squares.forEach(s => {
    state==="add" ? s.classList.add("pad")
                  : s.classList.remove("pad")
    });
  const nums = document.querySelectorAll(".order-xt");
  nums.forEach(n => {
    state==="add" ? n.classList.add("pad")
                  : n.classList.remove("pad")
    });
}

