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
  let oldStyle = document.getElementById("animationStyles");
  if(oldStyle) document.head.removeChild(oldStyle);
  let style = styleOptions[styleOptions.selectedIndex].value;
  let newStyle = document.createElement("link");
  newStyle.rel = "stylesheet";
  newStyle.href = `css/${style}Sync4.css`;
  newStyle.id = "animationStyles";
  document.head.appendChild(newStyle);
  svgGrid.classList.add("animateEvenly");
  if(!sync) {
    let indivStyle = document.createElement("link");
    indivStyle.rel = "stylesheet";
    indivStyle.href = `css/${style}4.css`;
    indivStyle.id = "individualStyles";
    document.head.appendChild(indivStyle);
    svgGrid.classList.remove("animateEvenly");
  }

}

function stopAnimatingAll() {
  let style = document.getElementById("animationStyles");
  if (style) document.head.removeChild(style);
  let style2 = document.getElementById("individualStyles");
  if (style2) document.head.removeChild(style2);
  svgGrid.classList.remove("animateEvenly");
}

