"use strict";


const styles = ["quadvertix", "straight", "arc", "quadline"];


// order-X.js -> indexX.js
// create index with lengths per style
function generateInitialIndex(order) {
  const source = squareOrder[order];
  let output = `[`;
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
    {
      "id": ${i + 1},
      "nums": "${source[i]}",
      "quadvertix": { "${lengths.quadvertix}": [] },
      "straight": { "${lengths.straight}": [] },
      "arc": { "${lengths.arc}": [] },
      "quadline": { "${lengths.quadline}": [] },
      "similarities": {
        "ids": [],
        "type": ""
      }
    }${ (i!==(source.length -1)) ? "," : "" }`;

    output += txt;
  }
  output += `
  ]`;
  return JSON.parse(output);
}
// let emptyIndex = generateInitialIndex(6);
// console.log(emptyIndex);




  // {
  //   "id": 879,
  //   "nums": "8 2 13 11 15 9 6 4 1 7 12 14 10 16 3 5",
  //   "quadvertix": { "2335": [] },
  //   "straight": { "3670": [] },
  //   "arc": { "2663": [] },
  //   "quadline": { "2216": [] },
  //   "similarities": {
  //     "ids": [],
  //     "type": ""
  //   }
  // },
  // temp1[0].quadvertix.key()

// add shared lengths into master index
function generateSharedLengths(index) {
  // console.log(`generating lengths ${order}, ${style}`);
  styles.forEach(style => {
    const lengths = index.map(i => Object.keys(i[style])[0]);
    let output = {};
    for (let i=0; i < lengths.length; i++) {
      let len = lengths[i];
      let matches = index.filter(i => Object.keys(i[style])[0] == len);
      let match = matches.map(m => index.indexOf(m) + 1);
      output[len] = match;
    };
    // add shared lengths into index
    for(let j=0; j < index.length; j++) {
      let x = index[j][style];
      let l = Object.keys(x)[0];
      x[l] = output[l];
    }
  });
  return index;
}
// let indexSharedLengths = generateSharedLengths(emptyIndex);
// console.log(indexSharedLengths);




// add deletable info into index
function generateDeletables(index) {
  let tmp = [];
  for (let i=0; i< deletables.length; i++) {
    let match = [...deletables[i].matchAll(/(\d+,?\s?\d*,?\s?\d*)\s(.*)\s(\d+)/g)][0];
    let dupls = match[1].split(",");
    let duplicates = dupls.map(d => parseInt(d));
    let kind = match[2];
    let keeper = match[3];
    tmp[keeper-1] = {
      "type": kind,
      "list": duplicates
    };
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // current similarities are based on quadvertix style only 
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  for (let j=0; j<index.length; j++) {
    if(tmp[j]) {
      let xs = tmp[j].list;
      let t = tmp[j].type;
      index[j].similarities.ids = xs;
      index[j].similarities.type = t;
    } else {
      index[j].similarities.ids = "";
      index[j].similarities.type = "";
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













const svgToPng = (svgText) => {
  return new Promise(function(resolve, reject) {
    // needs a namespace
    if (!svgText.match(/xmlns=\"/mi)){
      svgText = svgText.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ');  
    }
    // add colors for stroke and fill
    svgText = svgText.replace('<svg ','<svg fill="none" stroke="black" '); 
    // add rotation
    svgText = svgText.replace('<svg ','<svg transform="rotate(180)" '); 
    // initialise canvas
    let canvas = document.createElement("canvas");
    canvas.width = 200; canvas.height = 200;
    const ctx = canvas.getContext("2d");
    const svg = new Blob([svgText], {type: "image/svg+xml;charset=utf-8"});
    const domUrl = window.URL || window.webkitURL || window;
    const url = domUrl.createObjectURL(svg);
    const img = document.createElement("img");
    img.onload = function() {
      ctx.drawImage(img,0,0);
      domUrl.revokeObjectURL(url);
      resolve(canvas.toDataURL());  // base64 url
    };
    img.src = url;  // load the image
  });
};




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
  for (let i in file) {
    document.body.insertAdjacentHTML("beforeend", `<img class="${i}" src="${file[i]}">`);
  }
}
printAllPNGs(quadVertix4PNGs);
printAllPNGs(quadVertix4PNGsROTATED90);
printAllPNGs(quadVertix4PNGsROTATED180);
// printAllPNGs("quadVertix4PNGsROTATED");



