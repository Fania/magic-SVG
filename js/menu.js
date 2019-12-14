"use strict";


const singleMultiple = document.getElementsByName("singleMultiple");
singleMultiple.forEach(sm => {
  sm.addEventListener("change", () => {
    let id = event.target.id;
    // console.log(`changed page to ${event.target.id}`);
    load(getPageType());  // reload page setup
    // id === "orderGroups" ? multiSettings(): singleSettings();
  });
});


// update when user inputs manual magic square numbers
settings.addEventListener("submit", () => {
  load("singleInput");
  event.preventDefault();
});


function multiSettings() {
  // console.log(`get settings for multiple squares`);
  clearFill.disabled = false;
  clearFill.previousSibling.classList.remove("disable");
  fillColour.disabled = clearFill.checked;
  strokeColour.disabled = false;
  strokeColour.previousSibling.classList.remove("disable");
  textColour.disabled = true;
  textColour.previousSibling.classList.add("disable");
  padding.disabled = false;
  padding.previousSibling.classList.remove("disable");
  animate.disabled = false;
  animate.previousSibling.classList.remove("disable");
  styleOptions.disabled = false;
  orderOptions.disabled = false;
  values.disabled = true;
  values.previousElementSibling.classList.add("disable");
  // drawSubmit.disabled = true;
  svgGrid.classList.remove("single");
}


function singleSettings() {
  // console.log(`get settings for a single square input`);
  clearFill.disabled = false;
  clearFill.previousSibling.classList.remove("disable");
  fillColour.disabled = clearFill.checked;
  strokeColour.disabled = false;
  strokeColour.previousSibling.classList.remove("disable");
  textColour.disabled = false;
  textColour.previousSibling.classList.remove("disable");
  padding.disabled = true;
  padding.previousSibling.classList.add("disable");
  animate.disabled = false;
  animate.previousSibling.classList.remove("disable");
  styleOptions.disabled = true;
  orderOptions.disabled = true;
  values.disabled = false;
  values.previousElementSibling.classList.remove("disable");
  // drawSubmit.disabled = false;
  svgGrid.classList.add("single");
}


function squareSettings() {
  // console.log(`get settings for visual squares`);
  clearFill.disabled = false;
  clearFill.previousSibling.classList.remove("disable");
  fillColour.disabled = clearFill.checked;
  strokeColour.disabled = false;
  strokeColour.previousSibling.classList.remove("disable");
  textColour.disabled = true;
  textColour.previousSibling.classList.add("disable");
  padding.disabled = false;
  padding.previousSibling.classList.remove("disable");
  animate.disabled = false;
  animate.previousSibling.classList.remove("disable");
}


function numberSettings() {
  // console.log(`get settings for number matrices`);
  clearFill.disabled = true;
  clearFill.previousSibling.classList.add("disable");
  fillColour.disabled = true;
  fillColour.previousSibling.classList.add("disable");
  strokeColour.disabled = true;
  strokeColour.previousSibling.classList.add("disable");
  textColour.disabled = false;
  textColour.previousSibling.classList.remove("disable");
  padding.disabled = true;
  padding.previousSibling.classList.add("disable");
  animate.disabled = true;
  animate.previousSibling.classList.add("disable");
}