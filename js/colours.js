"use strict";

// COLOURS

let currentColours = {
  "fill": "none",
  "stroke": "#eeeeee",
  "back": "#222222",
  "text": "#eeeeee"
};

// EVENT LISTENERS
fillColour.addEventListener("change", updateColours);
strokeColour.addEventListener("change", updateColours);
textColour.addEventListener("change", updateColours);
backColour.addEventListener("change", updateColours);
clearFill.addEventListener("change", () => toggleFill(clearFill.checked));


function updateColours() {
  clearFill.checked
    ? currentColours.fill = "none" 
    : currentColours.fill = fillColour.value;
  currentColours.stroke = strokeColour.value;
  currentColours.text = textColour.value;
  currentColours.back = backColour.value;
  document.body.style.background = currentColours.back;
  // update colours or add them in the first place
  if (extra_colour_styles.innerText.includes("svg")) { 
    // console.log(`overriding svg colours css`);
    let txt = extra_colour_styles.innerText;
    let rexFill = /svg { fill: (#?\w+);/m;
    let rexStroke = /svg { fill: #?\w+; stroke: (#?\w+);/m;
    let rexText = /svg text { fill: (#?\w+);/m;
    let fillMatch = txt.match(rexFill);
    let strokeMatch = txt.match(rexStroke);
    let textMatch = txt.match(rexText);
    let txtF = txt.replace(fillMatch[1], currentColours.fill);
    let txtFS = txtF.replace(strokeMatch[1], currentColours.stroke);
    let txtFST = txtFS.replace(textMatch[1], currentColours.text);
    extra_colour_styles.innerHTML = txtFST;
  } else {
    // console.log(`adding svg colours css for first time`);
    let text = `
      svg { fill: ${currentColours.fill}; stroke: ${currentColours.stroke}; }
      svg text { fill: ${currentColours.text}; }
    `;
    extra_colour_styles.insertAdjacentText("beforeend", text);
  }
}

function toggleFill(nofill) {
  // console.log(`setting hide-fill to ${nofill}`);
  if (nofill) {  // fill colour transparent
    clearFill.checked = true;
    fillColour.disabled = true;
    fillColour.previousSibling.classList.add("disable");
  } else {  // fill colour as selected
    clearFill.checked = false;
    fillColour.disabled = false;
    fillColour.previousSibling.classList.remove("disable");
  }
  updateColours();
}