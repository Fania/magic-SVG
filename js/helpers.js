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





// STEP 4
// add in png data to master index
function generatePNGs(index) {
  // let pngIndex = [];
  for (let i in index) {
    styles.forEach(s => {
      if(s!=="arc") {
        svgToPng(index[i][s]["svg"]).then((data)=>{
          index[i][s]["png"] = data;
          // pngIndex[i][s]["png"] = data;
        });
      }
    });
  }
  return index;
  // return pngIndex;
}


// GENERATE NEW INDEX HERE IN ONE COMMAND
// let final = generatePNGs( 
//               generateSVGs(
//                 generateSharedLengths(
//                   generateInitialIndex(4)
//                 )
//               )
//             );
// console.log(final);

// WITHOUT PNGS
// let final = generateSVGs(
//               generateSharedLengths(
//                 generateInitialIndex(9)
//               )
//             );
// console.log(final);

// PNGS ONLY ??






function showAllPNGs(style) {
  for (let i in index4new) {
    document.body.insertAdjacentHTML("beforeend", 
      `<img class="png-${i}" width="200" height="200" src="${index4new[i][style]["png"]}">`);
  }
}
// showAllPNGs("quadvertex");
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








// [
//   { 1: [ { 2: "mirror" },
//          { 34: "90 rotation" },
//          { 431: "same" },
//          ...
//        ]
//   },
//   ...
// ]
function generateSimilarities(index,style) {
  const similarities = [];

  index.forEach( (idx, i) => {
    const dups = idx[style][Object.keys(idx[style])[0]];
    const self = idx.id;

    const objA = {};
    objA[self] = [];
    similarities[i] = objA;

    const svgA = idx[style].svg;
    svgToPng(svgA).then( pngA => { 
      
      // REMBRANDT SOLUTION ... SLOW
      dups.forEach(d => {
        svgToPng(index[d - 1][style].svg).then( pngB => { 
          comparePNGs(index,style,d,pngA,pngB).then(result => { 
            similarities[i][self].push(result);
          });
        });
      });
    });
  });
  return similarities;
}

// console.log( generateSimilarities(index4, "quadvertex") );
// console.log( generateSimilarities(index4mini, "quadvertex") );


function comparePNGs(index, style, i, pngA, pngB) {
  return new Promise((resolve, reject) => {
    const rembrandt = new Rembrandt({
      imageA: pngA,
      imageB: pngB,
      thresholdType: Rembrandt.THRESHOLD_PERCENT,
      maxThreshold: 0.01,
      maxDelta: 0.02,
      maxOffset: 0,
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





const mini4SimsQuadvertex = [
  { "1": [ { "2": "identical" } ] },
  { "2": [ { "1": "identical" } ] },
  { "3": [ { "4": "TBC" } ] },
  { "4": [ { "3": "TBC" } ] }
];



