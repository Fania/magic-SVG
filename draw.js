

function drawSquare(text,counter) {
  // svgGrid.innerHTML += text;  // SLOW AS FUCK AND BLOCKING
  svgGrid.insertAdjacentHTML("beforeend", text);  // FAST AND NON-BLOCKING
  anim.checked ? animate(counter) : stopAnimation(counter);
  anim.addEventListener("change", () => { 
    anim.checked ? animate(counter) : stopAnimation(counter);
  });
}


function updateColours() {

  console.log("variables before", svgFill, svgStroke, backColour.value);
  // console.log("inputs", fillColour.value, strokeColour.value, backColour.value);

  // svgFill = fillColour.value;
  svgFill === "none" ? svgFill = "none" : svgFill = fillColour.value;
  svgStroke = strokeColour.value;
  document.body.style.background = backColour.value;
  svgText = textColour.value;

  console.log("variables", svgFill, svgStroke, backColour.value, svgText);
  // console.log("inputs", fillColour.value, strokeColour.value, backColour.value);

  let text = `
    svg {
      fill: ${svgFill};
      stroke: ${svgStroke};
    }
  `;

    //   svg text {
    //   fill: ${svgText};
    // }

  if (extra_styles.innerText.includes("svg")) { 
    let txt = extra_styles.innerText;
    let rexFill = /fill: (#?\w+);/m;
    let rexStroke = /stroke: (#?\w+);/m;
    let fillMatch = txt.match(rexFill);
    let strokeMatch = txt.match(rexStroke);
    let txtF = txt.replace(fillMatch[1], svgFill);
    let txtFS = txtF.replace(strokeMatch[1], svgStroke);
    extra_styles.innerHTML = txtFS;
  } else {
    extra_styles.insertAdjacentHTML("beforeend", text);
  }
}



function squareSettings() {
  svgFill = "none";
  svgStroke = "#eeeeee";
  // fillColour.value = "none";
  strokeColour.value = "#eeeeee";
  anim.disabled = false;
  textColour.disabled = true;
  clearFill.disabled = false;
  fillColour.disabled = clearFill.checked;
  padding.disabled = false;
  strokeColour.disabled = false;
  anim.previousSibling.classList.remove("disable");
  strokeColour.previousSibling.classList.remove("disable");
  textColour.previousSibling.classList.add("disable");
  padding.previousSibling.classList.remove("disable");
  // fillColour.previousSibling.classList.remove("disable");
  // clearFill.previousSibling.classList.remove("disable");

  // toggleFill(clearFill.checked);
  // toggleFill(true);
  clearFill.addEventListener("change", () => {
    toggleFill(clearFill.checked); });
}

function numberSettings() {
  fillColour.value = "#666666";
  strokeColour.value = "#666666";
  textColour.value = "#eeeeee";
  svgText = textColour.value;
  if (svgFill === "none") svgFill = fillColour.value;
  anim.checked = false;
  anim.disabled = true;
  clearFill.checked = false;
  clearFill.disabled = true;
  fillColour.disabled = true;
  textColour.disabled = false;
  padding.disabled = true;
  strokeColour.disabled = true;
  anim.previousSibling.classList.add("disable");
  strokeColour.previousSibling.classList.add("disable");
  textColour.previousSibling.classList.remove("disable");
  fillColour.previousSibling.classList.add("disable");
  clearFill.previousSibling.classList.add("disable");
  padding.previousSibling.classList.add("disable");
}



function toggleFill(nofill) {
  console.log("nofill", nofill);
  if (nofill) {
    fillColour.disabled = true;
    clearFill.checked = true;
    fillColour.previousSibling.classList.add("disable");
    // fillColour.value = "#666666";
    svgFill = "none";
  } else {
    fillColour.disabled = false;
    clearFill.checked = false;
    fillColour.previousSibling.classList.remove("disable");
    svgFill = fillColour.value;
  }


}




function createNumberSVGs(size, arr) {
  // console.log("numbers only");

  numberSettings();

  let texts;
  let w = size * sizeInc;
  pad = 50;
  for (let a in arr) {
    // it's Y,X in SVG rather than X,Y
    // order is wrong in the coordsArray [r,c], not the svg
    texts += `<text x="${arr[a][1] * 100}" y="${arr[a][0] * 100}">${a.padStart(2, '0')}</text>`;
  }
  // 0 -50 380 370 for order 4
  let output = `<svg class="order-xt" viewbox="${0} ${-pad} ${w-sizeInc+pad+30} ${w-sizeInc+pad+20}">${texts}"</svg>`;
  svgGrid.insertAdjacentHTML("beforeend", output);
}




function createQuadraticCurveVertices(size, arr, counter) {
  // console.log(size, arr);
  // console.log("quadratic curve on vertices");

  squareSettings();

  let w = size * sizeInc;
  
  let fstx = arr[1][1] * sizeInc;
  let fsty = arr[1][0] * sizeInc;
  let sndx = arr[2][1] * sizeInc;
  let sndy = arr[2][0] * sizeInc;
  let fstmx = (fstx + sndx) / 2;
  let fstmy = (fsty + sndy) / 2;

  let coords = `M ${fstmx},${fstmy} `;

  for (let a=1; a <= Object.keys(arr).length; a++) {
    let c1x = arr[a][1] * sizeInc;
    let c1y = arr[a][0] * sizeInc;
    let c2x, c2y, c3x, c3y;

    // next to last
    if (a == (Object.keys(arr).length)) {
      c2x = arr[1][1] * sizeInc;
      c2y = arr[1][0] * sizeInc;
      c3x = arr[2][1] * sizeInc;
      c3y = arr[2][0] * sizeInc;

    // last
    } else if (a == (Object.keys(arr).length - 1)) {
      c2x = arr[a+1][1] * sizeInc;
      c2y = arr[a+1][0] * sizeInc;
      c3x = arr[1][1] * sizeInc;
      c3y = arr[1][0] * sizeInc;

    // all previous
    } else {
      c2x = arr[a+1][1] * sizeInc;
      c2y = arr[a+1][0] * sizeInc;
      c3x = arr[a+2][1] * sizeInc;
      c3y = arr[a+2][0] * sizeInc;
    }

    let m1x = (c1x + c2x) / 2;
    let m1y = (c1y + c2y) / 2;
    let m2x = (c2x + c3x) / 2;
    let m2y = (c2y + c3y) / 2;

    // console.log(c1x, c1y, m1x, m1y, c2x, c2y, m2x, m2y, c3x, c3y);
    coords += `Q ${c2x},${c2y} ${m2x},${m2y} `;
  }

  drawSquare(`<svg class="order-x" viewbox="${-pad} ${-pad} ${w-sizeInc+pad+pad} ${w-sizeInc+pad+pad}"><path id="square-${counter}" class="lines" d="${coords}"/></svg>`, counter);

}


function createQuadraticCurveLines(size, arr, counter) {
  // console.log("quadratic curve on lines");

  squareSettings();

  let w = size * sizeInc;
  let len = Object.keys(arr).length;
  let coords = `M ${arr[1][1] * sizeInc},${arr[1][0] * sizeInc} `;
  // for (let a=2; a <= (len - 1); a = a+2) {
  for (let a=2; a <= (len - 1); a = a+2) {
    coords += `Q ${arr[a][1] * sizeInc},${arr[a][0] * sizeInc} ${arr[a+1][1] * sizeInc},${arr[a+1][0] * sizeInc} `;
  }
  coords += `Q ${arr[len][1] * sizeInc},${arr[len][0] * sizeInc} ${arr[1][1] * sizeInc},${arr[1][0] * sizeInc} `;  // loop back

  drawSquare(`<svg class="order-x" viewbox="${-pad} ${-pad} ${w-sizeInc+pad+pad} ${w-sizeInc+pad+pad}"><path id="square-${counter}" class="lines" d="${coords}"/></svg>`, counter);
}

function createArc(size, arr, counter) {
  // console.log("arc experiment");

  squareSettings();

  let w = size * sizeInc;
  let coords = `M${arr[1][1] * sizeInc},${arr[1][0] * sizeInc} `;
  for (let a=2; a <= (Object.keys(arr).length - 1); a = a+2) {
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Arcs
    coords += `A 10,10 0 1 1 ${arr[a][1] * sizeInc},${arr[a][0] * sizeInc} `;
  }
  coords += `A 10,10 0 1 1 ${arr[1][1] * sizeInc},${arr[1][0] * sizeInc} `;

  // drawSquare(`<svg class="order-x" style="fill: ${svgFill}; stroke: ${svgStroke}" viewbox="${-pad} ${-pad} ${w-sizeInc+pad+pad} ${w-sizeInc+pad+pad}"><path id="square-${counter}" class="lines" d="${coords}"/></svg>`, counter);
  drawSquare(`<svg class="order-x" viewbox="${-pad-150} ${-pad-150} ${w-sizeInc+pad+pad+300} ${w-sizeInc+pad+pad+300}"><path id="square-${counter}" class="lines" d="${coords}"/></svg>`, counter);
}

function createPolyline(size, arr, counter) {
  // console.log("straight polyline");

  squareSettings();

  let w = size * sizeInc;
  let coords = "";
  let i;
  svgStroke===undefined ? svgStroke="none" : svgStroke;
  svgFill===undefined ? svgFill="none" : svgFill;

  for (i in arr) {
    coords += `${arr[i][1] * sizeInc},${arr[i][0] * sizeInc} `;
  }
  coords += `${arr[1][1] * sizeInc},${arr[1][0] * sizeInc} `;
  drawSquare(`<svg class="order-x" viewbox="${-pad} ${-pad} ${w-sizeInc+pad+pad} ${w-sizeInc+pad+pad}"><polyline id="square-${counter}" class="lines" points="${coords}"/></svg>`, counter);
}
