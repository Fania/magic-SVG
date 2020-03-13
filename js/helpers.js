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
//                 generateInitialIndex(19)
//               )
//             );
// console.log(final);





// function generateStats(index) {
//   for (let i in index) {
//     let id = parseInt(i) + 1;
//     let valuesArray = index[i]["numbers"]["array"];
//     console.log(id, valuesArray);
//     // let order = Math.sqrt(valuesArray.length);
//     // index[i]["numbers"]["svg"] = prepareSVG("numbers",getCoords(order,valuesArray),id);
//   }
//   return index;
// }


// // generateStats( index4 );
// // console.log( generateStats( index4 ) );











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
      maxThreshold: 0.01,  // 0.01, 0.20
      maxDelta: 0.02,      // 0.02
      maxOffset: 0,        // 0
      renderComposition: false,
      compositionMaskColor: Rembrandt.Color.RED
    });
    rembrandt.compare().then( result => { 
      // const objB = {};
      // if (result.passed) { 
      //   objB[i] = "identical";
      // } else {
      //   objB[i] = "TBC";
      // }
      // resolve(objB);
      resolve(result);
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
  // const pngs = orderPNGs[order];
  const similarities = [];
  index.forEach( (idx, i) => {

    let current = {};
    const self = idx.id;

    // ["quadvertex", "quadline", "straight"].forEach( style => {

      const dups = idx[style][Object.keys(idx[style])[0]];
      const pngA = jpegs4.find(p => p.id === self)[style];
      current["id"] = self;
      current[style] = [];

      // REMBRANDT SOLUTION ... SLOW
      dups.forEach(d => {
        const pngB = jpegs4.find(p => p.id === d)[style];
        comparePNGs(d,pngA,pngB).then(result => { 

          if(result.passed === false) {
            const pngC = jpegs4mirrorLR.find(p => p.id === d)[style];
            comparePNGs(d,pngA,pngC).then(result => { 
              console.log(result);
              const objAC = {};
              objAC[d] = result.passed ? "mirrorLR" : "TBC";
              current[style].push(objAC);
            });
          } else {
            // pngA === pngB
            const objAB = {};
            objAB[d] = "identical";
            current[style].push(objAB);
            // current[style].push("identical");
          }
          // generate each stage individually

        });

      });


    similarities.push(current);


  });
  return similarities;
}

// console.log( generateSimilaritiesX(4,"quadvertex") );
// console.log( generateSimilaritiesX("4m2","quadvertex") );

// document.body.insertAdjacentHTML("beforeend", 
//   `<img width="200" height="200" src="${jpegs4[8]["quadvertex"]}">`);
// document.body.insertAdjacentHTML("beforeend", 
//   `<img width="200" height="200" src="${jpegs4[12]["quadvertex"]}">`);
// // document.body.insertAdjacentHTML("beforeend", 
// //   `<img width="200" height="200" src="${jpegs4[i][style]}">`);

// comparePNGs(0,jpegs4[8]["quadvertex"],jpegs4[12]["quadvertex"]).then(result => { console.log(result) });
// comparePNGs(0,jpegs4[8]["quadvertex"],jpegs4[8]["quadvertex"]).then(result => { console.log(result) });


const order3all = [[2,7,6,9,5,1,4,3,8],[2,9,4,7,5,3,6,1,8],
                   [4,3,8,9,5,1,2,7,6],[4,9,2,3,5,7,8,1,6],
                   [6,1,8,7,5,3,2,9,4],[6,7,2,1,5,9,8,3,4],
                   [8,1,6,3,5,7,4,9,2],[8,3,4,1,5,9,6,7,2]];

const order4headTransformed = [
  [1,2,15,16,12,14,3,5,13,7,10,4,8,11,6,9],
  [16,15,2,1,5,3,14,12,4,10,7,13,9,6,11,8],
  [8,11,6,9,13,7,10,4,12,14,3,5,1,2,15,16],
  [1,12,13,8,2,14,7,11,15,3,10,6,16,5,4,9],
  [9,4,5,16,6,10,3,15,11,7,14,2,8,13,12,1],
  [8,13,12,1,11,7,14,2,6,10,3,15,9,4,5,16],
  [9,6,11,8,4,10,7,13,5,3,14,12,16,15,2,1],
  [16,5,4,9,15,3,10,6,2,14,7,11,1,12,13,8]];


function testPrints(input) {
  svgGrid.innerHTML = "";
  let o = Math.sqrt(input[0].length);
  for (let i=0; i<input.length; i++) {
    drawOurOwn(o, input[i], i+1);
  }
}
// testPrints(ourown);
// testPrints(order4headTransformed);
// testPrints(order3all);




function testPrintsCompare(ours,suzi) {
  svgGrid.innerHTML = "";
  let o = Math.sqrt(ours[0].length);
  for (let i=0; i<ours.length; i++) {
    let text = `
      <div class="" title="Our=${i} (${ours[i]})\nSuzuki=${i} (${suzi[i]})">
        <span class="ours">${prepareSVG("quadvertex",getCoords(o,ours[i]),i+1)}</span>
        <span class="suzuki">${prepareSVG("quadvertex",getCoords(o,suzi[i]),i+1)}</span>
      </div>
    `;
    drawSquare(text);
    // drawOurOwn(o, ours[i], i+1);
  }
}
testPrintsCompare(order4rOUR.sort(),suzuki.sort());

// console.log(suzuki.length, order4rOUR.length);
// console.log(suzuki.sort() == order4rOUR.sort());
