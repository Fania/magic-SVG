"use strict";


// order-X.js -> indexX.js
// create index with lengths per style
function generateIndex(order,reduced) {
  const styles = ["quadvertix", "straight", "arc", "quadline"];
  const source = eval(`${reduced ? "reduced" : "order"}${order}`);
  let output = `const index${order}${reduced ? "reduced" : ""} = [`;
  let lengths = {};
  for (let i=0; i < source.length; i++) {
    for (let j=0; j < styles.length; j++) {
      let valuesArray = source[i].split(" ").map(Number);
      let coordsArray = getCoords(order,valuesArray);
      let svgString = prepareSVG(styles[j],order,coordsArray,i,0);
      let svg = new DOMParser().parseFromString(svgString, 'text/html');
      let len = Math.ceil(svg.querySelector(".lines").getTotalLength());
      lengths[styles[j]] = len;
    }
    let txt = `
    {
      "nums": "${source[i]}",
      "lens": {
        "quadvertix": ${lengths.quadvertix},
        "straight": ${lengths.straight},
        "arc": ${lengths.arc},
        "quadline": ${lengths.quadline}
      }
    }${ (i!==(source.length -1)) ? "," : "" }`;
    output += txt;
  }
  output += `
  ];`;
  return output;
}
// console.log(generateIndex(3,false));
// console.log(generateIndex(4,false));
// console.log(generateIndex(5,false));
// console.log(generateIndex(6,false));
// console.log(generateIndex(4,true));






// to generate animation CSS
// input: index4, "quadvertix", true
// generateAnimationCSS(index4, "quadvertix", true)
function generateAnimationCSS(index, style, sync) {
  let output = `/* ${style} ${sync ? "lengths" : "speeds"} */`;
  for (let i=0; i < index.length; i++) {
    let len = index[i].lens[style];
    let lengths = `
#num-${i + 1} .lines {
  stroke-dasharray: ${len};
  stroke-dashoffset: ${len};
}`;
    let speeds = `
#num-${i + 1} .lines { animation: dash ${len/1000 * 2}s ease-in-out alternate infinite; }`;
    output += sync ? lengths : speeds;
  }
  return output;
}
// generateAnimationCSS(index4, "quadvertix", true);
// console.log(generateAnimationCSS(index6, "quadvertix", true));
// console.log(generateAnimationCSS(index6, "quadvertix", false));
// console.log(generateAnimationCSS(index6, "straight", true));
// console.log(generateAnimationCSS(index6, "straight", false));
// console.log(generateAnimationCSS(index6, "arc", true));
// console.log(generateAnimationCSS(index6, "arc", false));
// console.log(generateAnimationCSS(index6, "quadline", true));
// console.log(generateAnimationCSS(index6, "quadline", false));








// UNUSED ??? OLD

// from lengths4.js
// let uniquestraight = [...new Set(lensStraight4)]; 
// let uniquequadvertix = [...new Set(lensQuad4)]; 
// let uniquequadline = [...new Set(lensQLine4)]; 
// let uniquearc = [...new Set(lensArc4)]; 


// indexX.js -> filteredX.js
// used to update lists in filtered.js
function generateList(order,style) {
  // console.log(`generating lengths ${order}, ${style}`);
  let index = eval(`index${order}`);
  let lengths = index.map(i => i.lens[style]);
  let output = {};
  for (let i=0; i < lengths.length; i++) {
    let len = lengths[i];
    let matches = index.filter(i => i.lens[style] == len);
    let out = matches.map(t => index.indexOf(t));
    output[len] = out;
  };
  return output;
}
// console.log(generateList(3,"quadvertix"));
// console.log(generateList(3,"straight"));
// console.log(generateList(3,"arc"));
// console.log(generateList(3,"quadline"));

