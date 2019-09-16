"use strict";

function animate(counter) {

  const square = document.getElementById(`square-${counter}`);

  let length = Math.ceil(square.getTotalLength());
  console.log(length);

  extra_styles.innerHTML += `
    #square-${counter} {
      stroke-dasharray: ${length};
      stroke-dashoffset: ${length};
    }
  `;

}





