"use strict";


const sizeInc = 100; // scale (line weight hack) 100 is optimal


function drawSquare(text) {
  // console.log(`inserting square ${counter} to page`);
  // svgGrid.innerHTML += text;  // SLOW AS FUCK AND BLOCKING
  svgGrid.insertAdjacentHTML("beforeend", text);  // FAST AND NON-BLOCKING
}


function drawAllStyles(order, valuesString, id) {
  const valuesArray = valuesString.split(" ").map(Number);
  const coordsObject = getCoords(order,valuesArray);
  magicConstant(order,valuesArray);
  let text = `
    <div>
      ${prepareSVG("numbers",coordsObject,id)}
      ${prepareSVG("straight",coordsObject,id)}
      ${prepareSVG("quadvertix",coordsObject,id)}
      ${prepareSVG("quadline",coordsObject,id)}
      ${prepareSVG("arc",coordsObject,id)}
      <p>Order ${order} <strong>#${id}</strong>: ${valuesString}</p>
    </div>
  `;
  drawSquare(text);
}




function getSize(coordsObject) {
  return Math.sqrt(Object.keys(coordsObject).length);
}



function createNumberSVGs(coordsObject, id) {
  // console.log(`preparing number matrix svg for square ${counter}`);
  let texts;
  let s = getSize(coordsObject);
  let w = s * sizeInc;
  for (let a in coordsObject) {
    texts += `<text x='${coordsObject[a][0] * 100}' y='${coordsObject[a][1] * 100}'>${a.padStart(2, '0')}</text>`;
  }
  // 0 -50 380 370 for order 4
  return `<svg id='numbers-${s}-${id}' class='order-xt pad' viewbox='${0} ${-50} ${w-sizeInc+50+30} ${w-sizeInc+50+20}'>${texts}</svg>`;
}





function createPolyline(coordsObject, id) {
  // console.log(`preparing straight polyline svg for square ${counter}`);
  let s = getSize(coordsObject);
  let w = s * sizeInc;
  let coords = "M";
  for (let i in coordsObject) {
    coords += `${coordsObject[i][0] * sizeInc},${coordsObject[i][1] * sizeInc} `;
  }
  coords += `${coordsObject[1][0] * sizeInc},${coordsObject[1][1] * sizeInc} `;
  // return `<svg id="num-${num+1}" class="order-x pad" viewbox="${-2} ${-2} ${w-sizeInc+4} ${w-sizeInc+4}"><polyline id="square-${counter}" class="lines" points="${coords}"/></svg>`;
  return `<svg id='straight-${s}-${id}' class='order-x pad' viewbox='${-2} ${-2} ${w-sizeInc+4} ${w-sizeInc+4}'><path id='square-${id}' class='lines' d='${coords}'/></svg>`;
}


function createQuadraticCurveVertices(coordsObject, id) {
  // console.log(`preparing quadratic curve on vertices svg for square ${counter}`);
  let s = getSize(coordsObject);
  let w = s * sizeInc;

  let fstx = coordsObject[1][0] * sizeInc;
  let fsty = coordsObject[1][1] * sizeInc;
  let sndx = coordsObject[2][0] * sizeInc;
  let sndy = coordsObject[2][1] * sizeInc;
  let fstmx = (fstx + sndx) / 2;
  let fstmy = (fsty + sndy) / 2;
  
  let coords = `M ${fstmx},${fstmy} `;

  for (let a=1; a <= Object.keys(coordsObject).length; a++) {
    let c1x = coordsObject[a][0] * sizeInc;
    let c1y = coordsObject[a][1] * sizeInc;
    let c2x, c2y, c3x, c3y;

    // next to last
    if (a == (Object.keys(coordsObject).length)) {
      c2x = coordsObject[1][0] * sizeInc;
      c2y = coordsObject[1][1] * sizeInc;
      c3x = coordsObject[2][0] * sizeInc;
      c3y = coordsObject[2][1] * sizeInc;

    // last
    } else if (a == (Object.keys(coordsObject).length - 1)) {
      c2x = coordsObject[a+1][0] * sizeInc;
      c2y = coordsObject[a+1][1] * sizeInc;
      c3x = coordsObject[1][0] * sizeInc;
      c3y = coordsObject[1][1] * sizeInc;

    // all previous
    } else {
      c2x = coordsObject[a+1][0] * sizeInc;
      c2y = coordsObject[a+1][1] * sizeInc;
      c3x = coordsObject[a+2][0] * sizeInc;
      c3y = coordsObject[a+2][1] * sizeInc;
    }

    let m1x = (c1x + c2x) / 2;
    let m1y = (c1y + c2y) / 2;
    let m2x = (c2x + c3x) / 2;
    let m2y = (c2y + c3y) / 2;

    // console.log(c1x, c1y, m1x, m1y, c2x, c2y, m2x, m2y, c3x, c3y);
    coords += `Q ${c2x},${c2y} ${m2x},${m2y} `;
  }

  return `<svg id='quadvertix-${s}-${id}' class='order-x pad' viewbox='${-2} ${-2} ${w-sizeInc+4} ${w-sizeInc+4}'><path id='square-${id}' class='lines' d='${coords}'/></svg>`;
}


function createQuadraticCurveLines(coordsObject, id) {
  // console.log(`preparing quadratic curve on lines svg for square ${counter}`);
  let s = getSize(coordsObject);
  let w = s * sizeInc;
  let len = Object.keys(coordsObject).length;
  let coords = `M ${coordsObject[1][0] * sizeInc},${coordsObject[1][1] * sizeInc} `;
  // for (let a=2; a <= (len - 1); a = a+2) {
  for (let a=2; a <= (len - 1); a = a+2) {
    coords += `Q ${coordsObject[a][0] * sizeInc},${coordsObject[a][1] * sizeInc} ${coordsObject[a+1][0] * sizeInc},${coordsObject[a+1][1] * sizeInc} `;
  }
  coords += `Q ${coordsObject[len][0] * sizeInc},${coordsObject[len][1] * sizeInc} ${coordsObject[1][0] * sizeInc},${coordsObject[1][1] * sizeInc} `;  // loop back

  return `<svg id='quadline-${s}-${id}' class='order-x pad' viewbox='${-2} ${-2} ${w-sizeInc+4} ${w-sizeInc+4}'><path id='square-${id}' class='lines' d='${coords}'/></svg>`;
}


function createArc(coordsObject, id) {
  // console.log(`preparing arc experiment svg for square ${counter}`);
  let s = getSize(coordsObject);
  let w = s * sizeInc;
  let coords = `M${coordsObject[1][0] * sizeInc},${coordsObject[1][1] * sizeInc} `;
  for (let a=2; a <= (Object.keys(coordsObject).length - 1); a = a+2) {
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Arcs
    coords += `A 10,10 0 1 1 ${coordsObject[a][0] * sizeInc},${coordsObject[a][1] * sizeInc} `;
  }
  coords += `A 10,10 0 1 1 ${coordsObject[1][0] * sizeInc},${coordsObject[1][1] * sizeInc} `;
  // drawSquare(`<svg class="order-x" style="fill: ${svgFill}; stroke: ${svgStroke}" viewbox="${-pad} ${-pad} ${w-sizeInc+pad+pad} ${w-sizeInc+pad+pad}"><path id="square-${counter}" class="lines" d="${coords}"/></svg>`);
  return `<svg id='arc-${s}-${id}' class='order-x' viewbox='${-200} ${-170} ${w-sizeInc+380} ${w-sizeInc+380}'><path id='square-${id}' class='lines arc' d='${coords}'/></svg>`;
}
