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


function startAnimatingAll(sync) {
  const pageType = getCurrent("pageType");
  const styles = pageType === "singleInput" 
                  ? ["quadvertix", "quadline", "arc", "straight"] 
                  : [getCurrent("style")];
  stopAnimatingAll();  // remove old styles  
  styles.forEach(st => {
    let newStyle = document.createElement("link");
    newStyle.rel = "stylesheet";
    newStyle.href = `css/${st}Lengths.css`;
    newStyle.id = `${st}Lengths`;
    document.head.appendChild(newStyle);
    svgGrid.classList.add("animateEvenly");
    if(!sync) {
      let indivStyle = document.createElement("link");
      indivStyle.rel = "stylesheet";
      indivStyle.href = `css/${st}Speeds.css`;
      indivStyle.id = `${st}Speeds`;
      document.head.appendChild(indivStyle);
      svgGrid.classList.remove("animateEvenly");
    }
  });
}

function stopAnimatingAll() {
  const styleFiles = document.querySelectorAll("link[id$='Lengths'],[id$='Speeds']");
  styleFiles.forEach(sf => { if (sf) document.head.removeChild(sf) });
  svgGrid.classList.remove("animateEvenly");
}

