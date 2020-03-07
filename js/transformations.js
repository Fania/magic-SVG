// Gaspalou Transformations
// https://www.gaspalou.fr/magic-squares/order-4.htm#1

// IT: 
// A1 A3 A2 A4
// C1 C3 C2 C4
// B1 B3 B2 B4
// D1 D3 D2 D4

// EX:
// D4 D2 D3 D1
// B4 B2 B3 B1
// C4 C2 C3 C1
// A4 A2 A3 A1

// M:
// A1 C1 B1 D1
// A3 C3 B3 D3
// A2 C2 B2 D2
// A4 C4 B4 D4

// N:
// D4 B4 C4 A4
// D2 B2 C2 A2
// D3 B3 C3 A3
// D1 B1 C1 A1

// X:
// A4 A2 A3 A1
// C4 C2 C3 C1
// B4 B2 B3 B1
// D4 D2 D3 D1

// Y:
// D1 D3 D2 D4
// B1 B3 B2 B4
// C1 C3 C2 C4
// A1 A3 A2 A4

// Z:
// A4 C4 B4 D4
// A2 C2 B2 D2
// A3 C3 B3 D3
// A1 C1 B1 D1

// T:
// D1 B1 C1 A1
// D3 B3 C3 A3
// D2 B2 C2 A2
// D4 B4 C4 A4

// A: 
// B2 B1 B4 B3
// A2 A1 A4 A3
// D2 D1 D4 D3
// C2 C1 C4 C3

// V*A:
// B3 B4 B1 B2
// A3 A4 A1 A2
// D3 D4 D1 D2
// C3 C4 C1 C2

// H*A:
// C2 C1 C4 C3
// D2 D1 D4 D3
// A2 A1 A4 A3
// B2 B1 B4 B3

// G*A:
// B2 A2 D2 C2
// B1 A1 D1 C1
// B4 A4 D4 C4
// B3 A3 D3 C3

// D*A:
// C3 D3 A3 B3
// C4 D4 A4 B4
// C1 D1 A1 B1
// C2 D2 A2 B2

// R1*A:
// B3 A3 D3 C3
// B4 A4 D4 C4
// B1 A1 D1 C1
// B2 A2 D2 C2

// R2*A:
// C3 C4 C1 C2
// D3 D4 D1 D2
// A3 A4 A1 A2
// B3 B4 B1 B2

// R3*A:
// C2 D2 A2 B2
// C1 D1 A1 B1
// C4 D4 A4 B4
// C3 D3 A3 B3

// IT*A: 
// C3 C1 C4 C2
// A3 A1 A4 A2
// D3 D1 D4 D2
// B3 B1 B4 B2

// EX*A:
// B2 B4 B1 B3
// D2 D4 D1 D3
// A2 A4 A1 A3
// C2 C4 C1 C3

// M*A:
// C3 A3 D3 B3
// C1 A1 D1 B1
// C4 A4 D4 B4
// C2 A2 D2 B2

// N*A:
// B2 D2 A2 C2
// B4 D4 A4 C4
// B1 D1 A1 C1
// B3 D3 A3 C3

// X*A: 
// C2 C4 C1 C3
// A2 A4 A1 A3
// D2 D4 D1 D3
// B2 B4 B1 B3

// Y*A:
// B3 B1 B4 B2
// D3 D1 D4 D2
// A3 A1 A4 A2
// C3 C1 C4 C2

// Z*A:
// C2 A2 D2 B2
// C4 A4 D4 B4
// C1 A1 D1 B1
// C3 A3 D3 B3

// T*A:
// B3 D3 A3 C3
// B1 D1 A1 C1
// B4 D4 A4 C4
// B2 D2 A2 C2


const m1 = index4[0].numbers.array;
const m2 = index4[1].numbers.array;
const m9 = index4[8].numbers.array;
const m13 = index4[12].numbers.array;



function transform(m, type) {
  switch(type) {
    case "I":  // A1 A2 A3 A4 B1 B2 B3 B4 C1 C2 C3 C4 D1 D2 D3 D4
      return m;
      // return [m[ 0], m[ 1], m[ 2], m[ 3],
      //         m[ 4], m[ 5], m[ 6], m[ 7],
      //         m[ 8], m[ 9], m[10], m[11],
      //         m[12], m[13], m[14], m[15]];
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



    default: return m;
  }
}


const types = ["I","V","H","G","D","R1","R2","R3"];
for (let i=0; i<4; i++) {
  console.log(`Transforming square #${i+1}:`);
  for (let t in types) {
    const trans = transform( index4[i].numbers.array, types[t] );
    console.log(`${types[t]} = ${trans.join(" ")}`);
    drawTransforms(4, trans, types[t])
  }
}