"use strict";

function animate(counter) {

  const square = document.getElementById(`square-${counter}`);
  const length = Math.ceil(square.getTotalLength());
  // console.log(length);

  const text = `
    #square-${counter} {
      stroke-dasharray: ${length};
      stroke-dashoffset: ${length};
    }
  `;

  extra_styles.insertAdjacentText("beforeend", text);
  square.classList.add("animate");

}

function stopAnimation(counter) {
  console.log("stop animation");

  const square = document.getElementById(`square-${counter}`);
  square.classList.remove("animate");

  let extra = extra_styles.innerText;
  if (extra.includes("svg")) {
    console.log("extrastyles includes colour svg stuff");
    // remove all animation related styles but not any colour related styles
    let regex = /svg { fill: #?\w+; stroke: #?\w+; }\n?\s*svg text { fill: #?\w+; }/gm;
    let regMatch = extra.match(regex)[0];
    extra_styles.innerHTML = regMatch;
  }

}
