"use strict";


const styles = ["quadvertex", "straight", "arc", "quadline"];


// STEP 1
// create master index
function generateInitialIndex(order) {
  const source = squareOrder[order];
  let output = `[`;
  let lengths = {};
  for (let i=0; i < source.length; i++) {
    let valuesArray = source[i].split(" ").map(Number);
    for (let j=0; j < styles.length; j++) {
      let coordsObject = getCoords(order,valuesArray);
      let svgString = prepareSVG(styles[j],coordsObject,i+1);
      let svg = new DOMParser().parseFromString(svgString, 'text/html');
      let len = Math.ceil(svg.querySelector(".lines").getTotalLength());
      lengths[styles[j]] = len;
    }
    let txt = `
    {
      "id": ${i + 1},
      "numbers": { "string": "${source[i]}", "array": [${valuesArray}] },
      "quadvertex": { "${lengths.quadvertex}": [] },
      "straight": { "${lengths.straight}": [] },
      "arc": { "${lengths.arc}": [] },
      "quadline": { "${lengths.quadline}": [] }
    }${ (i!==(source.length -1)) ? "," : "" }`;
    output += txt;
  }
  output += `
  ]`;
  return JSON.parse(output);
}






// STEP 2
// add shared lengths into master index
function generateSharedLengths(index) {
  styles.forEach(style => {
    const lengths = index.map(i => Object.keys(i[style])[0]);
    let output = {};
    lengths.forEach(len => {
      let matches = index.filter(i => Object.keys(i[style])[0] == len);
      let matchList = matches.map(m => m.id);
      output[len] = matchList;
    });
    // add shared lengths into index
    for(let j in index) {
      let x = index[j][style];
      let l = Object.keys(x)[0];
      x[l] = output[l].filter(o => o !== (parseInt(j)+1));  // remove self
    }
  });
  return index;
}






// STEP 3
// add SVG data into master index
function generateSVGs(index) {
  for (let idx in index) {
    let id = parseInt(idx) + 1;
    let valuesArray = index[idx]["numbers"]["array"];
    let order = Math.sqrt(valuesArray.length);
    index[idx]["numbers"]["svg"] = prepareSVG("numbers",getCoords(order,valuesArray),id);
    styles.forEach(style => {
      let mysvg = prepareSVG(style,getCoords(order,valuesArray),id);
      index[idx][style]["svg"] = mysvg;
    });
  }
  return index;
}





// GENERATE NEW INDEX HERE IN ONE COMMAND
// let final = generateSVGs(
//               generateSharedLengths(
//                 generateInitialIndex(9)
//               )
//             );
// console.log(final);







// generate separate index for png data
function generatePNGs(index, transformation, degree) {
  let pngIndex = [];

  index.forEach(idx => {
    let current = {};
    current["id"] = idx.id;
    ["quadvertex", "quadline", "straight"].forEach( style => {
      const svgString = idx[style].svg;
      svgToTransPng(svgString, transformation, degree).then( data => { 
        current[style] = data.src;
      });
    });
    pngIndex.push( current );
  });
  return pngIndex;
}

// console.log( generatePNGs(index4mini) );
// console.log( generatePNGs(index4) );
// console.log( generatePNGs(index4, "rotate", 90) );
// console.log( generatePNGs(index4, "mirrorLR") );











function showAllPNGs(index,style) {
  for (let i=0; i<10; i++) {
  // index.forEach( (idx,i) => {
    document.body.insertAdjacentHTML("beforeend", 
      `<img width="200" height="200" src="${index[i][style]}">`);
  }
}
// showAllPNGs(jpegs4,"quadvertex");
// showAllPNGs(jpegs4rot90,"quadvertex");
// showAllPNGs("straight");
// showAllPNGs("quadline");









// generate animation CSS
function generateAnimationCSS(order, style, sync) {
  let output = `/* Order-${order} ${style} ${sync ? "lengths" : "speeds"} */`;
  const index = orderIndex[order];
  for (let i=0; i < index.length; i++) {
    const len = Object.keys(index[i][style])[0];
    const lengths = `
#${style}-${order}-${i + 1} .lines { stroke-dasharray: ${len}; stroke-dashoffset: ${len}; }`;
    const speeds = `
#${style}-${order}-${i + 1} .lines { animation: dash ${len/1000 * 2}s ease-in-out alternate infinite; }`;
    output += sync ? lengths : speeds;
  }
  return output;
}
// console.log( generateAnimationCSS( 3, "quadvertex", false ) );
// console.log( generateAnimationCSS( 4, "quadvertex", false ) );
// console.log( generateAnimationCSS( 5, "quadvertex", false ) );
// console.log( generateAnimationCSS( 6, "quadvertex", false ) );
// console.log( generateAnimationCSS( 7, "quadvertex", false ) );
// console.log( generateAnimationCSS( 8, "quadvertex", false ) );
// console.log( generateAnimationCSS( 9, "quadvertex", false ) );










function comparePNGs(i, pngA, pngB) {
  return new Promise((resolve, reject) => {
    const rembrandt = new Rembrandt({
      imageA: pngA,
      imageB: pngB,
      thresholdType: Rembrandt.THRESHOLD_PERCENT,
      maxThreshold: 0.20,  // 0.01
      maxDelta: 0.02,      // 0.02
      maxOffset: 0,        // 0
      renderComposition: false,
      compositionMaskColor: Rembrandt.Color.RED
    });
    rembrandt.compare().then( result => { 
      const objB = {};
      if (result.passed) { 
        objB[i] = "identical";
      } else {
        objB[i] = "TBC";
      }
      resolve(objB);
    }).catch((e) => { console.error(e) });
  });
}


// comparePNGs(0,jpegs4[8]["quadvertex"],jpegs4mirrorLR[12]["quadvertex"])
//   .then(result => console.log(result) );
// comparePNGs(0,jpegs4[8]["quadvertex"],jpegs4rot90[8]["quadvertex"])
//   .then(result => console.log(result) );
// comparePNGs(0,jpegs4[727]["quadvertex"],jpegs4[727]["quadvertex"])
//   .then(result => console.log(result) );

// document.body.insertAdjacentHTML("beforeend", 
//   `<img width="200" height="200" src="${jpegs4[8]["quadvertex"]}">`);
// document.body.insertAdjacentHTML("beforeend", 
//   `<img width="200" height="200" src="${jpegs4[12]["quadvertex"]}">`);
// document.body.insertAdjacentHTML("beforeend", 
//   `<img width="200" height="200" src="${jpegs4mirrorLR[12]["quadvertex"]}">`);
// document.body.insertAdjacentHTML("beforeend", 
//   `<img width="200" height="200" src="${jpegs4rot90[0]["quadvertex"]}">`);
// document.body.insertAdjacentHTML("beforeend", 
//   `<img width="200" height="200" src="${jpegs4[727]["quadvertex"]}">`);
// document.body.insertAdjacentHTML("beforeend", 
//   `<img width="200" height="200" src="${jpegs4rot90[445]["quadvertex"]}">`);






function generateSimilaritiesX(order,style) {
  const index = orderIndex[order];
  const pngs = orderPNGs[order];
  const similarities = [];
  index.forEach( (idx, i) => {

    let current = {};
    const self = idx.id;

    // ["quadvertex", "quadline", "straight"].forEach( style => {

      const dups = idx[style][Object.keys(idx[style])[0]];
      const pngA = pngs.find(p => p.id === self)[style];
      current["id"] = self;
      current[style] = [];

      // REMBRANDT SOLUTION ... SLOW
      dups.forEach(d => {
        const pngB = pngs.find(p => p.id === d)[style];
        comparePNGs(d,pngA,pngB).then(result => { 
          current[style].push(result);

          // if(current[style][d] === "TBC") {

          // }




        });

      });

    // });



    similarities.push(current);


  });
  return similarities;
}

// console.log( generateSimilaritiesX(4,"quadvertex") );

