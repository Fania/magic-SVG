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
// svgToPng(testsvg).then((data)=>{ 
//   document.body.insertAdjacentHTML("beforeend", `<img src="${data}">`);
// });








// const source = squareOrder[order];
let index = index4new;
let style = "quadvertix";

const withDups = index.filter( i => 
  i[style][Object.keys(i[style])[0]].length > 1 );  // 845
// console.log(withDups);



const getPNGData = (n) => {
  return index4new.filter(i => i.id === n)[0]["quadvertix"]["png"]
};





// https://github.com/HumbleSoftware/js-imagediff


function compareSVGs() {

  let confirmedDuplicates = [];

  withDups.forEach( (wd) => {
    const dups = wd[style][Object.keys(wd[style])[0]];
    console.log(`processing items: ${dups}`);

    const head = dups.slice(0,1)[0];
    const tail = dups.slice(1);
    // console.log(head);
    // console.log(tail);

    let boolList = {};
    boolList[head] = true;

    let ImageA = new Image();
    ImageA.src = getPNGData(head);
    
    // let isEqual = imagediff.equal(ImageA, ImageB , 0);
    // console.log("isEqual", isEqual);


    tail.map(t => {
      let ImageB = new Image();
      ImageB.src = getPNGData(t);
      let loadedImages = 0;
      let onImagesLoaded =  function () {
        loadedImages++;
        if(loadedImages != 2){ return }
        // console.log( imagediff.equal(ImageA, ImageB, 0) );
        boolList[t] = imagediff.equal(ImageA, ImageB, 0);
      };
      // Set the onLoad callback of the images
      ImageA.onload = onImagesLoaded;
      ImageB.onload = onImagesLoaded;
      // boolList[t] = getPNGData(head) === getPNGData(t);
    });
    
    console.log(boolList);
    confirmedDuplicates.push(boolList);

    

    // console.log(getPNGData(head));
    // console.log(getPNGData(tail[0]));

    // let boolList = {};
    // boolList[head] = true;
    // tail.map(t =>
    //   boolList[t] = getPNGData(head) === getPNGData(t) 
    //             // ||  quadVertix4PNGs[head] === quadVertix4PNGsROTATED90[t] 
    //             // ||  quadVertix4PNGs[head] === quadVertix4PNGsROTATED180[t]
    // );
    
    // console.log(boolList);




  });

  return confirmedDuplicates;
}

// window.onload = () => { compareSVGs() }
// compareSVGs();
console.log( compareSVGs() );

