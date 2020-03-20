"use strict";


const styles = ["numbers", "straight", "quadvertex", "quadline", "arc", "altarc"];
const orders = ["3","4","4R","4RA","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"];

// STEP 1
// create master index with lengths and svg data
function generateInitialIndex(order) {
  const source = sources[order];
  // console.log(source);
  let output = `[`;
  let lengths = {};
  source.forEach( (valuesArray,i) => {
    // console.log(i, valuesArray);
    styles.forEach( style => {
      const size = parseInt(order);
      const coordsObject = getCoords(size,valuesArray);
      const svgString = prepareSVG(style,coordsObject,i+1);
      const svg = new DOMParser().parseFromString(svgString, 'text/html');
      const len = style == "numbers" ? 0
                  : Math.ceil(svg.querySelector(".lines").getTotalLength());
      lengths[style] = [len,svgString];
    });
    const txt = `
    { "id":         ${i + 1},
      "numbers":    { "array": [${valuesArray}],
                      "svg": "${lengths.numbers[1]}" },
      "straight":   { "${lengths.straight[0]}": [], 
                      "svg": "${lengths.straight[1]}" },
      "quadvertex": { "${lengths.quadvertex[0]}": [], 
                      "svg": "${lengths.quadvertex[1]}" },
      "quadline":   { "${lengths.quadline[0]}": [], 
                      "svg": "${lengths.quadline[1]}" },
      "arc":        { "${lengths.arc[0]}": [], 
                      "svg": "${lengths.arc[1]}" },
      "altarc":     { "${lengths.altarc[0]}": [], 
                      "svg": "${lengths.altarc[1]}" }
    }${ (i!==(source.length -1)) ? "," : "" }`;
    output += txt;
  });
  output += `
  ]`;
  return JSON.parse(output);
}



// STEP 2
// add shared lengths into master index
function generateSharedLengths(index) {
  styles.forEach( style => {
    if (style != "numbers") {
      const lengths = index.map(i => Object.keys(i[style])[0]);
      let output = {};
      lengths.forEach( len => {
        const matches = index.filter(i => Object.keys(i[style])[0] == len);
        const similarIDs = matches.map(m => m.id);
        output[len] = similarIDs;
      });
      // add shared lengths into index
      index.forEach( idx => {
        const l = Object.keys( idx[style] )[0];
        idx[style][l] = output[l].filter(o => o !== idx.id);  // remove self
      });
    }
  });
  return index;
}









// STEP 3
// GENERATE NEW INDEX HERE IN ONE COMMAND
function printNewIndex(order) {
  let final = generateSharedLengths(
                generateInitialIndex(order)
              );
  if(order === "4R" || order === "4") final = generateSimilarities(final);
  const fullText = `const index${order} = ${JSON.stringify(final)};`;
  download.href = makeTextFile( fullText );
  download.innerText = `Download index for order ${order}`;
  download.setAttribute('download', `index${order}.js`);
}

// printNewIndex( "4RA" );










// STEP 4
// add similarity data from manual list
function generateSimilarities(index) {
  // console.log(index);
  index.forEach(idx => {
    // console.log(idx);
    idx["simQuadVertex"] = duplicatesSorted[idx.id -1][1];
  });
  return index;
}
// console.log( generateSimilarities(indexFania880) );














// DOWNLOAD FILE
function makeTextFile(text) {
  let textFile = null;
  const data = new Blob([text], {type: 'text/plain'});
  // If replacing a previously generated file
  // manually revoke object URL to avoid memory leaks.
  textFile !== null ? window.URL.revokeObjectURL(textFile)
                    : textFile = window.URL.createObjectURL(data);
  return textFile;
}







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














// GENERATE ANIMATION CSS
function printNewAnimCSS(style, sync) {
  let output = "";
  orders.forEach( order => {
    output += `\n\n/* Order-${order} ${style} ${sync ? "lengths" : "speeds"} */`;
    const index = indices[order];
    index.forEach( idx => {
      const len = Object.keys(idx[style])[0];
      if (sync) {
        const lengths = `
#${style}-${order}-${idx.id} .lines { stroke-dasharray: ${len}; stroke-dashoffset: ${len}; }`;
        output += lengths;
      } else {
        const speeds = `
#${style}-${order}-${idx.id} .lines { animation: dash ${len/1000 * 2}s ease-in-out alternate infinite; }`;
        output += speeds;
      }
    });
  });
  download.href = makeTextFile( output );
  download.innerText = `Download css for ${style} ${sync ? "lengths" : "speeds"}`;
  download.setAttribute('download', `${style}${sync ? "Lengths" : "Speeds"}.css`);
}

// printNewAnimCSS( "altarc", false );



















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
  const index = indices[order];
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

