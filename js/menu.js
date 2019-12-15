"use strict";


function updateMenuStates() {
  let type = getPageType();
  let style = styleOptions[styleOptions.selectedIndex].value;

  style==="numbers" ? clearFill.disabled=true : clearFill.disabled=false;
  fillColour.disabled = clearFill.checked;
  style==="numbers" ? strokeColour.disabled=true : strokeColour.disabled=false;
  type==="orderGroups" && style==="numbers" || type==="singleInput"
    ? textColour.disabled = false : textColour.disabled = true;
  type==="orderGroups" && style==="arc" || type==="singleInput" 
    ? padding.disabled = true : padding.disabled = false;
  style==="numbers" ? animate.disabled=true : animate.disabled=false;
  type==="orderGroups" 
    ? styleOptions.disabled = false : styleOptions.disabled = true;
  type==="orderGroups" 
    ? orderOptions.disabled = false : orderOptions.disabled = true;
  type==="orderGroups" ? values.disabled = true : values.disabled = false;
}


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


padding.addEventListener("change", togglePadding);
function togglePadding() {
  const squares = document.querySelectorAll(".order-x");
  squares.forEach(s => s.classList.toggle("pad"));
  const nums = document.querySelectorAll(".order-xt");
  nums.forEach(n => n.classList.toggle("pad"));
}
