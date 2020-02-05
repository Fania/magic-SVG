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

const svg1 = `<svg id="num-6" class="order-x pad" viewBox="-2 -2 304 304" xmlns="http://www.w3.org/2000/svg"><path id="square-6" class="lines" d="M 200,300 Q 300,300 150,200 Q 0,100 100,100 Q 200,100 200,50 Q 200,0 100,100 Q 0,200 150,100 Q 300,0 200,100 Q 100,200 150,200 Q 200,200 100,100 Q 0,0 150,100 Q 300,200 200,100 Q 100,0 100,50 Q 100,100 200,100 Q 300,100 150,200 Q 0,300 100,300 Q 200,300 150,300 Q 100,300 200,300 "></path></svg>`;  // same as svg3

const svg2 = `<svg id="num-24" class="order-x pad" viewBox="-2 -2 304 304" xmlns="http://www.w3.org/2000/svg"><path id="square-24" class="lines" d="M 100,200 Q 200,200 150,250 Q 100,300 200,150 Q 300,0 300,50 Q 300,100 200,50 Q 100,0 150,50 Q 200,100 100,200 Q 0,300 150,300 Q 300,300 200,200 Q 100,100 150,50 Q 200,0 100,50 Q 0,100 0,50 Q 0,0 100,150 Q 200,300 150,250 Q 100,200 200,200 Q 300,200 150,200 Q 0,200 100,200 "></path></svg>`;  // unique

const svg3 = `<svg id="num-999" class="order-x pad" viewBox="-2 -2 304 304" xmlns="http://www.w3.org/2000/svg"><path id="square-999" class="lines" d="M 200,300 Q 300,300 150,200 Q 0,100 100,100 Q 200,100 200,50 Q 200,0 100,100 Q 0,200 150,100 Q 300,0 200,100 Q 100,200 150,200 Q 200,200 100,100 Q 0,0 150,100 Q 300,200 200,100 Q 100,0 100,50 Q 100,100 200,100 Q 300,100 150,200 Q 0,300 100,300 Q 200,300 150,300 Q 100,300 200,300 "></path></svg>`;  // same as svg1

const svg4 = `<svg id="num-596" class="order-x pad" viewBox="-2 -2 304 304" xmlns="http://www.w3.org/2000/svg"><path id="square-596" class="lines" d="M 250,250 Q 200,300 150,150 Q 100,0 50,50 Q 0,100 0,50 Q 0,0 50,100 Q 100,200 150,150 Q 200,100 250,200 Q 300,300 150,300 Q 0,300 50,200 Q 100,100 150,150 Q 200,200 250,100 Q 300,0 300,50 Q 300,100 250,50 Q 200,0 150,150 Q 100,300 50,250 Q 0,200 150,200 Q 300,200 250,250 "></path></svg>`;  // same as svg5

const svg5 = `<svg id="num-722" class="order-x pad" viewBox="-2 -2 304 304" xmlns="http://www.w3.org/2000/svg"><path id="square-722" class="lines" d="M 250,200 Q 200,100 150,150 Q 100,200 50,100 Q 0,0 0,50 Q 0,100 50,50 Q 100,0 150,150 Q 200,300 250,250 Q 300,200 150,200 Q 0,200 50,250 Q 100,300 150,150 Q 200,0 250,50 Q 300,100 300,50 Q 300,0 250,100 Q 200,200 150,150 Q 100,100 50,200 Q 0,300 150,300 Q 300,300 250,200 "></path></svg>`;  // same as svg4




// var svgString = new XMLSerializer().serializeToString(document.querySelector('svg'));

// svg2Png(svg4);
// console.log(typeof svg2Png(svg4));
// console.log(svg2Png(svg4));

// function svg2Png(svgString) {

//   // var canvas = document.getElementById("canvas");
//   let canvas = document.createElement("canvas");
//   var ctx = canvas.getContext("2d");
//   var DOMURL = self.URL || self.webkitURL || self;
//   var img = new Image();
//   var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
//   var url = DOMURL.createObjectURL(svg);
//   // let output;
//   // let png;
//   img.onload = function() {
//     ctx.drawImage(img, 0, 0);
//     var png = canvas.toDataURL("image/png");
//     console.log(png);
//     document.querySelector('#png').innerHTML = '<img src="'+png+'"/>';
//     DOMURL.revokeObjectURL(png);
//   };
//   img.src = url;
//   return png;
// }



// function svgToPng(svgString) {
//   let svg64 = btoa(svgString);
//   let b64start = 'data:image/svg+xml;base64,';
//   let image64 = b64start + svg64;
//   let img = document.createElement("img");
//   img.src = image64;
//   return img;
// }

// let one = svgToPng(svg1);
// console.log(one.src);
// let two = svgToPng(svg2);
// console.log(two.src);
// let three = svgToPng(svg3);
// console.log(three.src);
// let four = svgToPng(svg4);
// console.log(four.src);
// let five = svgToPng(svg5);
// console.log(five.src);

// console.log(one.src === two.src);
// console.log(one.src === three.src);
// console.log(four.src === five.src);

// document.getElementById("png").appendChild(four);
// document.getElementById("png").appendChild(five);






// let four = svgToPng(svg4);
// console.log(four);
// let five = svgToPngX(svg5);
// console.log(five.src);



// WORKS

svgToPng(svg4, (imgData) => { console.log( imgData ) });
let test1 = svgToPng(svg4, (imgData) => { console.log( imgData ) });
console.log(test1);
svgToPng(svg5, (imgData) => { console.log( imgData ) });
let test2 = svgToPng(svg5, (imgData) => { console.log( imgData ) });
console.log(test2);


svgToPng(svg4,(imgData)=>{
  const pngImage = document.createElement('img');
  document.body.appendChild(pngImage);
  pngImage.src=imgData;
});


function svgToPng(svg, callback) {
  const url = getSvgUrl(svg);
  svgUrlToPng(url, (imgData) => {
    callback(imgData);
    URL.revokeObjectURL(url);
  });
}
function getSvgUrl(svg) {
  return URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
}
function svgUrlToPng(svgUrl, callback) {
  const svgImage = document.createElement('img');
  document.body.appendChild(svgImage);
  svgImage.onload = function () {
    const canvas = document.createElement('canvas');
    canvas.width = svgImage.clientWidth;
    canvas.height = svgImage.clientHeight;
    const canvasCtx = canvas.getContext('2d');
    canvasCtx.drawImage(svgImage, 0, 0);
    const imgData = canvas.toDataURL('image/png');
    callback(imgData);
    document.body.removeChild(svgImage);
  };
  svgImage.src = svgUrl;
}











// function resolveAfter1Seconds() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('resolved');
//       console.log("test in resolve");
//     }, 1000);
//   });
// }

// async function asyncCall() {
//   console.log('calling');
//   const result = await resolveAfter1Seconds();
//   console.log(result);
//   // expected output: 'resolved'
// }

// asyncCall();
