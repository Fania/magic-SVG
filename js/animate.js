"use strict";


animate.addEventListener("change", () => { 
  animate.checked ? startAnimatingAll(true) : stopAnimatingAll(); });

animateOut.addEventListener("change", () => { 
  animateOut.checked ? startAnimatingAll(false) : stopAnimatingAll(); });

noAnimate.addEventListener("change", () => { 
  if (noAnimate.checked) stopAnimatingAll(); });


// animateColours happens in updateColours.js file


// The different duration causes the animation to become irregular and 
// out of sync. Remove line to default to 20 seconds for all.
// See line 119 in CSS.
// Add speed multiplier to slow down, e.g. len/1000 * 2.
// animation: dash ${len/1000}s ease-in-out alternate infinite;
// animation: dash 20s ease-in-out alternate infinite;


// console.log(document.styleSheets);

// for (let i = 0; i < document.styleSheets.length; i++) {
//   console.log(document.styleSheets[i].ownerNode.id);
// }
// mainStyles, extra_colour_styles


// #num-1 .lines {
//   stroke-dasharray: 1857;
//   stroke-dashoffset: 1857;
// }
// #num-1 .lines { animation: dash 3.714s ease-in-out alternate infinite; }
// const stylesheet = document.styleSheets[0];
// const rules = stylesheet.cssRules;

// for (let i of rules) {
//   // console.log(i);
//   if (i.type === 1) {  // CSSRule.STYLE_RULE
//     console.log(i);
//     console.log(i.selectorText);

//     if (i.selectorText === `#num-1 .lines`) {
//       i.selectorText = 'a:hover, a:active';
//     }

//   }
// }



// const rule = `#settings { background: red }`;

// // stylesheet.insertRule(rule, rules.length);
// stylesheet.insertRule(rule, 0);




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

