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







const svgToPng = (svgText) => {
  // console.log(svgText);
  return new Promise(function(resolve, reject) {
    svgText = svgText.replace('<svg ','<svg fill="none" stroke="black" '); 
    // svgText = svgText.replace('<svg ','<svg width="200" height="200" '); 
    // svgText = svgText.replace('<svg ','<svg transform="rotate(180)" '); 
    // console.log(svgText);
    // needs a namespace
    if (!svgText.match(/xmlns=\"/mi)){
      svgText = svgText.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ');  
    }
    // console.log(svgText);

    let canvas = document.createElement("canvas");
    canvas.width = 306; canvas.height = 306;
    // let svgElem = new DOMParser().parseFromString(svgText, 'text/html').body.firstChild;
    // console.log(svgElem);
    // let bbox = svgElem.getBBox();
    // console.log(bbox.width, bbox.height);
    // canvas.width = bbox.width;
    // canvas.height = bbox.height;
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

// svgToPng(index4new["1"]).then((data)=>{ 
//       // console.log(`<img src="${data}">`) 
//       document.body.insertAdjacentHTML("beforeend", `<img src="${data}">`);
//     });
// svgToPng(svgStringsQuadVertix4[837]).then((data)=>{ 
//       // console.log(`<img src="${data}">`) 
//       document.body.insertAdjacentHTML("beforeend", `<img src="${data}">`);
//     });







// const source = squareOrder[order];
let index = index4;
let style = "quadvertix";

const withDups = index.filter( i => i[style][Object.keys(i[style])[0]].length > 1 );
// console.log(withDups);











function compareSVGs() {

  let confirmedDuplicates = [];

  withDups.forEach( (i) => {
    const dups = i[style][Object.keys(i[style])[0]];
    console.log(`processing items: ${dups}`);

    const head = dups.slice(0,1)[0];
    const tail = dups.slice(1);
    // console.log(head);
    // console.log(tail);
    // console.log(tail[0]);

    // console.log(quadVertix4PNGs[833]);
    // console.log(quadVertix4PNGs[836]);
    // console.log(quadVertix4PNGs[833] === quadVertix4PNGs[836]);
    // console.log(quadVertix4PNGs[tail[0]]);
    // console.log(quadVertix4PNGs[tail[1]]);
    // console.log(quadVertix4PNGs[tail[2]]);
    // console.log(quadVertix4PNGs[head] === quadVertix4PNGs[tail[0]]);
    // console.log(quadVertix4PNGs[head] === quadVertix4PNGs[tail[1]]);
    // console.log(quadVertix4PNGs[head] === quadVertix4PNGs[tail[2]]);

    let boolList = {};
    boolList[head] = true;
    tail.map(t => 
      boolList[t] = quadVertix4PNGs[head] === quadVertix4PNGs[t] 
                // ||  quadVertix4PNGs[head] === quadVertix4PNGsROTATED90[t] 
                // ||  quadVertix4PNGs[head] === quadVertix4PNGsROTATED180[t]
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