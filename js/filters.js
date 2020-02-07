"use strict";



function populateOptions(order,style) {
  lenOptions.innerHTML = "";
  if(style !== "numbers") {
    const allLengths = orderIndex[order].map(o => `${Object.keys(o[style])[0]} (${o[style][Object.keys(o[style])[0]].length})`);
    const list = [...new Set(allLengths.sort())];
    lenOptions.disabled = false;
    for (let l in list) {
      const opt = document.createElement("option");
      opt.value = list[l].slice(0,4);
      opt.innerText = list[l];
      lenOptions.appendChild(opt);
    }
  } else {
    lenOptions.disabled = true;
  }
}


function displayDetails(num) {
  const id = `square-${num}`;
  const elem = document.getElementById(id).parentElement;
  const det = document.createElement("p");
  const txt = document.createTextNode(`# ${num}`);
  det.appendChild(txt);
  elem.insertAdjacentElement("afterend", det);
}




// SVG TO PNG
// http://bl.ocks.org/biovisualize/8187844
// https://spin.atomicobject.com/2014/01/21/convert-svg-to-png/
// https://www.npmjs.com/package/svg2png
// https://github.com/exupero/saveSvgAsPng
// http://ramblings.mcpher.com/Home/excelquirks/gassnips/svgtopng
// https://stackoverflow.com/questions/3975499/convert-svg-to-image-jpeg-png-etc-in-the-browser


const svg1 = `<svg id="num-6" class="order-x pad" viewBox="-2 -2 304 304"><path id="square-6" class="lines" d="M 200,300 Q 300,300 150,200 Q 0,100 100,100 Q 200,100 200,50 Q 200,0 100,100 Q 0,200 150,100 Q 300,0 200,100 Q 100,200 150,200 Q 200,200 100,100 Q 0,0 150,100 Q 300,200 200,100 Q 100,0 100,50 Q 100,100 200,100 Q 300,100 150,200 Q 0,300 100,300 Q 200,300 150,300 Q 100,300 200,300 "></path></svg>`;  // same as svg3

const svg2 = `<svg id="num-24" class="order-x pad" viewBox="-2 -2 304 304"><path id="square-24" class="lines" d="M 100,200 Q 200,200 150,250 Q 100,300 200,150 Q 300,0 300,50 Q 300,100 200,50 Q 100,0 150,50 Q 200,100 100,200 Q 0,300 150,300 Q 300,300 200,200 Q 100,100 150,50 Q 200,0 100,50 Q 0,100 0,50 Q 0,0 100,150 Q 200,300 150,250 Q 100,200 200,200 Q 300,200 150,200 Q 0,200 100,200 "></path></svg>`;  // unique

const svg3 = `<svg id="num-999" class="order-x pad" viewBox="-2 -2 304 304"><path id="square-999" class="lines" d="M 200,300 Q 300,300 150,200 Q 0,100 100,100 Q 200,100 200,50 Q 200,0 100,100 Q 0,200 150,100 Q 300,0 200,100 Q 100,200 150,200 Q 200,200 100,100 Q 0,0 150,100 Q 300,200 200,100 Q 100,0 100,50 Q 100,100 200,100 Q 300,100 150,200 Q 0,300 100,300 Q 200,300 150,300 Q 100,300 200,300 "></path></svg>`;  // same as svg1

const svg4 = `<svg id="num-596" class="order-x pad" viewBox="-2 -2 304 304"><path id="square-596" class="lines" d="M 250,250 Q 200,300 150,150 Q 100,0 50,50 Q 0,100 0,50 Q 0,0 50,100 Q 100,200 150,150 Q 200,100 250,200 Q 300,300 150,300 Q 0,300 50,200 Q 100,100 150,150 Q 200,200 250,100 Q 300,0 300,50 Q 300,100 250,50 Q 200,0 150,150 Q 100,300 50,250 Q 0,200 150,200 Q 300,200 250,250 "></path></svg>`;  // same as svg5

const svg5 = `<svg id="num-722" class="order-x pad" viewBox="-2 -2 304 304"><path id="square-722" class="lines" d="M 250,200 Q 200,100 150,150 Q 100,200 50,100 Q 0,0 0,50 Q 0,100 50,50 Q 100,0 150,150 Q 200,300 250,250 Q 300,200 150,200 Q 0,200 50,250 Q 100,300 150,150 Q 200,0 250,50 Q 300,100 300,50 Q 300,0 250,100 Q 200,200 150,150 Q 100,100 50,200 Q 0,300 150,300 Q 300,300 250,200 "></path></svg>`;  // same as svg4


const svg6 = `<svg id="num-722" class="order-x pad" viewBox="-2 -2 304 304" transform="rotate(90)><path id="square-722" class="lines" d="M 250,200 Q 200,100 150,150 Q 100,200 50,100 Q 0,0 0,50 Q 0,100 50,50 Q 100,0 150,150 Q 200,300 250,250 Q 300,200 150,200 Q 0,200 50,250 Q 100,300 150,150 Q 200,0 250,50 Q 300,100 300,50 Q 300,0 250,100 Q 200,200 150,150 Q 100,100 50,200 Q 0,300 150,300 Q 300,300 250,200 "></path></svg>`;  // same as svg4, rotated 90deg










const svgToPng = (svgText) => {
  return new Promise(function(resolve, reject) {
    // needs a namespace
    if (!svgText.match(/xmlns=\"/mi)){
      svgText = svgText.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ');  
    }
    // add colors for stroke and fill
    svgText = svgText.replace('<svg ',`<svg fill="none" stroke="black" `); 
    // add rotation
    svgText = svgText.replace('<svg ',`<svg transform="rotate(90)" `); 
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



// const source = squareOrder[order];
let index = index4;
let style = "quadvertix";

const withDups = index.filter( i => i[style][Object.keys(i[style])[0]].length > 1 );
// console.log(withDups);



function compareSVGs() {

  let confirmedDuplicates = [];

  withDups.forEach( (i) => {
    let dups = i[style][Object.keys(i[style])[0]];
    console.log(`processing items: ${dups}`);

    let head = dups.slice(0,1)[0];
    let tail = dups.slice(1);
    // console.log(head);
    // console.log(tail);
    // console.log(tail[0]);

    console.log(quadVertix4PNGs[head]);
    console.log(quadVertix4PNGs[tail[0]]);
    console.log(quadVertix4PNGs[tail[1]]);
    console.log(quadVertix4PNGs[tail[2]]);
    console.log(quadVertix4PNGs[head] === quadVertix4PNGs[tail[0]]);
    console.log(quadVertix4PNGs[head] === quadVertix4PNGs[tail[1]]);
    console.log(quadVertix4PNGs[head] === quadVertix4PNGs[tail[2]]);

    let boolList = {};
    tail.map(t => 
      boolList[t] = quadVertix4PNGs[head] === quadVertix4PNGs[t]
    );
    console.log(boolList);

    // const png = pngsQuadVertix4[d - 1];
    // const check = (next) => {
    //   pngsQuadVertix4[dups.head - 1] === pngsQuadVertix4[currentValue -1];
    // };
    // dups.reduce(reducer);
    // console.log(dups.reduce(reducer));
    // console.log(dups.map(reducer));


    // const array1 = [1, 2, 3, 4];
    // const reducer = (accumulator, currentValue) => accumulator + currentValue;
    // // 1 + 2 + 3 + 4
    // console.log(array1.reduce(reducer));
    // // expected output: 10
    // // 5 + 1 + 2 + 3 + 4
    // console.log(array1.reduce(reducer, 5));
    // // expected output: 15


  });

}

// window.onload = () => { compareSVGs() }
// compareSVGs();




function printAllPNGs() {
  for (let i in quadVertix4PNGs) {
    document.body.insertAdjacentHTML("beforeend", `<img src="${quadVertix4PNGs[i]}">`);
  }
}
// printAllPNGs();








// const svgToStyledPng = (svgText, margin, fill) => {
//   return new Promise(function(resolve, reject) {
//     // needs a namespace
//     if (!svgText.match(/xmlns=\"/mi)){
//       svgText = svgText.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ');  
//     }
//     // figure out the height and width from svg text
//     const heightMatch = svgText.match(/height=\"(\d+)/m);
//     const height = heightMatch && heightMatch[1] ? parseInt(heightMatch[1],10) : 200;
//     const widthMatch = svgText.match(/width=\"(\d+)/m);
//     const width = widthMatch && widthMatch[1] ? parseInt(widthMatch[1],10) : 200;
//     margin = margin || 0;
    
//     let canvas = document.createElement("canvas");
//     canvas.width = height + margin * 2;
//     canvas.height = width + margin * 2;
//     const ctx = canvas.getContext("2d");
    
//     const svg = new Blob([svgText], {type: "image/svg+xml;charset=utf-8"});
//     const domUrl = window.URL || window.webkitURL || window;
//     const url = domUrl.createObjectURL(svg);
//     const img = document.createElement("img");
    
//     img.onload = function() {
//       ctx.drawImage(img, margin, margin);
//       if (fill) {
//         const styled = document.createElement("canvas");
//         styled.width = canvas.width;
//         styled.height = canvas.height;
//         const styledCtx = styled.getContext("2d");
//         styledCtx.save();
//         styledCtx.fillStyle = fill;   
//         styledCtx.fillRect(0,0,canvas.width,canvas.height);
//         styledCtx.strokeRect(0,0,canvas.width,canvas.height);
//         styledCtx.restore();
//         styledCtx.drawImage(canvas,0,0);
//         canvas = styled;
//       }
//       domUrl.revokeObjectURL(url);
//       // now we can resolve the promise, passing the base64 url
//       resolve(canvas.toDataURL());
//     };
//     img.src = url;  // load the image
//   });
// };