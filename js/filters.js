"use strict";



function populateOptions(order,style) {
  // console.log(order, style);
  lenOptions.innerHTML = "";
  if(style !== "numbers") {
    const allLengths = indices[order].map(o => `${Object.keys(o[style])[0]} (${o[style][Object.keys(o[style])[0]].length + 1})`);
    const list = [...new Set(allLengths.sort())];
    lenOptions.disabled = false;
    for (let l in list) {
      // console.log(list[l]);
      // let rgx = /\d+/;
      // const match = list[l].match(/\d+/);
      const opt = document.createElement("option");
      // opt.value = list[l].slice(0,4);
      opt.value = list[l].match(/\d+/);
      opt.innerText = list[l];
      // console.log(list[l]);
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
// https://github.com/HumbleSoftware/js-imagediff
// https://github.com/imgly/rembrandt
// https://rsmbl.github.io/Resemble.js/






const svgToPng = (svgText) => {
  // console.log(svgText);
  return new Promise(function(resolve, reject) {
    svgText = svgText.replace('<svg ',`<svg fill='none' stroke='white' `); 
    // svgText = svgText.replace('<svg ','<svg transform="rotate(180)" '); 
    if (!svgText.match(/xmlns=\"/mi)){  // needs a namespace
      svgText = svgText.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ');  
    }
    let svgdoc = new DOMParser().parseFromString(svgText, 'text/html');
    let svgelem = svgdoc.body.firstChild;
    let svgSize = svgelem.viewBox.baseVal;
    const myImg = document.createElement("img");
    const mySvg = new Blob([svgText], {type: "image/svg+xml;charset=utf-8"});
    const domUrl = window.URL || window.webkitURL || window;
    const url = domUrl.createObjectURL(mySvg);
    let canvas = document.createElement("canvas");
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    const ctx = canvas.getContext("2d");
    myImg.onload = function() {
      ctx.drawImage(myImg,0,0);
      domUrl.revokeObjectURL(url);
      resolve(canvas.toDataURL());  // base64 url
    };
    myImg.src = url;  // load the image
  });
};


// let testsvg = "<svg id='num-880' class='order-x pad' viewbox='-2 -2 304 304'><path id='square-880' class='lines' d='M 300,200 Q 100,300 200,0 Q 0,100 0,0 Q 200,100 100,200 Q 300,300 100,100 Q 300,0 0,300 Q 200,200 200,300 Q 0,200 300,100 Q 100,0 300,200 '/></svg>";
// let testsvg2 = index4[0].quadvertex.svg;

// console.log(testsvg);
// console.log(testsvg2);

// svgToPng(testsvg).then((data)=>{ 
//   document.body.insertAdjacentHTML("beforeend", `<img src="${data}">`);
// });
// svgToPng(testsvg2).then((data)=>{ 
//   document.body.insertAdjacentHTML("beforeend", `<img src="${data}">`);
// });






// const svgToTransPng = (svgText, transformation, degree) => {
//   // console.log(svgText);
//   return new Promise((resolve, reject) => {
//     svgText = svgText.replace('<svg ',`<svg fill='none' stroke='white' `); 
//     // svgText = svgText.replace('<svg ','<svg transform="rotate(180)" '); 
//     if (!svgText.match(/xmlns=\"/mi)){  // needs a namespace
//       svgText = svgText.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ');  
//     }
//     let svgdoc = new DOMParser().parseFromString(svgText, 'text/html');
//     let svgelem = svgdoc.body.firstChild;
//     let svgSize = svgelem.viewBox.baseVal;
//     const myImg = document.createElement("img");
//     const mySvg = new Blob([svgText], {type: "image/svg+xml;charset=utf-8"});
//     const domUrl = window.URL || window.webkitURL || window;
//     const url = domUrl.createObjectURL(mySvg);
//     let canvas = document.createElement("canvas");
//     canvas.width = svgSize.width;
//     canvas.height = svgSize.height;
//     const ctx = canvas.getContext("2d");
//     if(transformation === "rotate") {
//       ctx.translate((canvas.width)/2,(canvas.height)/2);
//       ctx.rotate((Math.PI/180) * degree);
//       ctx.translate(-(canvas.width)/2,-(canvas.height)/2);
//     }
//     if(transformation === "mirrorLR") {
//       ctx.translate((canvas.width)/2,(canvas.height)/2);
//       ctx.scale(-1,1);
//       ctx.translate(-(canvas.width)/2,-(canvas.height)/2);
//     }
//     if(transformation === "mirrorUD") {
//       ctx.translate((canvas.width)/2,(canvas.height)/2);
//       ctx.scale(1,-1);
//       ctx.translate(-(canvas.width)/2,-(canvas.height)/2);
//     }
//     myImg.onload = function() {
//       ctx.drawImage(myImg,0,0);
//       domUrl.revokeObjectURL(url);
//       const data = canvas.toDataURL('image/jpeg', 0.1);
//       const finalImage = document.createElement("img");
//       finalImage.id = svgelem.id;
//       finalImage.src = data;
//       resolve(finalImage);  // base64 url
//     };
//     myImg.src = url;  // load the image
//   });
// };



let testsvg = "<svg id='num-880' class='order-x pad' viewbox='-2 -2 304 304'><path id='square-880' class='lines' d='M 300,200 Q 100,300 200,0 Q 0,100 0,0 Q 200,100 100,200 Q 300,300 100,100 Q 300,0 0,300 Q 200,200 200,300 Q 0,200 300,100 Q 100,0 300,200 '/></svg>";
let testsvg2 = index4[0].quadvertex.svg;

let testsvg3 = "<svg id='quadvertex-4-9' class='order-x pad' viewbox='-2 -2 304 304'><path id='square-9' class='lines' d='M 50,0 Q 100,0 200,50 Q 300,100 250,100 Q 200,100 200,200 Q 200,300 250,250 Q 300,200 200,200 Q 100,200 50,250 Q 0,300 100,250 Q 200,200 250,250 Q 300,300 200,300 Q 100,300 50,250 Q 0,200 0,150 Q 0,100 50,100 Q 100,100 200,50 Q 300,0 250,0 Q 200,0 100,0 Q 0,0 50,0 '/></svg>";

let testsvg4 = "<svg id='quadvertex-4-13' class='order-x pad' viewbox='-2 -2 304 304'><path id='square-13' class='lines' d='M 50,0 Q 0,0 100,50 Q 200,100 250,100 Q 300,100 300,150 Q 300,200 250,250 Q 200,300 100,300 Q 0,300 50,250 Q 100,200 200,250 Q 300,300 250,250 Q 200,200 100,200 Q 0,200 50,250 Q 100,300 100,200 Q 100,100 50,100 Q 0,100 100,50 Q 200,0 250,0 Q 300,0 200,0 Q 100,0 50,0 '/></svg>";

let testsvg5 = "<svg id='quadvertex-4-65' class='order-x pad' viewbox='-2 -2 304 304'><path id='square-65' class='lines' d='M 150,50 Q 100,100 200,50 Q 300,0 150,100 Q 0,200 0,150 Q 0,100 150,200 Q 300,300 200,250 Q 100,200 150,250 Q 200,300 100,300 Q 0,300 100,250 Q 200,200 150,250 Q 100,300 200,200 Q 300,100 300,150 Q 300,200 200,100 Q 100,0 150,50 Q 200,100 100,50 Q 0,0 100,0 Q 200,0 150,50 '/></svg>";

let testsvg6 = "<svg id='quadvertex-4-69' class='order-x pad' viewbox='-2 -2 304 304'><path id='square-69' class='lines' d='M 100,50 Q 200,100 150,50 Q 100,0 200,100 Q 300,200 300,150 Q 300,100 200,200 Q 100,300 150,250 Q 200,200 100,250 Q 0,300 100,300 Q 200,300 150,250 Q 100,200 200,250 Q 300,300 150,200 Q 0,100 0,150 Q 0,200 150,100 Q 300,0 200,50 Q 100,100 150,50 Q 200,0 100,0 Q 0,0 100,50 '/></svg>";

// console.log(testsvg);
// console.log(testsvg2);
// console.log(testsvg3);
// console.log(testsvg4);
// console.log(testsvg5);
// console.log(testsvg6);

// svgToTransPng(testsvg).then((data)=>{ 
//   document.body.appendChild(data);
// });
// svgToTransPng(testsvg, "rotate", 90).then((data)=>{ 
//   document.body.insertAdjacentHTML("beforeend", `<img src="${data}">`);
// });
// svgToTransPng(testsvg, "rotate", 180).then((data)=>{ 
//   document.body.insertAdjacentHTML("beforeend", `<img src="${data}">`);
// });
// svgToTransPng(testsvg, "rotate", -90).then((data)=>{ 
//   document.body.insertAdjacentHTML("beforeend", `<img src="${data}">`);
// });
// svgToTransPng(testsvg, "mirrorLR").then((data)=>{ 
//   document.body.insertAdjacentHTML("beforeend", `<img src="${data}">`);
// });
// svgToTransPng(testsvg, "mirrorUD").then((data)=>{ 
//   document.body.insertAdjacentHTML("beforeend", `<img src="${data}">`);
// });
// svgToTransPng(testsvg2).then((data)=>{ 
//   document.body.insertAdjacentHTML("beforeend", `<img src="${data}">`);
// });
// svgToTransPng(testsvg3).then((data)=>{ 
//   document.body.insertAdjacentHTML("beforeend", `<img src="${data}">`);
// });
// svgToTransPng(testsvg4).then((data)=>{ 
//   document.body.insertAdjacentHTML("beforeend", `<img src="${data}">`);
// });
// svgToTransPng(testsvg4, "mirrorLR").then((data)=>{ 
//   document.body.insertAdjacentHTML("beforeend", `<img src="${data}">`);
// });
// svgToTransPng(testsvg5).then((data)=>{ 
//   document.body.insertAdjacentHTML("beforeend", `<img src="${data}">`);
// });
// svgToTransPng(testsvg6).then((data)=>{ 
//   document.body.insertAdjacentHTML("beforeend", `<img src="${data}">`);
// });


// const b64toBlob = (base64, type = 'application/octet-stream') => 
//   fetch(`data:${type};base64,${base64}`).then(res => res.blob())



// const transformPng = (png, transformation) => {
//   return new Promise((resolve, reject) => {
//     let exifOrientation;
//     switch (transformation) {
//       case "rotate90":
//         exifOrientation = 8; break;
//       case "rotate180":
//         exifOrientation = 3; break;
//       case "rotate-90":
//         exifOrientation = 6; break;
//       case "mirrorLR":
//         exifOrientation = 2; break;
//       case "mirrorUD":
//         exifOrientation = 4; break;
//       case "mirrorLRrotate90":
//         exifOrientation = 7; break;
//       case "mirrorLRrotate-90":
//         exifOrientation = 5; break;
//       default:
//         exifOrientation = 1; break;
//     }

//     fetch(png).then(res => res.blob()).then(data => {
//       loadImage(
//         data,
//         img => { resolve(img) },
//         { maxWidth: 600, orientation: exifOrientation }
//       );
//     });
//   });
// };





// https://sirv-cdn.sirv.com/website/exif-orientation-values.jpg
// 1 = 0 degrees – the correct orientation, no adjustment is required.
// 2 = 0 degrees, mirrored – image has been flipped back-to-front.
// 3 = 180 degrees – image is upside down.
// 4 = 180 degrees, mirrored – image is upside down and flipped back-to-front.
// 5 = 90 degrees – image is on its side.
// 6 = 90 degrees, mirrored – image is on its side and flipped back-to-front.
// 7 = 270 degrees – image is on its far side.
// 8 = 270 degrees, mirrored – image is on its far side and flipped back-to-front.



// let testpng = jpegs4[8].quadvertex;
// // console.log(testpng);

// transformPng(testpng).then(data => document.body.appendChild(data));
// transformPng(testpng, "rotate90").then(data => document.body.appendChild(data));
// transformPng(testpng, "mirrorLR").then(data => document.body.appendChild(data));
// transformPng(testpng).then(data => document.body.appendChild(data));
// transformPng(testpng, "rotate", 90).then((data)=>{ 
//   document.body.insertAdjacentHTML("beforeend", `<img src="${data}">`);
// });
// transformPng(testpng, "rotate", 180).then((data)=>{ 
//   document.body.insertAdjacentHTML("beforeend", `<img src="${data}">`);
// });
// transformPng(testpng, "rotate", -90).then((data)=>{ 
//   document.body.insertAdjacentHTML("beforeend", `<img src="${data}">`);
// });
// transformPng(testpng, "mirrorLR").then((data)=>{ 
//   document.body.insertAdjacentHTML("beforeend", `<img src="${data}">`);
// });




const classes = {
  "Hera":    ["A","B","C","D",
              "E","F","G","H",
              "C","D","A","B",
              "G","H","E","F"],
  "Asteria": ["A","B","C","D",
              "B","A","D","C",
              "E","F","G","H",
              "F","E","H","G"],
  "Niobe":   ["A","B","C","D",
              "E","F","G","H",
              "H","G","F","E",
              "D","C","B","A"],
  "Elara":   ["A","B","C","D",
              "A","B","C","D",
              "E","F","G","H",
              "E","F","G","H"],
  "Hestia":  ["A","B","C","D",
              "E","F","G","H",
              "A","B","C","D",
              "E","F","G","H"],
  "Demeter": ["A","B","C","D",
              "E","F","G","H",
              "E","F","G","H",
              "A","B","C","D"],
  "Arges":   ["A","B","C","D",
              "E","B","C","H",
              "E","F","G","H",
              "A","F","G","D"],
  "Moros":   ["A","B","C","D"],
  "Thaumas": ["A","B","C","D"],
  "Nemesis": ["A","B","C","D"],
  "Cottus":  ["A","B","C","D"],
  "Eris":    ["A","B","C","D"]
};

// function classify(index) {
//   switch(type) {
//     // 8 D4 transformations (using Gaspalou naming)
//     case "I":  // A1 A2 A3 A4 B1 B2 B3 B4 C1 C2 C3 C4 D1 D2 D3 D4
//       // return m;
//       return [m[ 0], m[ 1], m[ 2], m[ 3],
//               m[ 4], m[ 5], m[ 6], m[ 7],
//               m[ 8], m[ 9], m[10], m[11],
//               m[12], m[13], m[14], m[15]];


