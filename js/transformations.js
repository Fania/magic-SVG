// Gaspalou Transformations
// https://www.gaspalou.fr/magic-squares/order-4.htm#1

const m1 = index4[0].numbers.array;
const m2 = index4[1].numbers.array;
const m9 = index4[8].numbers.array;
const m13 = index4[12].numbers.array;


function transform(m, type) {
  switch(type) {
    // 8 D4 transformations (using Gaspalou naming)
    case "I":  // A1 A2 A3 A4 B1 B2 B3 B4 C1 C2 C3 C4 D1 D2 D3 D4
      // return m;
      return [m[ 0], m[ 1], m[ 2], m[ 3],
              m[ 4], m[ 5], m[ 6], m[ 7],
              m[ 8], m[ 9], m[10], m[11],
              m[12], m[13], m[14], m[15]];
    case "V":  // A4 A3 A2 A1 B4 B3 B2 B1 C4 C3 C2 C1 D4 D3 D2 D1
      return [m[ 3], m[ 2], m[ 1], m[ 0],
              m[ 7], m[ 6], m[ 5], m[ 4],
              m[11], m[10], m[ 9], m[ 8],
              m[15], m[14], m[13], m[12]];
    case "H":  // D1 D2 D3 D4 C1 C2 C3 C4 B1 B2 B3 B4 A1 A2 A3 A4
      return [m[12], m[13], m[14], m[15],
              m[ 8], m[ 9], m[10], m[11],
              m[ 4], m[ 5], m[ 6], m[ 7],
              m[ 0], m[ 1], m[ 2], m[ 3]];
    case "G":  // A1 B1 C1 D1 A2 B2 C2 D2 A3 B3 C3 D3 A4 B4 C4 D4
      return [m[ 0], m[ 4], m[ 8], m[12],
              m[ 1], m[ 5], m[ 9], m[13],
              m[ 2], m[ 6], m[10], m[14],
              m[ 3], m[ 7], m[11], m[15]];
    case "D":  // D4 C4 B4 A4 D3 C3 B3 A3 D2 C2 B2 A2 D1 C1 B1 A1
      return [m[15], m[11], m[ 7], m[ 3],
              m[14], m[10], m[ 6], m[ 2],
              m[13], m[ 9], m[ 5], m[ 1],
              m[12], m[ 8], m[ 4], m[ 0]];
    case "R1": // A4 B4 C4 D4 A3 B3 C3 D3 A2 B2 C2 D2 A1 B1 C1 D1
      return [m[ 3], m[ 7], m[11], m[15],
              m[ 2], m[ 6], m[10], m[14],
              m[ 1], m[ 5], m[ 9], m[13],
              m[ 0], m[ 4], m[ 8], m[12]];
    case "R2": // D4 D3 D2 D1 C4 C3 C2 C1 B4 B3 B2 B1 A4 A3 A2 A1
      return [m[15], m[14], m[13], m[12],
              m[11], m[10], m[ 9], m[ 8],
              m[ 7], m[ 6], m[ 5], m[ 4],
              m[ 3], m[ 2], m[ 1], m[ 0]];
    case "R3": // D1 C1 B1 A1 D2 C2 B2 A2 D3 C3 B3 A3 D4 C4 B4 A4
      return [m[12], m[ 8], m[ 4], m[ 0],
              m[13], m[ 9], m[ 5], m[ 1],
              m[14], m[10], m[ 6], m[ 2],
              m[15], m[11], m[ 7], m[ 3]];


    // Additional 24 transformations by Gaspalou (32 in total)
    case "IT": // A1 A3 A2 A4 C1 C3 C2 C4 B1 B3 B2 B4 D1 D3 D2 D4
      return [m[ 0], m[ 2], m[ 1], m[ 3],
              m[ 8], m[10], m[ 9], m[11],
              m[ 4], m[ 6], m[ 5], m[ 7],
              m[12], m[14], m[13], m[15]];
    case "EX": // D4 D2 D3 D1 B4 B2 B3 B1 C4 C2 C3 C1 A4 A2 A3 A1
      return [m[15], m[13], m[14], m[12],
              m[ 7], m[ 5], m[ 6], m[ 4],
              m[11], m[ 9], m[10], m[ 8],
              m[ 3], m[ 1], m[ 2], m[ 0]];
    case "M": // A1 C1 B1 D1 A3 C3 B3 D3 A2 C2 B2 D2 A4 C4 B4 D4
      return [m[ 0], m[ 8], m[ 4], m[12],
              m[ 2], m[10], m[ 6], m[14],
              m[ 1], m[ 9], m[ 5], m[13],
              m[ 3], m[11], m[ 7], m[15]];
    case "N": // D4 B4 C4 A4 D2 B2 C2 A2 D3 B3 C3 A3 D1 B1 C1 A1
      return [m[15], m[ 7], m[11], m[ 3],
              m[13], m[ 5], m[ 9], m[ 1],
              m[14], m[ 6], m[10], m[ 2],
              m[12], m[ 4], m[ 8], m[ 0]];
    case "X": // A4 A2 A3 A1 C4 C2 C3 C1 B4 B2 B3 B1 D4 D2 D3 D1
      return [m[ 3], m[ 1], m[ 2], m[ 0],
              m[11], m[ 9], m[10], m[ 8],
              m[ 7], m[ 5], m[ 6], m[ 4],
              m[15], m[13], m[14], m[12]];
    case "Y": // D1 D3 D2 D4 B1 B3 B2 B4 C1 C3 C2 C4 A1 A3 A2 A4
      return [m[12], m[14], m[13], m[15],
              m[ 4], m[ 6], m[ 5], m[ 7],
              m[ 8], m[10], m[ 9], m[11],
              m[ 0], m[ 2], m[ 1], m[ 3]];
    case "Z": // A4 C4 B4 D4 A2 C2 B2 D2 A3 C3 B3 D3 A1 C1 B1 D1
      return [m[ 3], m[11], m[ 7], m[15],
              m[ 1], m[ 9], m[ 5], m[13],
              m[ 2], m[10], m[ 6], m[14],
              m[ 0], m[ 8], m[ 4], m[12]];
    case "T": // D1 B1 C1 A1 D3 B3 C3 A3 D2 B2 C2 A2 D4 B4 C4 A4
      return [m[12], m[ 4], m[ 8], m[ 0],
              m[14], m[ 6], m[10], m[ 2],
              m[13], m[ 5], m[ 9], m[ 1],
              m[15], m[ 7], m[11], m[ 3]];


    case "A": // B2 B1 B4 B3 A2 A1 A4 A3 D2 D1 D4 D3 C2 C1 C4 C3
      return [m[ 5], m[ 4], m[ 7], m[ 6],
              m[ 1], m[ 0], m[ 3], m[ 2],
              m[13], m[12], m[15], m[14],
              m[ 9], m[ 8], m[11], m[10]];
    case "V*A": // B3 B4 B1 B2 A3 A4 A1 A2 D3 D4 D1 D2 C3 C4 C1 C2
      return [m[ 6], m[ 7], m[ 4], m[ 5],
              m[ 2], m[ 3], m[ 0], m[ 1],
              m[14], m[15], m[12], m[13],
              m[10], m[11], m[ 8], m[ 9]];
    case "H*A": // C2 C1 C4 C3 D2 D1 D4 D3 A2 A1 A4 A3 B2 B1 B4 B3
      return [m[ 9], m[ 8], m[11], m[10],
              m[13], m[12], m[15], m[14],
              m[ 1], m[ 0], m[ 3], m[ 2],
              m[ 5], m[ 4], m[ 7], m[ 6]];
    case "G*A": // B2 A2 D2 C2 B1 A1 D1 C1 B4 A4 D4 C4 B3 A3 D3 C3
      return [m[ 5], m[ 1], m[13], m[ 9],
              m[ 4], m[ 0], m[12], m[ 8],
              m[ 7], m[ 3], m[15], m[11],
              m[ 6], m[ 2], m[14], m[10]];
    case "D*A": // C3 D3 A3 B3 C4 D4 A4 B4 C1 D1 A1 B1 C2 D2 A2 B2
      return [m[10], m[14], m[ 2], m[ 6],
              m[11], m[15], m[ 3], m[ 7],
              m[ 8], m[12], m[ 0], m[ 4],
              m[ 9], m[13], m[ 1], m[ 5]];
    case "R1*A": // B3 A3 D3 C3 B4 A4 D4 C4 B1 A1 D1 C1 B2 A2 D2 C2
      return [m[ 6], m[ 2], m[14], m[10],
              m[ 7], m[ 3], m[15], m[11],
              m[ 4], m[ 0], m[12], m[ 8],
              m[ 5], m[ 1], m[13], m[ 9]];
    case "R2*A": // C3 C4 C1 C2 D3 D4 D1 D2 A3 A4 A1 A2 B3 B4 B1 B2
      return [m[10], m[11], m[ 8], m[ 9],
              m[14], m[15], m[12], m[13],
              m[ 2], m[ 3], m[ 0], m[ 1],
              m[ 6], m[ 7], m[ 4], m[ 5]];
    case "R3*A": // C2 D2 A2 B2 C1 D1 A1 B1 C4 D4 A4 B4 C3 D3 A3 B3
      return [m[ 9], m[13], m[ 1], m[ 5],
              m[ 8], m[12], m[ 0], m[ 4],
              m[11], m[15], m[ 3], m[ 7],
              m[10], m[14], m[ 2], m[ 6]];


    case "IT*A": // C3 C1 C4 C2 A3 A1 A4 A2 D3 D1 D4 D2 B3 B1 B4 B2
      return [m[10], m[ 8], m[11], m[ 9],
              m[ 2], m[ 0], m[ 3], m[ 1],
              m[14], m[12], m[15], m[13],
              m[ 6], m[ 4], m[ 7], m[ 5]];
    case "EX*A": // B2 B4 B1 B3 D2 D4 D1 D3 A2 A4 A1 A3 C2 C4 C1 C3
      return [m[ 5], m[ 7], m[ 4], m[ 6],
              m[13], m[15], m[12], m[14],
              m[ 1], m[ 3], m[ 0], m[ 2],
              m[ 9], m[11], m[ 8], m[10]];
    case "M*A": // C3 A3 D3 B3 C1 A1 D1 B1 C4 A4 D4 B4 C2 A2 D2 B2
      return [m[10], m[ 2], m[14], m[ 6],
              m[ 8], m[ 0], m[12], m[ 4],
              m[11], m[ 3], m[15], m[ 7],
              m[ 9], m[ 1], m[13], m[ 5]];
    case "N*A": // B2 D2 A2 C2 B4 D4 A4 C4 B1 D1 A1 C1 B3 D3 A3 C3
      return [m[ 5], m[13], m[ 1], m[ 9],
              m[ 7], m[15], m[ 3], m[11],
              m[ 4], m[12], m[ 0], m[ 8],
              m[ 6], m[14], m[ 2], m[10]];
    case "X*A": // C2 C4 C1 C3 A2 A4 A1 A3 D2 D4 D1 D3 B2 B4 B1 B3
      return [m[ 9], m[11], m[ 8], m[10],
              m[ 1], m[ 3], m[ 0], m[ 2],
              m[13], m[15], m[12], m[14],
              m[ 5], m[ 7], m[ 4], m[ 6]];
    case "Y*A": // B3 B1 B4 B2 D3 D1 D4 D2 A3 A1 A4 A2 C3 C1 C4 C2
      return [m[ 6], m[ 4], m[ 7], m[ 5],
              m[14], m[12], m[15], m[13],
              m[ 2], m[ 0], m[ 3], m[ 1],
              m[10], m[ 8], m[11], m[ 9]];
    case "Z*A": // C2 A2 D2 B2 C4 A4 D4 B4 C1 A1 D1 B1 C3 A3 D3 B3
      return [m[ 9], m[ 1], m[13], m[ 5],
              m[11], m[ 3], m[15], m[ 7],
              m[ 8], m[ 0], m[12], m[ 4],
              m[10], m[ 2], m[14], m[ 6]];
    case "T*A": // B3 D3 A3 C3 B1 D1 A1 C1 B4 D4 A4 C4 B2 D2 A2 C2
      return [m[ 6], m[14], m[ 2], m[10],
              m[ 4], m[12], m[ 0], m[ 8],
              m[ 7], m[15], m[ 3], m[11],
              m[ 5], m[13], m[ 1], m[ 9]];

    case "REmirrorLR": 
      return [m[ 1], m[ 0], m[ 3], m[ 2],
              m[ 5], m[ 4], m[ 7], m[ 6],
              m[13], m[12], m[15], m[14],
              m[ 9], m[ 8], m[11], m[10]];

    // case "": 
    //   return [m[], m[], m[], m[],
    //           m[], m[], m[], m[],
    //           m[], m[], m[], m[],
    //           m[], m[], m[], m[]];

    default: return m;
  }
}


const types = ["I","V","H","G","D","R1","R2","R3",
               "IT","EX","M","N","X","Y","Z","T",
               "A","V*A","H*A","G*A","D*A","R1*A","R2*A","R3*A",
               "IT*A","EX*A","M*A","N*A","X*A","Y*A","Z*A","T*A",
               "REmirrorLR"];
// for (let i=0; i<1; i++) {
//   console.log(`Transforming square #${i+1}:`);
//   for (let t in types) {
//     const trans = transform( index4[i].numbers.array, types[t] );
//     console.log(`${types[t]} = ${trans.join(" ")}`);
//     drawTransforms(4, trans, types[t])
//   }
// }


  const coordsObject1 = getCoords(4,[1,2,16,15,13,14,4,3,12,7,9,6,8,11,5,10]);
  const coordsObject2 = getCoords(4,[2,1,15,16,14,13,3,4,11,8,10,5,7,12,6,9]);
  const coordsObject3 = getCoords(4,[12,7,9,6,8,11,5,10,1,2,16,15,13,14,4,3]);
  const coordsObject4 = getCoords(4,[3,5,11,13,15,9,7,1,10,4,14,8,6,16,2,12]);
  let text = `
    <div>
      ${prepareSVG(4,"quadvertex",coordsObject1, 1)}
      ${prepareSVG(4,"quadvertex",coordsObject2, 1)}
      ${prepareSVG(4,"quadvertex",coordsObject3, 1)}
      ${prepareSVG(4,"quadvertex",coordsObject4, 1)}
    </div>
  `;
  // drawSquare(text);

// drawTransforms("4", [1,2,16,15,13,14,4,3,12,7,9,6,8,11,5,10], "ID")
// drawTransforms("4", [2,1,15,16,14,13,3,4,11,8,10,5,7,12,6,9], "XMV1")
// drawTransforms("4", [12,7,9,6,8,11,5,10,1,2,16,15,13,14,4,3], "XMV2")
// drawTransforms("4", [3,5,11,13,15,9,7,1,10,4,14,8,6,16,2,12], "XMV3")


// [[1,2,16,15,13,14,4,3,12,7,9,6,8,11,5,10],[2,1,15,16,14,13,3,4,11,8,10,5,7,12,6,9],[12,7,9,6,8,11,5,10,1,2,16,15,13,14,4,3],[3,5,11,13,15,9,7,1,10,4,14,8,6,16,2,12]]