
const order3all = [[2,7,6,9,5,1,4,3,8],[2,9,4,7,5,3,6,1,8],
                   [4,3,8,9,5,1,2,7,6],[4,9,2,3,5,7,8,1,6],
                   [6,1,8,7,5,3,2,9,4],[6,7,2,1,5,9,8,3,4],
                   [8,1,6,3,5,7,4,9,2],[8,3,4,1,5,9,6,7,2]];

const order4headTransformed = [
  [1,2,15,16,12,14,3,5,13,7,10,4,8,11,6,9],
  [16,15,2,1,5,3,14,12,4,10,7,13,9,6,11,8],
  [8,11,6,9,13,7,10,4,12,14,3,5,1,2,15,16],
  [1,12,13,8,2,14,7,11,15,3,10,6,16,5,4,9],
  [9,4,5,16,6,10,3,15,11,7,14,2,8,13,12,1],
  [8,13,12,1,11,7,14,2,6,10,3,15,9,4,5,16],
  [9,6,11,8,4,10,7,13,5,3,14,12,16,15,2,1],
  [16,5,4,9,15,3,10,6,2,14,7,11,1,12,13,8]];


function testPrints(input) {
  svgGrid.innerHTML = "";
  let o = Math.sqrt(input[0].length);
  for (let i=0; i<input.length; i++) {
    drawOurOwn(o, input[i], i+1);
  }
}
// testPrints(ourown);
// testPrints(order4headTransformed);
// testPrints(order3all);
// testPrints(faniaNoCompls);




function testPrintsCompare(ours,suzi) {
  svgGrid.innerHTML = "";
  let o = Math.sqrt(ours[0].length);
  for (let i=0; i<ours.length; i++) {
    let text = `
      <div class="" title="Our=${i} (${ours[i]})\nSuzuki=${i} (${suzi[i]})">
        <span class="ours">${prepareSVG("quadvertex",getCoords(o,ours[i]),i+1)}</span>
        <span class="suzuki">${prepareSVG("quadvertex",getCoords(o,suzi[i]),i+1)}</span>
      </div>
    `;
    drawSquare(text);
    // drawOurOwn(o, ours[i], i+1);
  }
}
// testPrintsCompare(order4rOUR.sort(),suzuki.sort());

// console.log(suzuki.length, order4rOUR.length);
// console.log(suzuki.sort() == order4rOUR.sort());



function testAgrippa(input) {
  svgGrid.innerHTML = "";
  for (let i in input) {
    let o = Math.sqrt(input[i].length);
    let text = `
      <div class="agrippa">
        ${prepareSVG("numbers",getCoords(o,input[i]),0)}
        <p>${i}</p>
      </div>
    `;
    drawSquare(text);
  }
  for (let i in input) {
    let o = Math.sqrt(input[i].length);
    let text = `
      <div class="agrippa">
        ${prepareSVG("quadvertex",getCoords(o,input[i]),0)}
        <p>${i}</p>
      </div>
    `;
    drawSquare(text);
  }
  for (let i in input) {
    let o = Math.sqrt(input[i].length);
    let text = `
      <div class="agrippa">
        ${prepareSVG("straight",getCoords(o,input[i]),0)}
        <p>${i}</p>
      </div>
    `;
    drawSquare(text);
  }
  for (let i in input) {
    let o = Math.sqrt(input[i].length);
    let text = `
      <div class="agrippa">
        ${prepareSVG("quadline",getCoords(o,input[i]),0)}
        <p>${i}</p>
      </div>
    `;
    drawSquare(text);
  }
}
// testAgrippa(agrippa);





const n13t = [
  [2,1,15,16,14,13,3,4,11,8,10,5,7,12,6,9], // ID
  [7,11,14,2,12,8,13,1,6,10,3,15,9,5,4,16], // R1
  [9,6,12,7,5,10,8,11,4,3,13,14,16,15,1,2], // R2
  [16,4,5,9,15,3,10,6,1,13,8,12,2,14,11,7], // R3
  [16,15,1,2,4,3,13,14,5,10,8,11,9,6,12,7], // MV
  [7,12,6,9,11,8,10,5,14,13,3,4,2,1,15,16], // MH
  [2,14,11,7,1,13,8,12,15,3,10,6,16,4,5,9], // MD1
  [9,5,4,16,6,10,3,15,12,8,13,1,7,11,14,2]  // MD2
];
const ts = ["ID","R1","R2","R3","MV","MH","MD1","MD2"];
const xt1 = [[2,1,15,16,14,13,3,4,11,8,10,5,7,12,6,9],[1,2,16,15,13,14,4,3,12,7,9,6,8,11,5,10],[11,8,10,5,7,12,6,9,2,1,15,16,14,13,3,4],[4,6,12,14,16,10,8,2,9,3,13,7,5,15,1,11]];

function testTrans(input, input2) {
  svgGrid.innerHTML = "";
  for (let i in input) {
    let o = Math.sqrt(input[i].length);
    let text = `
      <div class="agrippa">
        ${prepareSVG("numbers",getCoords(o,input[i]),0)}
        <p>${ts[i]}</p>
      </div>
    `;
    drawSquare(text);
  }
  for (let i in input) {
    let o = Math.sqrt(input[i].length);
    let text = `
      <div class="agrippa">
        ${prepareSVG("quadvertex",getCoords(o,input[i]),0)}
        <p>${ts[i]}</p>
      </div>
    `;
    drawSquare(text);
  }
  for (let i in input2) {
    let o = Math.sqrt(input2[i].length);
    let text = `
      <div class="agrippa">
        ${prepareSVG("numbers",getCoords(o,input2[i]),0)}
      </div>
    `;
    drawSquare(text);
  }
  for (let i in input2) {
    let o = Math.sqrt(input2[i].length);
    let text = `
      <div class="agrippa">
        ${prepareSVG("quadvertex",getCoords(o,input2[i]),0)}
      </div>
    `;
    drawSquare(text);
  }
}
// testTrans(n13t, xt1);











function testRaczinskiUniques(input) {
  svgGrid.innerHTML = "";
  // console.log(Object.entries(i["quadvertex"])[0][1].length === 0);
  let uniques = input.filter(i => 
    i["simQuadVertex"] === "unique" || i["simQuadVertex"] === "identity"
  );
  // console.log(uniques);
  // console.log(uniques.length);
  for (let u in uniques) {
    drawSquare( uniques[u]["quadvertex"]["svg"] );
  }

}
// testRaczinskiUniques(index4R);

















function testUnique(input) {
  svgGrid.innerHTML = "";

  // console.log(Object.entries(i["quadvertex"])[0][1].length === 0);
  let uniques = input.filter(i => 
    Object.entries(i["quadvertex"])[0][1].length === 0
  );
  console.log(uniques);

  for (let u in uniques) {
    drawSquare( uniques[u]["quadvertex"]["svg"] );
  }

}
// testUnique(indexFania880);










function testTrulyUnique(input) {
  svgGrid.innerHTML = "";
  let uniques = input.filter(i => 
    i["sim"] === "unique" || i["sim"] === "identity"
  );
  // console.log(uniques);
  // console.log(uniques.length);
  for (let u in uniques) {
    drawSquare( uniques[u]["quadvertex"]["svg"] );
  }
}
// testTrulyUnique(indexFania880);



