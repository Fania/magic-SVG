"use strict";


animate.addEventListener("change", () => { 
  animate.checked ? startAnimatingAll() : stopAnimatingAll(); });


function getAnimationLengths() {
  console.log("getAnimationLengths");
  const [...allSVGs] = document.getElementsByClassName("order-x");
  for (let a in allSVGs) {
    console.log(a);
    let len = Math.ceil(allSVGs[a].firstChild.getTotalLength());
    let text = `
      #square-${parseInt(a) + 1} {
        stroke-dasharray: ${len};
        stroke-dashoffset: ${len};
      }
    `;
    extra_animation_styles.insertAdjacentText("beforeend", text);
  }
  
}



// function setWidthProgress(w) {
//   progressBar.style.width = `${w}%`;
// }


function startAnimatingAll() {
  // console.log("animate svgs");

  // getAnimationLengths();
  // progressBar.style.width = "0";

  const [...allSVGs] = document.getElementsByClassName("order-x");
  
  // let multiplier = (100 / allSVGs.length).toFixed(2);


  for (let a in allSVGs) {
    let num = parseInt(a) + 1;


    // PROGRESS BAR
    // let prog = num / allSVGs.length;
    // console.log(num);
    // console.log(progressBar);
    // console.log(progressBar.style.width);
    
    // let w = (num * multiplier).toFixed(2);
    // console.log(multiplier, w);
    // setWidthProgress(w);

    // if (a < allSVGs.length) {
    //   setTimeout(setWidthProgress(w), 100);
    // }


    // progressBar.style.width = `${w}%`;

    // let cw = prog.clientWidth;
    // console.log("cw", cw);
    



    // if (c === l) {
    //   let incr = c * multiplier;
    //   console.log("widths", incr, c, l);
    //   prog.style.width = `${incr}px`;
    //   // bar.style.display = "none";
    // } else {
    //   bar.style.display = "block";
    //   let incr = c * multiplier;
    //   console.log("widths", incr, c, l);
    //   prog.style.width = `${incr}px`;
    // }


    // The different duration causes the animation to become irregular and 
    // out of sync. Remove line to default to 20 seconds for all.
    // See line 119 in CSS.
    // Add speed multiplier to slow down, e.g. len/1000 * 2.
    // animation: dash ${len/1000}s ease-in-out alternate infinite;
    // animation: dash 20s ease-in-out alternate infinite;
    let len = Math.ceil(allSVGs[a].firstChild.getTotalLength());
    let text = `
      #square-${parseInt(a) + 1} {
        stroke-dasharray: ${len};
        stroke-dashoffset: ${len};
        animation: dash ${len/1000 * 2}s ease-in-out alternate infinite;
      }
    `;
    extra_animation_styles.insertAdjacentText("beforeend", text);
    allSVGs[a].firstChild.classList.add("animate");
  }
}


function stopAnimatingAll() {
  // console.log("stop animation");
  const allSVGs = document.querySelectorAll(".order-x");
  allSVGs.forEach(a => {
    a.classList.remove("animate");
  });
  extra_animation_styles.innerHTML = "";
}
