"use strict";


function generateSquares(n) { 
  
  const squares = [];
  const square = [];

  console.log(``);

  for (let i=1; i<=n*n; i++) {

    square.add(i);



  }



  return square;

}

// console.log( generateSquares(3) );     


//   let square = [];
//   for (let i=1; i<=3*3; i++) {
//     square.push(i);
//   }
//   console.log(square);




// let values = [];
// for (let x = 0; x < 10; x++) {
//  values.push([
//   2 ** x,
//   2 * x ** 2
//  ])
// }
// console.table(values);
// console.log(values);





function isMagic(ns) {
  
}









// arguments list: int row    row to fill in
//                 int col    col to fill in
//                 int n      size of matrix
// return value :  int        the magic number for this row and col
//                            element of matrix
// ****************************
// let term1,term2;
// term1 = col - row + (n-1)/2;
// term2 = col + col - row;

// if (term1 >= n) {
//   term1 -= n;
// } else {
//   if (term1 < 0) {
//     term1 += n;
//   }
// }
// if (term2 > n) {
//   term2 -= n;
// } else {
//   if (term2 <= 0) {
//     term2 += n;
//   }
// }
// return term1 * n + term2;
// }
















function getMagicSquare() {

  let myArray = [
      [4, 9, 2],
      [3, 5, 7],
      [8, 1, 5]
  ];

  for (let index1 = 1; index1 < 10; index1++) {
    for (let index2 = 1; index2 < 10; index2++) {
      for (let index3 = 1; index3 < 10; index3++) {
        for (let index4 = 1; index4 < 10; index4++) {
          for (let index5 = 1; index5 < 10; index5++) {
            for (let index6 = 1; index6 < 10; index6++) {
              for (let index7 = 1; index7 < 10; index7++) {
                for (let index8 = 1; index8 < 10; index8++) {
                  for (let index9 = 1; index9 < 10; index9++)
                  // if numbers are not distinct for each loop, I can break the loop and make it a bit faster
                  {
                    const mySet = new Set();
                    mySet.add(index1).add(index2).add(index3).add(index4).add(index5).add(index6).add(index7).add(index8).add(index9)
                    if ((mySet.size === 9))
                      if (
                        (index1 + index2 + index3 === index4 + index5 + index6) &&
                        (index4 + index5 + index6 === index7 + index8 + index9) &&
                        (index7 + index8 + index9 === index1 + index4 + index7) &&
                        (index1 + index4 + index7 === index2 + index5 + index8) &&
                        (index2 + index5 + index8 === index3 + index6 + index9) &&
                        (index3 + index6 + index9 === index1 + index5 + index9) &&
                        (index1 + index5 + index9 === index3 + index5 + index7)
                      ) {
                        myArray[0][0] = index1;
                        myArray[0][1] = index2;
                        myArray[0][2] = index3;
                        myArray[1][0] = index4;
                        myArray[1][1] = index5;
                        myArray[1][2] = index6;
                        myArray[2][0] = index7;
                        myArray[2][1] = index8;
                        myArray[2][2] = index9;

                        console.log(myArray);

                      }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

}

// console.log(getMagicSquare());









// https://github.com/gsprasanna/generate-magic-square/blob/master/generateMagicSquare.js

const generateMagicSquare = (n = 4) => {
  // let last = n * n;
  let a = [];

  for (let m = 0; m < n; m++) a[m] = [];

  let i = 0;
  let j = Math.floor(n / 2);

  for (let c = 1; c <= n*n; c++) {
    if (i < 0) i = n - -i;
    if (i >= n) i = i - n;
    if (j < 0) j = n - -j;
    if (j >= n) j = j - n;

    a[i][j] = c;

    if (c % n === 0) {
      i++;
    } else {
      i--;
      j++;
    }
  }
  return a;
};

// console.log(generateMagicSquare(9));
// console.log(generateMagicSquare(3).map(m => m.join(" ")).join(" "));
















function generateSquare(n) { 
  
  // # 2-D array with all  
  // # slots set to 0 
  // magicSquare = [[0 for x in range(n)] 
  //                   for y in range(n)] 

  // # initialize position of 1 
  // i = n / 2
  // j = n - 1
    
  // # Fill the magic square 
  // # by placing values 
  // num = 1
  // while num <= (n * n): 
  //     if i == -1 and j == n: # 3rd condition 
  //         j = n - 2
  //         i = 0
  //     else: 
            
  //         # next number goes out of 
  //         # right side of square  
  //         if j == n: 
  //             j = 0
                
  //         # next number goes  
  //         # out of upper side 
  //         if i < 0: 
  //             i = n - 1
                
  //     if magicSquare[int(i)][int(j)]: # 2nd condition 
  //         j = j - 2
  //         i = i + 1
  //         continue
  //     else: 
  //         magicSquare[int(i)][int(j)] = num 
  //         num = num + 1
                
  //     j = j + 1
  //     i = i - 1 # 1st condition 
  

  // # Printing magic square 
  // print ("Magic Squre for n =", n) 
  // print ("Sum of each row or column",  
  //         n * (n * n + 1) / 2, "\n") 
    
  // for i in range(0, n): 
  //     for j in range(0, n): 
  //         print('%2d ' % (magicSquare[i][j]),  
  //                                  end = '') 
            
  //         # To display output  
  //         # in matrix form 
  //         if j == n - 1:  
  //             print() 

}

// console.log( generateSquare(3) );      







// https://stackoverflow.com/questions/52841191/what-is-the-optimal-way-of-generating-all-possible-3x3-magic-squares
function generateMagic3x3(n) {
  let i, j;
  i = Math.floor(n / 2);
  j = n - 1;
  let baseMatrix = [
    [],
    [],
    []
  ];
  baseMatrix[i][j] = 1;

  for (let k = 2; k <= n * n; k++) {
    i -= 1;
    j += 1;

    if (i < 0 && j === n) {
      i = 0;
      j = n - 2;
    } else if (i < 0) {
      i = n - 1;
    } else if (j === n) {
      j = 0;
    }

    if (typeof baseMatrix[i][j] === 'number') {
      i += 1;
      j -= 2;
    }

    baseMatrix[i][j] = k;
  }
  const baseMatrix2 = reflectDiag(baseMatrix);
  renderMatrix(baseMatrix)
  renderMatrix(reflectRows(baseMatrix));
  renderMatrix(reflectColumns(baseMatrix));
  renderMatrix(reflectColumns(reflectRows(baseMatrix)));
  renderMatrix(baseMatrix2);
  renderMatrix(reflectRows(baseMatrix2));
  renderMatrix(reflectColumns(baseMatrix2));
  renderMatrix(reflectColumns(reflectRows(baseMatrix2)));

};


function reflectColumns(matrix) {
  var newMatrix = matrix.map(function(arr) {
    return arr.slice();
  });
  for (let row = 0; row < matrix.length; row++) {
    newMatrix[row][0] = matrix[row][2];
    newMatrix[row][2] = matrix[row][0];
  }
  return newMatrix;
}

function reflectRows(matrix) {
  var newMatrix = matrix.map(function(arr) {
    return arr.slice();
  });
  for (let column = 0; column < matrix.length; column++) {
    newMatrix[0][column] = matrix[2][column];
    newMatrix[2][column] = matrix[0][column];
  }
  return newMatrix;
}

function reflectDiag(matrix) {
  var newMatrix = matrix.map(function(arr) {
    return arr.slice();
  });
  for (let row = 0; row < matrix.length; row++) {
    for (let column = 0; column < matrix.length; column++) {
      if (row !== column) {
        newMatrix[row][column] = matrix[column][row];
      }
    }
  }
  return newMatrix;
}

function renderMatrix(matrix) {
  const table = document.createElement('table');
  let resBox = document.getElementById('res')
  for (let row = 0; row < matrix.length; row++) {
    const tr = table.insertRow(row);
    for (let column = 0; column < matrix.length; column++) {
      const cell = tr.insertCell(column);
      cell.innerHTML = matrix[row][column];
    }
  }
  resBox.appendChild(table)
}


// console.log( generateMagic3x3(3) );