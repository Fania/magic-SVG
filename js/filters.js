"use strict";



function populateOptions(order,style) {
  lenOptions.innerHTML = "";
  if(style !== "numbers") {
    const allLengths = orderIndex[order].map(o => `${Object.keys(o[style])[0]} (${o[style][Object.keys(o[style])[0]].length + 1})`);
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






const svgToTransPng = (svgText, transformation, degree) => {
  // console.log(svgText);
  return new Promise((resolve, reject) => {
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
    if(transformation === "rotate") {
      ctx.translate((svgSize.width)/2,(svgSize.height)/2);
      ctx.rotate((Math.PI/180) * degree);
      ctx.translate(-(svgSize.width)/2,-(svgSize.height)/2);
    }
    if(transformation === "mirrorLR") {
      ctx.translate((svgSize.width)/2,(svgSize.height)/2);
      ctx.scale(-1,1);
      ctx.translate(-(svgSize.width)/2,-(svgSize.height)/2);
    }
    if(transformation === "mirrorUD") {
      ctx.translate((svgSize.width)/2,(svgSize.height)/2);
      ctx.scale(1,-1);
      ctx.translate(-(svgSize.width)/2,-(svgSize.height)/2);
    }
    myImg.onload = function() {
      ctx.drawImage(myImg,0,0);
      domUrl.revokeObjectURL(url);
      resolve(canvas.toDataURL());  // base64 url
    };
    myImg.src = url;  // load the image
  });
};



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
//   document.body.insertAdjacentHTML("beforeend", `<img src="${data}">`);
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

