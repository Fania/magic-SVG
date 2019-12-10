"use strict";


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



    let len = Math.ceil(allSVGs[a].firstChild.getTotalLength());
    let text = `
      #square-${parseInt(a) + 1} {
        stroke-dasharray: ${len};
        stroke-dashoffset: ${len};
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
