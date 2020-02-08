"use strict";


const styles = ["quadvertix", "straight", "arc", "quadline"];


// order-X.js -> indexX.js
// create index with lengths per style
function generateInitialIndex(order) {
  const source = squareOrder[order];
  let output = `{`;
  let lengths = {};
  for (let i=0; i < source.length; i++) {
    for (let j=0; j < styles.length; j++) {
      let valuesArray = source[i].split(" ").map(Number);
      let coordsObject = getCoords(order,valuesArray);
      let svgString = prepareSVG(styles[j],coordsObject,i);
      let svg = new DOMParser().parseFromString(svgString, 'text/html');
      let len = Math.ceil(svg.querySelector(".lines").getTotalLength());
      lengths[styles[j]] = len;
    }
    let txt = `
    "${i + 1}": {
      "numbers": { "string": "${source[i]}" },
      "quadvertix": { "${lengths.quadvertix}": [] },
      "straight": { "${lengths.straight}": [] },
      "arc": { "${lengths.arc}": [] },
      "quadline": { "${lengths.quadline}": [] },
      "duplicates": { }
    }${ (i!==(source.length -1)) ? "," : "" }`;
    // duplicates: { "id": "type", "id": "type", ... }
    output += txt;
  }
  output += `
  }`;
  return JSON.parse(output);
}
let emptyIndex = generateInitialIndex(4);
// console.log(emptyIndex);





// "879": {
//   "nums": "8 2 13 11 15 9 6 4 1 7 12 14 10 16 3 5",
//   "quadvertix": { "2335": [] },
//   "straight": { "3670": [] },
//   "arc": { "2663": [] },
//   "quadline": { "2216": [] },
//   "duplicates": { }
// },
// temp1[0].quadvertix.key()

// add shared lengths into master index
function generateSharedLengths(index) {
  // console.log(`generating lengths ${order}, ${style}`);
  let idx = Object.values(index);
  styles.forEach(style => {
    const lengths = idx.map(i => Object.keys(i[style])[0]);
    let output = {};
    for (let i=0; i < lengths.length; i++) {
      let len = lengths[i];
      let matches = idx.filter(i => Object.keys(i[style])[0] == len);
      let match = matches.map(m => idx.indexOf(m) + 1);
      output[len] = match;
    };
    // add shared lengths into index
    for(let j in index) {
      let x = index[j][style];
      let l = Object.keys(x)[0];
      x[l] = output[l];
    }
  });
  return index;
}
let indexSharedLengths = generateSharedLengths(emptyIndex);
// console.log(indexSharedLengths);








// BROKEN ATM BUT WILL BE OVERWRITTEN WITH SVG2PNG STUFF IN FILTERS

// add deletable info into index
function generateDeletables(index) {
  let tmp = {};
  let tmp2 = {};
  for (let i=0; i< deletables.length; i++) {
    let match = [...deletables[i].matchAll(/(\d+,?\s?\d*,?\s?\d*)\s(.*)\s(\d+)/g)][0];
    let dupls = match[1].split(",");
    let duplicates = dupls.map(d => parseInt(d));
    let kind = match[2];
    let keeper = match[3];
    console.log(keeper, kind, duplicates);
    let tmp3 = duplicates.forEach(d => { tmp2[d] = kind });
    tmp[keeper] = tmp3;
  }
  console.log(tmp);
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // current similarities are based on quadvertix style only 
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  for (let j=0; j<index.length; j++) {
    if(tmp[j]) {
      let xs = tmp[j].list;
      let t = tmp[j].type;
      index[j].duplicates.ids = xs;
      index[j].duplicates.type = t;
    } else {
      index[j].duplicates.ids = "";
      index[j].duplicates.type = "";
    }
  }
  return index;
}
// let final = generateDeletables(indexSharedLengths);
// console.log(final);










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








// indexSharedLengths -> add SVG data

function generateSVGs(index) {
  // console.log(`generating SVGs ${order}, ${style}`);

  for (let idx in index) {

    let numberString = index[idx]["numbers"]["string"];
    let valuesArray = numberString.split(" ").map(Number);
    let order = Math.sqrt(valuesArray.length);

    index[idx]["numbers"]["svg"] = prepareSVG("numbers",getCoords(order,valuesArray),idx);

    styles.forEach(s => {
      let style = index[idx][s];
      let svg = prepareSVG(style,getCoords(order,valuesArray),idx);
      style["svg"] = svg;
      // style["png"] = "pngcode";
    });
  }
  return index;
}
let indexSVGs = generateSVGs(indexSharedLengths);
// console.log(indexSVGs);




function generatePNGs(index) {

  for (let i in index) {
    styles.forEach(s => {
      svgToPng(index[i][s]["svg"]).then((data)=>{
        index[i][s]["png"] = data;
      });
    });
  }
}
// let indexPNGs = generatePNGs(indexSVGs);

// BROKEN
window.onload = () => { console.log(generatePNGs(indexSVGs)) }
// window.onload = () => console.log(indexPNGs);







// see filters.js for svgToPng function
function generateQuadVertixPNGs() {
  index.forEach( i => {
    const svg = svgStringsQuadVertix4[i.id - 1];
    svgToPng(svg).then((data)=>{ 
      console.log(`${i.id}: "${data}",`) 
    });
  });
}
// generateQuadVertixPNGs();





function printAllPNGs(file) {
  // for (let i in file) {
  for (let i=1; i<=880; i++) {
    document.body.insertAdjacentHTML("beforeend", `<img class="png-${i}" src="${file[i]}">`);
  }
}
// printAllPNGs(quadVertix4PNGs);
// printAllPNGs(quadVertix4PNGsROTATED90);
// printAllPNGs(quadVertix4PNGsROTATED180);
// printAllPNGs("quadVertix4PNGsROTATED");



