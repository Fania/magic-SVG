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

  extra_styles.insertAdjacentHTML("beforeend", text);
  square.classList.add("animate");

}

function stopAnimation(counter) {

  const square = document.getElementById(`square-${counter}`);
  square.classList.remove("animate");
  extra_styles.innerHTML = "";
  updateColours();
  
}
