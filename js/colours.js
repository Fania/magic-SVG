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
  } else {  // fill colour as selected
    clearFill.checked = false;
    fillColour.disabled = false;
  }
  updateColours();
}






const numberColours = {
  1: "red",
  2: "orange",
  3: "yellow",
  4: "green",
  5: "blue",
  6: "indigo",
  7: "violet",
  8: "rose",
  9: "gold"
}

function getDigitalRoot(n) {
  const n2String = n.toString().split('');
  const listOfNums = n2String.map(n => parseInt(n));
  const sum = listOfNums.reduce( (i,a) => i + a );
  const output = (sum > 9) ? getDigitalRoot(sum) : sum;
  return output;
}
// console.log(getDigitalRoot(8));
// console.log(getDigitalRoot(12));
// console.log(getDigitalRoot(99));


// animateColours.addEventListener("change", () => { 
//   animateColours.checked ? cycleColours() : stopAnimatingAll(); });

// function cycleColours() {
//   console.log("colours");
//   startAnimatingAll(true);
// } 











night.addEventListener("click", () => toggleDayNight() );
day.addEventListener("click", () => toggleDayNight() );

function toggleDayNight() {
  if (night.checked) {
    settings.classList.remove("dayMode");
    document.querySelector(".instructions").classList.remove("dayMode");
    document.querySelector("footer").classList.remove("dayMode");
    document.querySelector("body").classList.remove("dayMode");
    about.classList.remove("dayMode");
    nightLabel.innerHTML = "<i class='fas fa-moon'></i>";
    dayLabel.innerHTML = "<i class='far fa-sun'></i>";
    backColour.value = "#222222";
    strokeColour.value = "#ffffff";
    textColour.value = "#ffffff";
    document.querySelector("[alt='logo']").src = "imgs/logo.svg";
  } else {
    settings.classList.add("dayMode");
    document.querySelector(".instructions").classList.add("dayMode");
    document.querySelector("footer").classList.add("dayMode");
    document.querySelector("body").classList.add("dayMode");
    about.classList.add("dayMode");
    nightLabel.innerHTML = "<i class='far fa-moon'></i>";
    dayLabel.innerHTML = "<i class='fas fa-sun'></i>";
    backColour.value = "#ffffff";
    strokeColour.value = "#000000";
    textColour.value = "#000000";
    document.querySelector("[alt='logo']").src = "imgs/logo-dark.svg";
  }
  updateColours();
}
