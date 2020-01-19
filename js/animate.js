"use strict";


animate.addEventListener("change", () => { 
  animate.checked ? startAnimatingAll(true) : stopAnimatingAll(); });

animateOut.addEventListener("change", () => { 
  animateOut.checked ? startAnimatingAll(false) : stopAnimatingAll(); });

noAnimate.addEventListener("change", () => { 
  if (noAnimate.checked) stopAnimatingAll(); });


// The different duration causes the animation to become irregular and 
// out of sync. Remove line to default to 20 seconds for all.
// See line 119 in CSS.
// Add speed multiplier to slow down, e.g. len/1000 * 2.
// animation: dash ${len/1000}s ease-in-out alternate infinite;
// animation: dash 20s ease-in-out alternate infinite;


function startAnimatingAll(sync) {
  // console.log("animate svgs");
  let order = orderOptions[orderOptions.selectedIndex].value;
  let style = styleOptions[styleOptions.selectedIndex].value;
  // remove old styles
  let oldStyle = document.getElementById("animationLengths");
  if(oldStyle) document.head.removeChild(oldStyle);
  let oldStyle2 = document.getElementById("animationSpeeds");
  if(oldStyle2) document.head.removeChild(oldStyle2);
  // add new styles
  let newStyle = document.createElement("link");
  newStyle.rel = "stylesheet";
  newStyle.href = `css/${style}Lengths${order}.css`;
  newStyle.id = "animationLengths";
  document.head.appendChild(newStyle);
  svgGrid.classList.add("animateEvenly");
  if(!sync) {
    let indivStyle = document.createElement("link");
    indivStyle.rel = "stylesheet";
    indivStyle.href = `css/${style}Speeds${order}.css`;
    indivStyle.id = "animationSpeeds";
    document.head.appendChild(indivStyle);
    svgGrid.classList.remove("animateEvenly");
  }
}

function stopAnimatingAll() {
  let style = document.getElementById("animationLengths");
  if (style) document.head.removeChild(style);
  let style2 = document.getElementById("animationSpeeds");
  if (style2) document.head.removeChild(style2);
  svgGrid.classList.remove("animateEvenly");
}

