"use strict";


function startAnimatingAll() {
  // console.log("animate svgs");
  const [...allSVGs] = document.getElementsByClassName("order-x");
  for (let a in allSVGs) {
    let len = Math.ceil(allSVGs[a].firstChild.getTotalLength());
    let text = `
      #square-${parseInt(a) + 1} {
        stroke-dasharray: ${len};
        stroke-dashoffset: ${len};
      }
    `;
    extra_styles.insertAdjacentText("beforeend", text);
    allSVGs[a].firstChild.classList.add("animate");
  }
}


function stopAnimatingAll() {
  // console.log("stop animation");
  const allSVGs = document.querySelectorAll(".order-x");
  allSVGs.forEach(a => {
    a.classList.remove("animate");
  });
  let extra = extra_styles.innerText;
  if (extra.includes("svg")) {
    // remove all animation related styles but not any colour related styles
    let regex = /svg { fill: #?\w+; stroke: #?\w+; }\n?\s*svg text { fill: #?\w+; }/gm;
    let regMatch = extra.match(regex)[0];
    extra_styles.innerHTML = regMatch;
  }
}
