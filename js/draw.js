"use strict";


const sizeInc = 100; // scale (line weight hack) 100 is optimal


function drawSquare(text) {
  // console.log(`inserting square ${counter} to page`);
  // svgGrid.innerHTML += text;  // SLOW AS FUCK AND BLOCKING
  svgGrid.insertAdjacentHTML("beforeend", text);  // FAST AND NON-BLOCKING
}


function drawAllStyles(order, valuesArray, id) {
  // const valuesArray = valuesString.split(" ").map(Number);
  const coordsObject = getCoords(order,valuesArray);
  magicConstant(order,valuesArray);
  let str = valuesArray.join(" ");
  let text = `
    <div class="allStyles">
      ${prepareSVG(order,"numbers",coordsObject,id)}
      ${prepareSVG(order,"straight",coordsObject,id)}
      ${prepareSVG(order,"quadvertex",coordsObject,id)}
      ${prepareSVG(order,"quadline",coordsObject,id)}
      ${prepareSVG(order,"arc",coordsObject,id)}
      ${prepareSVG(order,"altarc",coordsObject,id)}
      <p>Order ${order} <strong>#${id}</strong>: ${str}</p>
    </div>
  `;
  drawSquare(text);
}


function drawOurOwn(order, valuesArray, id) {
  const coordsObject = getCoords(order,valuesArray);
  magicConstant(order,valuesArray);
  let text = `
    <div>
      ${prepareSVG(order,"numbers",coordsObject,id)}
      ${prepareSVG(order,"quadvertex",coordsObject,id)}
    </div>
  `;
  drawSquare(text);
}


function drawTransforms(order, valuesArray, transType) {
  const coordsObject = getCoords(order,valuesArray);
  magicConstant(order,valuesArray);
  let text = `
    <div class="transDiv">
      <div>
        <div>${transType}</div>
        ${prepareSVG(order,"numbers",coordsObject, 1)}
        ${prepareSVG(order,"quadvertex",coordsObject, 1)}
      </div>
      <p>${valuesArray.join(" ")}</p>
    </div>
  `;
  drawSquare(text);
}


function drawAgrippa(order, valuesArray, name) {
  const coordsObject = getCoords(order,valuesArray);
  let str = valuesArray.join(" ");
  let text = `
    <div class="agrippa">
      <p>${name}</p>
      <div>
        ${prepareSVG(order,"numbers",coordsObject,0)}
        ${prepareSVG(order,"straight",coordsObject,0)}
        ${prepareSVG(order,"quadvertex",coordsObject,0)}
        ${prepareSVG(order,"quadline",coordsObject,0)}
        ${prepareSVG(order,"arc",coordsObject,0)}
        ${prepareSVG(order,"altarc",coordsObject,0)}
      </div>
    </div>
  `;
  drawSquare(text);
}





function getSize(coordsObject) {
  return Math.sqrt(Object.keys(coordsObject).length);
}





// order, valuesArray
function getCoords(order, valuesArray) {
  // console.log(`creating coordinate system for square ${c}`);
  const coordsObject = {};
  let offset = 0;
  for (let row=0; row < order; row++) {
    for (let col=0; col < order; col++) {
      coordsObject[valuesArray[col+offset]] = [col,row];  // x,y
    }
    offset += order;  // increase offset by one row every 4(order) columns
  }
  return coordsObject;
}



// style, coordsObject, id
function prepareSVG(order, style, coordsObject, id) {
  // console.log(`preparing ${style} SVG for square ${c}`);
  switch(style) {
    case "numbers":
      return createNumberSVGs(order, coordsObject, id);
    case "straight":
      return createPolyline(order, coordsObject, id);
    case "quadvertex":
      return createQuadraticCurveVertices(order, coordsObject, id);
    case "quadline":
      return createQuadraticCurveLines(order, coordsObject, id);
    case "arc":
      return createArc(order, coordsObject, id);
    case "altarc":
      return createArcAlt(order, coordsObject, id);
    default:
      return createQuadraticCurveVertices(order, coordsObject, id);
  }
}




function createNumberSVGs(order, coordsObject, id) {
  // console.log(`preparing number matrix svg for square ${counter}`);
  let texts;
  let w = parseInt(order) * sizeInc;
  for (let a in coordsObject) {
    texts += `<text x='${coordsObject[a][0] * 100}' y='${coordsObject[a][1] * 100}'>${a.padStart(2, '0')}</text>`;
  }
  // 0 -50 380 370 for order 4
  return `<svg id='numbers-${order}-${id}' class='order-xt pad' viewbox='${0} ${-50} ${w-sizeInc+50+30} ${w-sizeInc+50+20}'>${texts}</svg>`;
}


function createPolyline(order,coordsObject, id) {
  // console.log(`preparing straight polyline svg for square ${counter}`);
  let w = parseInt(order) * sizeInc;
  let coords = "M";
  for (let i in coordsObject) {
    coords += `${coordsObject[i][0] * sizeInc},${coordsObject[i][1] * sizeInc} `;
  }
  coords += `${coordsObject[1][0] * sizeInc},${coordsObject[1][1] * sizeInc} `;
  // return `<svg id="num-${num+1}" class="order-x pad" viewbox="${-2} ${-2} ${w-sizeInc+4} ${w-sizeInc+4}"><polyline id="square-${counter}" class="lines" points="${coords}"/></svg>`;
  return `<svg id='straight-${order}-${id}' class='order-x pad' viewbox='${-2} ${-2} ${w-sizeInc+4} ${w-sizeInc+4}'><path class='lines' d='${coords}'/></svg>`;
}


function createQuadraticCurveVertices(order, coordsObject, id) {
  // console.log(`preparing quadratic curve on vertices svg for square ${counter}`);
  let w = parseInt(order) * sizeInc;
  // console.log(order, parseInt(order), w);

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

  return `<svg id='quadvertex-${order}-${id}' class='order-x pad' viewbox='${-2} ${-2} ${w-sizeInc+4} ${w-sizeInc+4}'><path class='lines' d='${coords}'/></svg>`;
}


function createQuadraticCurveLines(order,coordsObject, id) {
  // console.log(`preparing quadratic curve on lines svg for square ${counter}`);
  let w = parseInt(order) * sizeInc;
  let len = Object.keys(coordsObject).length;
  let coords = `M ${coordsObject[1][0] * sizeInc},${coordsObject[1][1] * sizeInc} `;
  // for (let a=2; a <= (len - 1); a = a+2) {
  for (let a=2; a <= (len - 1); a = a+2) {
    coords += `Q ${coordsObject[a][0] * sizeInc},${coordsObject[a][1] * sizeInc} ${coordsObject[a+1][0] * sizeInc},${coordsObject[a+1][1] * sizeInc} `;
  }
  coords += `Q ${coordsObject[len][0] * sizeInc},${coordsObject[len][1] * sizeInc} ${coordsObject[1][0] * sizeInc},${coordsObject[1][1] * sizeInc} `;  // loop back

  return `<svg id='quadline-${order}-${id}' class='order-x pad' viewbox='${-2} ${-2} ${w-sizeInc+4} ${w-sizeInc+4}'><path class='lines' d='${coords}'/></svg>`;
}


function createArc(order,coordsObject, id) {
  // console.log(`preparing arc experiment svg for square ${counter}`);
  let w = parseInt(order) * sizeInc;
  let coords = `M${coordsObject[1][0] * sizeInc},${coordsObject[1][1] * sizeInc} `;
  for (let a=1; a <= (Object.keys(coordsObject).length); a++) {
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Arcs
    coords += `A 50,50 0 1 1 ${coordsObject[a][0] * sizeInc},${coordsObject[a][1] * sizeInc} `;
  }
  coords += `A 50,50 0 1 1 ${coordsObject[1][0] * sizeInc},${coordsObject[1][1] * sizeInc} `;
  return `<svg id='arc-${order}-${id}' class='order-x' viewbox='${-200} ${-170} ${w-sizeInc+380} ${w-sizeInc+380}'><path class='lines arc' d='${coords}'/></svg>`;
}


function createArcAlt(order,coordsObject, id) {
  // console.log(`preparing arc experiment svg for square ${counter}`);
  let w = parseInt(order) * sizeInc;
  let coords = `M${coordsObject[1][0] * sizeInc},${coordsObject[1][1] * sizeInc} `;
  for (let a=2; a <= (Object.keys(coordsObject).length - 1); a = a+2) {
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Arcs
    coords += `A 10,10 0 1 1 ${coordsObject[a][0] * sizeInc},${coordsObject[a][1] * sizeInc} `;
  }
  coords += `A 10,10 0 1 1 ${coordsObject[1][0] * sizeInc},${coordsObject[1][1] * sizeInc} `;
  return `<svg id='altarc-${order}-${id}' class='order-x' viewbox='${-200} ${-170} ${w-sizeInc+380} ${w-sizeInc+380}'><path class='lines arc' d='${coords}'/></svg>`;
}
