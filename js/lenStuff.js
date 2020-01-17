"use strict";


console.log("hello world");
// console.dir(index4);

for (let i=0; i < index4.length; i++) {
  let message = `
    square-${i + 1}
      quad: ${index4[i].lens.quad}
      straight: ${index4[i].lens.straight}
      arc: ${index4[i].lens.arc}
      qline: ${index4[i].lens.qline}
  `;
};


let filtered = index4.filter( square => square.lens.quad == 2164 );

console.log(filtered);

filtered.forEach( f => {
  console.log(index4.indexOf(f) + 1);
});