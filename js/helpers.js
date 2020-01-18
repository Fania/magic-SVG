

// let uniquestraight = [...new Set(lensStraight)]; 
// let uniquequadvertix = [...new Set(lensQuad)]; 
// let uniquequadline = [...new Set(lensQLine)]; 
// let uniquearc = [...new Set(lensArc)]; 


// used to update lists in filtered.js
function generateList(type) {
  let list = eval(`unique${type}`);
  let output = {};
  for (let i=0; i < list.length; i++) {
    let len = list[i];
    let filtered = filterByLength(len, type);
    output[len] = filtered;
  };
  return output;
}

// console.log(generateList(""));



// to generate animation CSS
// input: index4, "quadvertix", true
// generateAnimationCSS(index4, "quadvertix", true)
function generateAnimationCSS(index, style, sync) {
  let output = `/* ${style} ${sync ? "sync" : ""} */`;
  for (let i=0; i < index.length; i++) {
    let len = index[i].lens[style];
    let dash = `
#num-${i + 1} .lines {
  stroke-dasharray: ${len};
  stroke-dashoffset: ${len};
}`;
    let anim = `
#num-${i + 1} .lines { animation: dash ${len/1000 * 2}s ease-in-out alternate infinite; }`;
    output += sync ? dash : anim;
  }
  return output;
}
// generateAnimationCSS(index4, "quadvertix", true);
// console.log(generateAnimationCSS(index4, "straight", true));
