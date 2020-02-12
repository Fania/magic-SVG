"use strict";


function updateMenuStates() {
  const style = getCurrent("style");
  const type = getCurrent("pageType");

  style==="numbers" ? clearFill.disabled=true : clearFill.disabled=false;
  fillColour.disabled = clearFill.checked;
  style==="numbers" ? strokeColour.disabled=true : strokeColour.disabled=false;
  type==="orderGroups" && style==="numbers" || type==="singleInput"
    ? textColour.disabled=false : textColour.disabled=true;
  type==="orderGroups" && style==="arc" || type==="singleInput" 
    || type==="filterGroups" 
    ? padding.disabled=true : padding.disabled=false;
  // type==="filterGroups"
  //   ? lenFilter.disabled=false : lenFilter.disabled=true;
  type==="filterGroups"
    ? lenOptions.disabled=false : lenOptions.disabled=true;
  type==="filterGroups"
    ? animateOut.disabled=true : animateOut.disabled=false;
  style==="numbers"
    ? animate.disabled=true : animate.disabled=false;
  // type==="singleInput" 
  //   ? noAnimate.disabled=true : noAnimate.disabled=false;
  type==="orderGroups" || type==="filterGroups"
    ? styleOptions.disabled=false : styleOptions.disabled=true;
  // type==="orderGroups" || type==="filterGroups"
  //   ? orderOptions.disabled=false : orderOptions.disabled=true;
  type==="orderGroups" || type==="filterGroups"
    ? values.disabled=true : values.disabled=false;
  type==="orderGroups" || type==="filterGroups"
    ? search.disabled=true : search.disabled=false;
  // type==="orderGroups" || type==="filterGroups"
  //   ? searchOrder.disabled=true : searchOrder.disabled=false;
  // type==="singleInput" ? svgGrid.classList.add("single") 
  //   : svgGrid.classList.remove("single");
  if(type==="singleInput" || type==="filterGroups" ) padding.checked=true;
  let state = padding.checked ? "add" : "remove";
  changePadding(state);
}


const mypageType = document.getElementsByName("pageType");
mypageType.forEach(type => {
  type.addEventListener("change", () => {
    load(type.id);
  });
});


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
  const settingPanels = document.querySelectorAll(".options, .userInput");
  settingPanels.forEach(panel => panel.classList.toggle("showAbout"));
  about.classList.toggle("hide");
}
