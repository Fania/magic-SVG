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


const svg1 = `<svg id="num-6" class="order-x pad" viewBox="-2 -2 304 304" xmlns="http://www.w3.org/2000/svg"><path id="square-6" class="lines" d="M 200,300 Q 300,300 150,200 Q 0,100 100,100 Q 200,100 200,50 Q 200,0 100,100 Q 0,200 150,100 Q 300,0 200,100 Q 100,200 150,200 Q 200,200 100,100 Q 0,0 150,100 Q 300,200 200,100 Q 100,0 100,50 Q 100,100 200,100 Q 300,100 150,200 Q 0,300 100,300 Q 200,300 150,300 Q 100,300 200,300 "></path></svg>`;  // same as svg3

const svg2 = `<svg id="num-24" class="order-x pad" viewBox="-2 -2 304 304" xmlns="http://www.w3.org/2000/svg"><path id="square-24" class="lines" d="M 100,200 Q 200,200 150,250 Q 100,300 200,150 Q 300,0 300,50 Q 300,100 200,50 Q 100,0 150,50 Q 200,100 100,200 Q 0,300 150,300 Q 300,300 200,200 Q 100,100 150,50 Q 200,0 100,50 Q 0,100 0,50 Q 0,0 100,150 Q 200,300 150,250 Q 100,200 200,200 Q 300,200 150,200 Q 0,200 100,200 "></path></svg>`;  // unique

const svg3 = `<svg id="num-999" class="order-x pad" viewBox="-2 -2 304 304" xmlns="http://www.w3.org/2000/svg"><path id="square-999" class="lines" d="M 200,300 Q 300,300 150,200 Q 0,100 100,100 Q 200,100 200,50 Q 200,0 100,100 Q 0,200 150,100 Q 300,0 200,100 Q 100,200 150,200 Q 200,200 100,100 Q 0,0 150,100 Q 300,200 200,100 Q 100,0 100,50 Q 100,100 200,100 Q 300,100 150,200 Q 0,300 100,300 Q 200,300 150,300 Q 100,300 200,300 "></path></svg>`;  // same as svg1

const svg4 = `<svg id="num-596" class="order-x pad" viewBox="-2 -2 304 304" xmlns="http://www.w3.org/2000/svg"><path id="square-596" class="lines" d="M 250,250 Q 200,300 150,150 Q 100,0 50,50 Q 0,100 0,50 Q 0,0 50,100 Q 100,200 150,150 Q 200,100 250,200 Q 300,300 150,300 Q 0,300 50,200 Q 100,100 150,150 Q 200,200 250,100 Q 300,0 300,50 Q 300,100 250,50 Q 200,0 150,150 Q 100,300 50,250 Q 0,200 150,200 Q 300,200 250,250 "></path></svg>`;  // same as svg5

const svg5 = `<svg id="num-722" class="order-x pad" viewBox="-2 -2 304 304" xmlns="http://www.w3.org/2000/svg"><path id="square-722" class="lines" d="M 250,200 Q 200,100 150,150 Q 100,200 50,100 Q 0,0 0,50 Q 0,100 50,50 Q 100,0 150,150 Q 200,300 250,250 Q 300,200 150,200 Q 0,200 50,250 Q 100,300 150,150 Q 200,0 250,50 Q 300,100 300,50 Q 300,0 250,100 Q 200,200 150,150 Q 100,100 50,200 Q 0,300 150,300 Q 300,300 250,200 "></path></svg>`;  // same as svg4




var svgToPng = function (svgText, margin, fill) {
  // convert an svg text to png using the browser
  return new Promise(function(resolve, reject) {
    try {
      // can use the domUrl function from the browser
      var domUrl = window.URL || window.webkitURL || window;
      if (!domUrl) {
        throw new Error("(browser doesnt support this)")
      }
      
      // figure out the height and width from svg text
      var match = svgText.match(/height=\"(\d+)/m);
      var height = match && match[1] ? parseInt(match[1],10) : 200;
      var match = svgText.match(/width=\"(\d+)/m);
      var width = match && match[1] ? parseInt(match[1],10) : 200;
      margin = margin || 0;
      
      // it needs a namespace
      if (!svgText.match(/xmlns=\"/mi)){
        svgText = svgText.replace ('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ') ;  
      }
      
      // create a canvas element to pass through
      var canvas = document.createElement("canvas");
      canvas.width = height+margin*2;
      canvas.height = width+margin*2;
      var ctx = canvas.getContext("2d");
      
      
      // make a blob from the svg
      var svg = new Blob([svgText], {
        type: "image/svg+xml;charset=utf-8"
      });
      
      // create a dom object for that image
      var url = domUrl.createObjectURL(svg);
      
      // create a new image to hold it the converted type
      var img = new Image;
      
      // when the image is loaded we can get it as base64 url
      img.onload = function() {
        // draw it to the canvas
        ctx.drawImage(this, margin, margin);
        
        // if it needs some styling, we need a new canvas
        if (fill) {
          var styled = document.createElement("canvas");
          styled.width = canvas.width;
          styled.height = canvas.height;
          var styledCtx = styled.getContext("2d");
          styledCtx.save();
          styledCtx.fillStyle = fill;   
          styledCtx.fillRect(0,0,canvas.width,canvas.height);
          styledCtx.strokeRect(0,0,canvas.width,canvas.height);
          styledCtx.restore();
          styledCtx.drawImage (canvas, 0,0);
          canvas = styled;
        }
        // we don't need the original any more
        domUrl.revokeObjectURL(url);
        // now we can resolve the promise, passing the base64 url
        resolve(canvas.toDataURL());
      };
      
      // load the image
      img.src = url;
      
    } catch (err) {
      reject('failed to convert svg to png ' + err);
    }
  });
};


let png4;
let png5;

svgToPng (svg4 , 0 , "white") 
.then (function(data) {
  console.log("final data:");
  console.log(data);
  pngs.innerHTML += `<img src="${data}">`;
  png4 = data;
}).catch (function (err) {});


svgToPng (svg5 , 0 , "white") 
.then (function(data) {
  console.log("final data:");
  console.log(data);
  pngs.innerHTML += `<img src="${data}">`;
  png5 = data;
}).catch (function (err) {});

console.log(png4);
console.log(png5);








// let canvas = document.createElement("canvas");
// let ctx = canvas.getContext("2d");

// function drawInlineSVG(rawSVG, callback) {
//   let svg = new Blob([rawSVG], {type:"image/svg+xml;charset=utf-8"}),
//     domURL = self.URL || self.webkitURL || self,
//     url = domURL.createObjectURL(svg),
//     img = new Image;
//   img.onload = function () {
//     ctx.drawImage(this, 0, 0);     
//     domURL.revokeObjectURL(url);
//     callback(this);
//   };
//   img.src = url;
// }

// drawInlineSVG(svg4, function() {
//   let png = canvas.toDataURL();
//   console.log(png);
//   pngs.innerHTML += `<img src="${png}">`;
// });

// drawInlineSVG(svg5, function() {
//   let png = canvas.toDataURL();
//   console.log(png);
//   pngs.innerHTML += `<img src="${png}">`;
// });

// console.log(png4);
// console.log(png5);
// console.log(png4 === png5);




// saveSvgAsPng(document.getElementById("png"), "diagram.png");

// let svgElem = document.createElement("svg");
// svgElem.innerHTML = svg5;

// saveSvgAsPng(svgElem, "diagram.png");


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


// function createImg(svgString, callback) {
//   console.log("inside createImg");
//   let canvas = document.createElement("canvas");
//   let ctx = canvas.getContext("2d");
//   let DOMURL = self.URL || self.webkitURL || self;
//   let img = document.createElement("img");
//   let svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
//   let url = DOMURL.createObjectURL(svg);
//   img.onload = function() {
//     console.log("image loading");
//     ctx.drawImage(img, 0, 0);
//     let pngURL = canvas.toDataURL("image/png");
//     pngs.innerHTML += `<img src="${pngURL}"/>`;
//     DOMURL.revokeObjectURL(pngURL);
//     callback();
//   };
//   img.src = url;
// }

// function nothing() { console.log("done"); compare(); }

// function compare() {
//   console.log("comparing");
//   let tmp = document.getElementById("pngs");
//   console.log(tmp);
//   console.dir(tmp);
//   console.log(tmp.children.length);
//   console.log(tmp.children);
//   console.log(tmp.children["0"]);
//   console.log(tmp.children["1"]);
//   // console.log(pngs.children[0].src === pngs.children[1].src);
//   // return pngs.children[0].src === pngs.children[1].src;
// }
// // console.log(svg2png(svg4,svg5));

// function svg2png(svgString1, svgString2) {
//   console.log("starting conversion");
//   pngs.innerHTML = "";
//   createImg(svgString1, createImg(svgString2, nothing));
//   // compare();
// }


// svg2png(svg4, svg5);

// console.log(pngs);
// console.log(pngs.children);
// console.log(pngs.children[0]);
// console.log(test.children.0);

// let one = svg2png(svg1);
// console.log(one);
// let two = svg2png(svg2);
// console.log(two);
// let three = svg2png(svg3);
// console.log(three);
// let four = svg2png(svg4);
// console.log(four);
// let five = svg2png(svg5);
// console.log(five);

// console.log(one.src === two.src);
// console.log(one.src === three.src);
// console.log(four.src === five.src);
// console.log(four.src);
// document.body.appendChild(four);
// console.log(four.outerHTML);


// function svg2Canvas(img, ctx, canvas) {
//   ctx.drawImage(img, 0, 0);
//   // console.log(canvas.toDataURL('image/png'));
//   return canvas.toDataURL('image/png');
// }

// function doHomework(subject, callback) {
//   console.log(`Starting my ${subject} homework.`);
//   callback();
// }
// function alertFinished(){
//   console.log('Finished my homework');
// }
// doHomework('math', alertFinished);


// image.onload = function() {
//   var canvas = document.createElement('canvas');
//   canvas.width = image.width;
//   canvas.height = image.height;
//   var context = canvas.getContext('2d');
//   context.drawImage(image, 0, 0);
 
//   var a = document.createElement('a');
//   a.download = "image.png";
//   a.href = canvas.toDataURL('image/png');
//   document.body.appendChild(a);
//   a.click();
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

// svgToPng(svg4, (imgData) => { 
//   console.log( imgData ) ;
//   return imgData;
// });
// let test1a = svgToPng(svg4, (imgData) => { 
//   console.log( imgData ) ;
//   return imgData;
// });
// console.log(test1a);
// let test1 = svgToPng(svg4, (imgData) => { console.log( imgData ) });
// console.log(test1);
// svgToPng(svg5, (imgData) => { console.log( imgData ) });
// let test2 = svgToPng(svg5, (imgData) => { console.log( imgData ) });
// console.log(test2);


// svgToPng(svg4,(imgData)=>{
//   const pngImage = document.createElement('img');
//   document.body.appendChild(pngImage);
//   pngImage.src=imgData;
// });


// function svgToPng(svg, callback) {
//   const url = getSvgUrl(svg);
//   svgUrlToPng(url, (imgData) => {
//     callback(imgData);
//     URL.revokeObjectURL(url);
//   });
// }
// function getSvgUrl(svg) {
//   return URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
// }
// function svgUrlToPng(svgUrl, callback) {
//   const svgImage = document.createElement('img');
//   document.body.appendChild(svgImage);
//   svgImage.onload = function () {
//     const canvas = document.createElement('canvas');
//     canvas.width = svgImage.clientWidth;
//     canvas.height = svgImage.clientHeight;
//     const canvasCtx = canvas.getContext('2d');
//     canvasCtx.drawImage(svgImage, 0, 0);
//     const imgData = canvas.toDataURL('image/png');
//     callback(imgData);
//     document.body.removeChild(svgImage);
//   };
//   svgImage.src = svgUrl;
// }











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
