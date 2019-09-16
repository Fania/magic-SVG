"use strict";

  function animate() {

    const square = document.querySelectorAll(".lines");
    console.log(square);


    for (let s in square) {
      let length = square.getTotalLength();
      console.log(length);
    }

  }





// .lines {
//   stroke-dasharray: 2000;
// 	stroke-dashoffset: 2000;
// 	animation: dash 5s linear forwards;
// }
// @keyframes dash {
//   to {
//     stroke-dashoffset: 0;
//   }
// }




