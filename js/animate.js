"use strict";


animate.addEventListener("change", () => { 
  animate.checked ? startAnimatingAll(true) : stopAnimatingAll(); });

animateOut.addEventListener("change", () => { 
  animateOut.checked ? startAnimatingAll(false) : stopAnimatingAll(); });

noAnimate.addEventListener("change", () => { 
  if (noAnimate.checked) stopAnimatingAll(); });


// function getAnimationLengths() {
//   console.log("getAnimationLengths");
//   const [...allSVGs] = document.getElementsByClassName("order-x");
//   for (let a in allSVGs) {
//     console.log(a);
//     let len = Math.ceil(allSVGs[a].firstChild.getTotalLength());
//     let text = `
//       #square-${parseInt(a) + 1} {
//         stroke-dasharray: ${len};
//         stroke-dashoffset: ${len};
//       }
//     `;
//     extra_animation_styles.insertAdjacentText("beforeend", text);
//   }
// }


function startAnimatingAll(sync) {
  // console.log("animate svgs");
  const [...allSVGs] = document.getElementsByClassName("order-x");
  extra_animation_styles.innerHTML = "";

  for (let a in allSVGs) {
    // let num = parseInt(a) + 1;

    // The different duration causes the animation to become irregular and 
    // out of sync. Remove line to default to 20 seconds for all.
    // See line 119 in CSS.
    // Add speed multiplier to slow down, e.g. len/1000 * 2.
    // animation: dash ${len/1000}s ease-in-out alternate infinite;
    // animation: dash 20s ease-in-out alternate infinite;

    let len = Math.ceil(allSVGs[a].firstChild.getTotalLength());
    // let len = ;



    let text = `
      #square-${parseInt(a) + 1} {
        stroke-dasharray: ${len};
        stroke-dashoffset: ${len};
        animation: dash ${sync ? 20 : (len/1000 * 2)}s ease-in-out alternate infinite;
      }
    `;
    extra_animation_styles.insertAdjacentText("beforeend", text);
  }
}

function stopAnimatingAll() {
  extra_animation_styles.innerHTML = "";
}


