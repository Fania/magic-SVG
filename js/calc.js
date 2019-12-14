"use strict";


function magicConstant(size, valuesArray) {
  let oneRow = valuesArray.slice(0,size);
  let oneCol = valuesArray.filter(
    (value, index) => { return index % size == 0; }
  );
  let rowConstant = oneRow.reduce((a,b) => a + b);
  let colConstant = oneCol.reduce((a,b) => a + b);
  let magicConstant = rowConstant === colConstant ? rowConstant : `ERROR`;
  constant.innerHTML = `Magic constant: ${magicConstant}`;
  // return magicConstant;
}