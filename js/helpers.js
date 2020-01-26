"use strict";





// order-X.js -> indexX.js
// create index with lengths per style
function generateIndex(order,reduced) {
  const styles = ["quadvertix", "straight", "arc", "quadline"];
  const source = eval(`${reduced ? "reduced" : "order"}${order}`);
  // let output = `const index${order}${reduced ? "reduced" : ""} = [`;
  let output = `[`;
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
    let txt2 = `
    {
      "id": ${i + 1},
      "nums": "${source[i]}",
      "lens": {
        "quadvertix": ${lengths.quadvertix},
        "straight": ${lengths.straight},
        "arc": ${lengths.arc},
        "quadline": ${lengths.quadline}
      },
      "lensShared": {
        "quadvertix": [],
        "straight": [],
        "arc": [],
        "quadline": []
      },
      "similarities": {
        "ids": [],
        "type": ""
      }
    }${ (i!==(source.length -1)) ? "," : "" }`;
    output += txt2;
  }
  output += `
  ]`;
  return output;
}
  // ];`;
// console.log(generateIndex(3,false));
// console.log(generateIndex(4,false));
// console.log(generateIndex(5,false));
// console.log(generateIndex(6,false));
// console.log(generateIndex(4,false));


let test = JSON.parse(generateIndex(4,false));
// console.log(test);

let tmp = generateListX(test,"quadvertix");
let tmp1 = generateListX(tmp,"straight");
let tmp2 = generateListX(tmp1,"arc");
let tmp3 = generateListX(tmp2,"quadline");
// console.log(tmp3);



function generateListX(list,style) {
  // console.log(`generating lengths ${order}, ${style}`);
  let index = list;
  let lengths = index.map(i => i.lens[style]);
  let output = {};
  for (let i=0; i < lengths.length; i++) {
    let len = lengths[i];
    let matches = index.filter(i => i.lens[style] == len);
    let out = matches.map(t => index.indexOf(t));
    output[len] = out;
  };
  for(let j=0; j < index.length; j++) {
    index[j].lensShared[style] = output[index[j].lens[style]];
  }
  return index;
}




function deletestuff(list) {

  let tmp = [];

  for (let i=0; i< deletables.length; i++) {

    // console.log(deletables[i]);
    let match = [...deletables[i].matchAll(/(\d+,?\s?\d*,?\s?\d*)\s(.*)\s(\d+)/g)][0];
    // console.log(match);
    let duplicates = match[1].split(",");
    let kind = match[2];
    let keeper = match[3];
    // console.log(duplicates);
    // console.log(type);
    // console.log(keeper);

    tmp[keeper-1] = {
      type: kind,
      list: duplicates
    };

  }
  // console.log(tmp);

  for (let j=0; j<list.length; j++) {
    if(tmp[j]) {
      // console.log(tmp[j]);
      let xs = tmp[j].list;
      let t = tmp[j].type;
      list[j].similarities.ids = xs;
      list[j].similarities.type = t;
    } else {
      list[j].similarities.ids = "";
      list[j].similarities.type = "";
    }
  }




  return list;
}


let final = deletestuff(tmp3);
console.log(final);



var foo = { H̹̙̦̮͉̩̗̗ͧ̇̏̊̾Eͨ͆͒̆ͮ̃͏̷̮̣̫̤̣Cͯ̂͐͏̨̛͔̦̟͈̻O̜͎͍͙͚̬̝̣̽ͮ͐͗̀ͤ̍̀͢M̴̡̲̭͍͇̼̟̯̦̉̒͠Ḛ̛̙̞̪̗ͥͤͩ̾͑̔͐ͅṮ̴̷̷̗̼͍̿̿̓̽͐H̙̙̔̄͜: 42 };


console.log(foo);




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







