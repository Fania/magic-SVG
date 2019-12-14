"use strict";


function drawSquare(text) {
  // console.log(`inserting square ${counter} to page`);
  // svgGrid.innerHTML += text;  // SLOW AS FUCK AND BLOCKING
  svgGrid.insertAdjacentHTML("beforeend", text);  // FAST AND NON-BLOCKING
}


function createNumberSVGs(size, arr) {
  // console.log(`preparing number matrix svg for square ${counter}`);
  let texts;
  let w = size * sizeInc;
  pad = 50;
  for (let a in arr) {
    texts += `<text x="${arr[a][0] * 100}" y="${arr[a][1] * 100}">${a.padStart(2, '0')}</text>`;
  }
  // 0 -50 380 370 for order 4
  return `<svg class="order-xt" viewbox="${0} ${-pad} ${w-sizeInc+pad+30} ${w-sizeInc+pad+20}">${texts}"</svg>`;
}


function createQuadraticCurveVertices(size, arr, counter) {
  // console.log(`preparing quadratic curve on vertices svg for square ${counter}`);

  let w = size * sizeInc;

  let fstx = arr[1][0] * sizeInc;
  let fsty = arr[1][1] * sizeInc;
  let sndx = arr[2][0] * sizeInc;
  let sndy = arr[2][1] * sizeInc;
  let fstmx = (fstx + sndx) / 2;
  let fstmy = (fsty + sndy) / 2;
  

  let coords = `M ${fstmx},${fstmy} `;

  for (let a=1; a <= Object.keys(arr).length; a++) {
    let c1x = arr[a][0] * sizeInc;
    let c1y = arr[a][1] * sizeInc;
    let c2x, c2y, c3x, c3y;

    // next to last
    if (a == (Object.keys(arr).length)) {
      c2x = arr[1][0] * sizeInc;
      c2y = arr[1][1] * sizeInc;
      c3x = arr[2][0] * sizeInc;
      c3y = arr[2][1] * sizeInc;

    // last
    } else if (a == (Object.keys(arr).length - 1)) {
      c2x = arr[a+1][0] * sizeInc;
      c2y = arr[a+1][1] * sizeInc;
      c3x = arr[1][0] * sizeInc;
      c3y = arr[1][1] * sizeInc;

    // all previous
    } else {
      c2x = arr[a+1][0] * sizeInc;
      c2y = arr[a+1][1] * sizeInc;
      c3x = arr[a+2][0] * sizeInc;
      c3y = arr[a+2][1] * sizeInc;
    }

    let m1x = (c1x + c2x) / 2;
    let m1y = (c1y + c2y) / 2;
    let m2x = (c2x + c3x) / 2;
    let m2y = (c2y + c3y) / 2;

    // console.log(c1x, c1y, m1x, m1y, c2x, c2y, m2x, m2y, c3x, c3y);
    coords += `Q ${c2x},${c2y} ${m2x},${m2y} `;
  }

  return `<svg class="order-x" viewbox="${-pad} ${-pad} ${w-sizeInc+pad+pad} ${w-sizeInc+pad+pad}"><path id="square-${counter}" class="lines" d="${coords}"/></svg>`;
}


function createQuadraticCurveLines(size, arr, counter) {
  // console.log(`preparing quadratic curve on lines svg for square ${counter}`);
  let w = size * sizeInc;
  let len = Object.keys(arr).length;
  let coords = `M ${arr[1][0] * sizeInc},${arr[1][1] * sizeInc} `;
  // for (let a=2; a <= (len - 1); a = a+2) {
  for (let a=2; a <= (len - 1); a = a+2) {
    coords += `Q ${arr[a][0] * sizeInc},${arr[a][1] * sizeInc} ${arr[a+1][0] * sizeInc},${arr[a+1][1] * sizeInc} `;
  }
  coords += `Q ${arr[len][0] * sizeInc},${arr[len][1] * sizeInc} ${arr[1][0] * sizeInc},${arr[1][1] * sizeInc} `;  // loop back

  return `<svg class="order-x" viewbox="${-pad} ${-pad} ${w-sizeInc+pad+pad} ${w-sizeInc+pad+pad}"><path id="square-${counter}" class="lines" d="${coords}"/></svg>`;
}


function createArc(size, arr, counter) {
  // console.log(`preparing arc experiment svg for square ${counter}`);
  let w = size * sizeInc;
  let coords = `M${arr[1][0] * sizeInc},${arr[1][1] * sizeInc} `;
  for (let a=2; a <= (Object.keys(arr).length - 1); a = a+2) {
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Arcs
    coords += `A 10,10 0 1 1 ${arr[a][0] * sizeInc},${arr[a][1] * sizeInc} `;
  }
  coords += `A 10,10 0 1 1 ${arr[1][0] * sizeInc},${arr[1][1] * sizeInc} `;
  // drawSquare(`<svg class="order-x" style="fill: ${svgFill}; stroke: ${svgStroke}" viewbox="${-pad} ${-pad} ${w-sizeInc+pad+pad} ${w-sizeInc+pad+pad}"><path id="square-${counter}" class="lines" d="${coords}"/></svg>`);
  return `<svg class="order-x" viewbox="${-pad-150} ${-pad-150} ${w-sizeInc+pad+pad+300} ${w-sizeInc+pad+pad+300}"><path id="square-${counter}" class="lines arc" d="${coords}"/></svg>`;
}


function createPolyline(size, arr, counter) {
  // console.log(`preparing straight polyline svg for square ${counter}`);
  let w = size * sizeInc;
  let coords = "";
  let i;
  for (i in arr) {
    coords += `${arr[i][0] * sizeInc},${arr[i][1] * sizeInc} `;
  }
  coords += `${arr[1][0] * sizeInc},${arr[1][1] * sizeInc} `;
  return `<svg class="order-x" viewbox="${-pad} ${-pad} ${w-sizeInc+pad+pad} ${w-sizeInc+pad+pad}"><polyline id="square-${counter}" class="lines" points="${coords}"/></svg>`;
}
