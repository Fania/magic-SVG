"use strict";


function updateMenuStates() {
  const style = getCurrent("style");
  const type = getCurrent("pageType");

  style==="numbers" ? clearFill.disabled=true : clearFill.disabled=false;
  fillColour.disabled = clearFill.checked;
  style==="numbers" ? strokeColour.disabled=true : strokeColour.disabled=false;
  type==="orderGroups" && style==="numbers" || type==="singleInput" || type==="dataSets"
    ? textColour.disabled=false : textColour.disabled=true;
  type==="orderGroups" && style==="arc" || type==="singleInput" 
    || type==="filterGroups" || type==="dataSets"
    ? padding.disabled=true : padding.disabled=false;
  type==="orderGroups" || type==="filterGroups" || type==="singleInput" 
    ? datasetOptions.disabled=true : datasetOptions.disabled=false;
  // type==="orderGroups"
  //   ? groupOptions.disabled=true : groupOptions.disabled=true;
  type==="filterGroups"
    ? lenOptions.disabled=false : lenOptions.disabled=true;
  type==="filterGroups" || type==="dataSets"
    ? animateOut.disabled=true : animateOut.disabled=false;
  style==="numbers" || type==="dataSets"
    ? animate.disabled=true : animate.disabled=false;
  type==="dataSets"
    ? noAnimate.disabled=true : noAnimate.disabled=false;
  type==="orderGroups" || type==="filterGroups"
    ? styleOptions.disabled=false : styleOptions.disabled=true;
  type==="dataSets"
    ? orderOptions.disabled=true : orderOptions.disabled=false;
  type==="orderGroups" || type==="filterGroups" || type==="dataSets"
    ? values.disabled=true : values.disabled=false;
  type==="orderGroups" || type==="filterGroups" || type==="dataSets"
    ? search.disabled=true : search.disabled=false;
  // type==="orderGroups" || type==="filterGroups"
  //   ? searchOrder.disabled=true : searchOrder.disabled=false;
  // type==="singleInput" ? svgGrid.classList.add("single") 
  //   : svgGrid.classList.remove("single");
  // type==="orderGroups"
  //   ? datasetOptions.disabled=false : datasetOptions.disabled=true;
  // type==="dataSets"
  //   ? datasetOptions.disabled=false : datasetOptions.disabled=true;

  if(type==="singleInput" || type==="filterGroups" ) padding.checked=true;
  let state = padding.checked ? "add" : "remove";
  changePadding(state);
}





const pageType = document.getElementsByName("pageType");
pageType.forEach(type => type.addEventListener("change", ()=> load(type.id)));


styleOptions.addEventListener("change", ()=> load(getCurrent("pageType")));
orderOptions.addEventListener("change", ()=> load(getCurrent("pageType")));
datasetOptions.addEventListener("change", ()=> load(getCurrent("pageType")));
// lenFilter.addEventListener("change", ()=> load(getCurrent("pageType")()));

let selectedLenIndex = 0;
lenOptions.addEventListener("change", ()=> {
  selectedLenIndex = getCurrent("length");
  load("filterGroups");
});



function updateBodyClasses(type, order) {
  document.body.classList = [];
  document.body.classList.add(type);
  if (type != "dataSets") document.body.classList.add(`order${order}`);
}





// update when user inputs manual magic square numbers
// settings.addEventListener("submit", () => {
//   load("singleInput");
//   event.preventDefault();
// });
values.addEventListener("keyup", () => {
  if (event.keyCode === 13) { load("singleInput") }  // enter
  event.preventDefault();
});
search.addEventListener("keyup", () => {
  if (event.keyCode === 13) { load("singleInput") }  // enter
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



function toggleMenu() {
  const foot = document.querySelector("footer");
  if ([...settings.classList].includes("hide")) {
    settings.classList.remove("hide");
    foot.classList.remove("hide");
  } else {
    settings.classList.add("hide");
    foot.classList.add("hide");
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
  // F11 doesnt work
document.addEventListener("keydown", event => {
  if (event.key === "s") toggleMenu(); 
});


// proper touch support
// const mc = new Hammer.Manager(document);
// mc.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );
// mc.on("doubletap", toggleMenu );



// ABOUT INFO
info.addEventListener("click", () => toggleAbout() );
function toggleAbout() {
  info.classList.toggle("active");
  if(info.classList.contains("far")) info.classList.replace("far", "fas")
    else info.classList.replace("fas", "far");
  const settingPanels = document.querySelectorAll(".options, .userInput");
  settingPanels.forEach(panel => panel.classList.toggle("showAbout"));
  about.classList.toggle("hide");
}
