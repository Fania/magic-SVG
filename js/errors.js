const errorChecks = (valuesArray) => {
  const unDupvaluesArray = [...new Set(valuesArray)];
  let dups = valuesArray.length !== unDupvaluesArray.length;
  // checks for non-numbers
  if (valuesArray.includes(NaN)) {
    dataArray = [...new Set(valuesArray.filter(Boolean))];
    // removes non-numbers:
    // valuesArray = dataArray;
    let n = valuesArray.findIndex(Number.isNaN)
    return [true, `contains non-numbers (NaN): ${valuesArray}`];
  } else if (dups) {
    return [findDuplicates(valuesArray), `Contains duplicated numbers: ${findDuplicates(valuesArray)}`];
    // return [true, valuesArray.filter(x => unDupvaluesArray.includes(x))];
    // return [true, `Contains duplicated numbers: ${calcDups(valuesArray, unDupvaluesArray)}`];
  } else {
    // contains only contiguous integers:
    // sorts valuesArray
    const valuesArraySorted = [...valuesArray];
    valuesArraySorted.sort((a, b) => a - b);
    // creates new array from 1 to length of valuesArray
    let ArrayLen = [...valuesArray.keys()];
    // compares sorted array with a contiguous array of same length
    ArrayLen = ArrayLen.map((val) => val + 1 );
    let comparison = valuesArraySorted.every(e => ArrayLen.includes(e));
    if (!comparison) {
      return [comparison, `Contains non-contiguous numbers, starting from 1.`];
    }
    // ELSE check for an n x n (square) array */
    // TEST true if square root of length is an integer
  }
  errorMsg.innerHTML = '';
}

// attempts at a shorter findDuplicates:
// let calcDups = (arr1, arr2) => {
//   let intersection = arr1.filter(x => arr2.includes(x));
//   return intersection;
// };
// or
// ArrA.filter(n => !ArrB.includes(n));

function findDuplicates(data) {
  let result = [];
  data.forEach(function(element, index) {
    // Find if there is a duplicate or not
    if (data.indexOf(element, index + 1) > -1) {
      // Find if the element is already in the result array or not
      if (result.indexOf(element) === -1) {
        result.push(element);
      }
    }
  });
  return result;
}
