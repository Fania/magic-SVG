"use strict";


const styles = ["quadvertix", "straight", "arc", "quadline"];


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
      "quadvertix": { "${lengths.quadvertix}": [] },
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
// showAllPNGs("quadvertix");
// showAllPNGs("straight");
// showAllPNGs("quadline");














// generate animation CSS
function generateAnimationCSS(order, style, sync) {
  let output = `/* Order-${order} ${style} ${sync ? "lengths" : "speeds"} */`;
  const index = orderIndex[order];
  for (let i=0; i < index.length; i++) {
    let len = Object.keys(index[i][style])[0];
    let lengths = `
#${style}-${order}-${i + 1} .lines { stroke-dasharray: ${len}; stroke-dashoffset: ${len}; }`;
    let speeds = `
#${style}-${order}-${i + 1} .lines { animation: dash ${len/1000 * 2}s ease-in-out alternate infinite; }`;
    output += sync ? lengths : speeds;
  }
  return output;
}
// console.log( generateAnimationCSS( 3, "straight", false ) );
// console.log( generateAnimationCSS( 4, "straight", false ) );
// console.log( generateAnimationCSS( 5, "straight", false ) );
// console.log( generateAnimationCSS( 6, "straight", false ) );
// console.log( generateAnimationCSS( 7, "quadvertix", false ) );
// console.log( generateAnimationCSS( 8, "quadvertix", false ) );
// console.log( generateAnimationCSS( 9, "quadvertix", false ) );










// BROKEN ATM BUT WILL BE OVERWRITTEN WITH SVG2PNG STUFF IN FILTERS

// add deletable info into index
// function generateDeletables(index) {
//   let tmp = {};
//   let tmp2 = {};
//   for (let i=0; i< deletables.length; i++) {
//     let match = [...deletables[i].matchAll(/(\d+,?\s?\d*,?\s?\d*)\s(.*)\s(\d+)/g)][0];
//     let dupls = match[1].split(",");
//     let duplicates = dupls.map(d => parseInt(d));
//     let kind = match[2];
//     let keeper = match[3];
//     console.log(keeper, kind, duplicates);
//     let tmp3 = duplicates.forEach(d => { tmp2[d] = kind });
//     tmp[keeper] = tmp3;
//   }
//   console.log(tmp);
//   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//   // current similarities are based on quadvertix style only 
//   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//   for (let j=0; j<index.length; j++) {
//     if(tmp[j]) {
//       let xs = tmp[j].list;
//       let t = tmp[j].type;
//       index[j].duplicates.ids = xs;
//       index[j].duplicates.type = t;
//     } else {
//       index[j].duplicates.ids = "";
//       index[j].duplicates.type = "";
//     }
//   }
//   return index;
// }
// let final = generateDeletables(indexSharedLengths);
// console.log(final);
