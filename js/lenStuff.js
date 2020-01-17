"use strict";


console.log("hello world");
// console.dir(index4);

let f = []; 
// for (let i=0; i < index4.length; i++) {
//   let message = `
//     square-${i + 1}
//       quad: ${index4[i].lens.quad}
//       straight: ${index4[i].lens.straight}
//       arc: ${index4[i].lens.arc}
//       qline: ${index4[i].lens.qline}
//   `;
//   let lenS = index4[i].lens.straight;
//   let filtered = filterByLength(lenS, "straight");
//   f[i] = filtered;
//   // console.log(`${i} ${lenS} ${filtered.length}`);
// };

// console.log(f);


let uniquestraight = [...new Set(lensStraight)]; 
let uniquequad = [...new Set(lensQuad)]; 
let uniqueqline = [...new Set(lensQLine)]; 
let uniquearc = [...new Set(lensArc)]; 

// console.log("uniqueStraight", uniqueStraight);
// console.log("uniqueQuad", uniqueQuad);
// console.log("uniqueQLine", uniqueQLine);
// console.log("uniqueArc", uniqueArc);



function generateList(type) {
  let list = eval(`unique${type}`);
  // console.log(list);
  let output = {};
  for (let i=0; i < list.length; i++) {
    let len = list[i];
    let filtered = filterByLength(len, type);

    let newF = {};
    filtered.forEach(f => {
      let idx = index4.indexOf(f);
      let nums = index4[idx];
    });

    output[len] = newF;
    // console.log(`${i} ${len} ${filtered.length}`);
  };
  console.log(`${type} lengths (${output.length})`);
  console.log(output);
}

console.log(generateList("straight"));
console.log(generateList("quad"));
console.log(generateList("qline"));
console.log(generateList("arc"));


    // let feedbackS = {};
    // uniquestraight.forEach(f => {
    //   let idx = index4.indexOf(f);
    //   let nums = f.nums;
    //   feedbackS.idx = nums;
    // });
    // // let feedback = filtered.map(f => [index4.indexOf(f), f.nums]);
    // console.log("feedback straight", feedbackS);






function filterByLength(len, type) {
  return index4.filter( square => square.lens[type] == len );
}

// let filtered = index4.filter( square => square.lens.quad == 2164 );

// console.log(filtered);

// filtered.forEach( f => {
//   console.log(index4.indexOf(f) + 1);
// });