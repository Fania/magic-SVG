// create index with lengths
function generateIndex(order) {
  const styles = ["quadvertix", "straight", "arc", "quadline"];
  const source = eval(`order${order}`);
  let output = `const index${order} = [`;
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

// console.log(generateIndex(6));




// from lengths4.js
// let uniquestraight = [...new Set(lensStraight4)]; 
// let uniquequadvertix = [...new Set(lensQuad4)]; 
// let uniquequadline = [...new Set(lensQLine4)]; 
// let uniquearc = [...new Set(lensArc4)]; 


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
// console.log(generateAnimationCSS(index4, "straight", true));
