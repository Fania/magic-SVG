/**
 * File: MagicSquare.js
 * Author: Brian Borowski
 * Date created: August 24, 2007
 * Date last modified: August 27, 2007
 */
function MagicSquare() {
    // Private Member Variables
    var size = 3;
    var defaultCellSize = 21;
    var cellSize = defaultCellSize;
    var square = null;
    var sum = 0;

    // Public Method Pointers
    this.setSize = setSize;
    this.setCellSize = setCellSize;
    this.getSum = getSum;
    this.clear = clear;
    this.displaySum = displaySum;
    this.generate = generate;
    this.getIsValid = getIsValid; 
    this.drawSquare = drawSquare;


    // ********************** Public Methods *********************** //
    function setSize(sz) {
        size = parseInt(sz);
    }

    function setCellSize(sz) {
        if (sz < defaultCellSize) {
            cellSize = defaultCellSize;
        } else {
            cellSize = sz;
        }
    }

    function getSum() {
        return sum;
    }

    function clear() {
        square = null;
        cellSize = defaultCellSize;
    }

    function displaySum() {
        writeToLayer("sum", getSum());
    }

    function generate() {
        square = new Array();
        for (var row = 0; row < size; row++) {
            square[row] = new Array();
            for (var col = 0; col < size; col++) {
                square[row][col] = 0;
            }
        }
        if (size % 2) {
            generateOdd();
        } else {
            generateEven();
        }
        sum = size * (size * size + 1) / 2;
    }

    function getIsValid() {
        var sum0, sum1;
        if (square == null) {
            return false;
        }
        for (var row = 0; row < size; row++) {
            sum0 = 0;
            sum1 = 0;
            for (var col = 0; col < size; col++) {
                sum0 += square[row][col];
                sum1 += square[col][row];
            }
            if (sum0 != sum || sum1 != sum) {
                return false;
            }
        }
        sum0 = 0;
        sum1 = 0;
        for (var row = 0; row < size; row++) {
            sum0 += square[row][row];
            sum1 += square[row][size - row - 1];
        }
        if (sum0 != sum || sum1 != sum) {
            return false;
        }
        return true;
    }

    function drawSquare() {
        var sTable;
        sTable = "<table id=\"checkerboard\">";
        for (var row = 0; row < size; row++) {
            var sRow = "<tr>";
            for (var col = 0; col < size; col++) {
                if (row % 2 == col % 2) {
                    sRow += "<td class=\"altcolor\" ";
                } else {
                    sRow += "<td ";
                }
                if (square != null) {
                    sRow += "width=" + cellSize + " height=" +
                            cellSize + ">" + square[row][col] +
                            "</td>";
                } else {
                    sRow += "width=" + cellSize + " height=" +
                            cellSize + ">&nbsp;</td>";
                }
            }
            sRow += "</tr>";
            sTable += sRow;
        }
        sTable += "</table>";
        writeToLayer("board", sTable);
    }
    // ******************** End Public Methods ********************* //


    // ********************** Private Methods ********************** //
    function swap(j1, i1, j2, i2) {
        var k = square[i1][j1];
        square[i1][j1] = square[i2][j2];
        square[i2][j2] = k;
    }

    function generateEven() {
        var i, j, num, nMinus, nMiddle, nn, osl, switchRow,
            lastSwitchColumn, firstBlock, secondBlock, firstInside,
            secondInside;

        num = 1;
        nMinus = size - 1;
        nMiddle = parseInt(size / 2);
        nn = size * size + 1;

        osl = 0;
        switchRow = new Array();
        firstBlock = parseInt((size - 2) / 4);
        secondBlock = nMinus - firstBlock;
        firstInside = parseInt(size / 4);
        secondInside = nMinus - firstInside;
        for (i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
                if (i >= firstInside && i <= secondInside &&
                    j >= firstInside && j <= secondInside) {
                    square[i][j] = num;
                } else if ((i > firstBlock && i < secondBlock) ||
                           (j > firstBlock && j < secondBlock)) {
                    square[i][j] = nn - num;
                } else {
                    square[i][j] = num;
                }
                num++;
            }
        }
        if (size % 4 == 0) return;

        switchRow[0] = nMiddle;
        switchRow[1] = 0;
        lastSwitchColumn = 0;

        for (i = 0; i < nMiddle; i++) {
            if (i == firstBlock || i == secondBlock) {
                osl = 1 - osl;
                continue;
            }
            swap(secondBlock, i, secondBlock, nMinus - i);
            swap(i, firstBlock, nMinus - i, firstBlock);
            swap(i, secondBlock, nMinus - i, secondBlock);
            swap(i, switchRow[osl], nMinus - i, switchRow[osl]);
        }
        for (i = firstBlock + 1; i < secondBlock; i++) {
            swap(firstBlock, i, secondBlock, i);
            swap(i, firstBlock, i, secondBlock);
        }
        swap(firstBlock, nMiddle, secondBlock, nMiddle);
        swap(lastSwitchColumn, firstBlock, lastSwitchColumn, secondBlock);
    }

    function generateOdd() {
        var row, col, num, nn;

        num = 1;
        nn = parseInt(size * 3/2);
        for (row = 0; row < size; row++) {
            for (col = 0; col < size; col++) {
                square[(row*2-col+size) % size][(col-row+nn) % size] = num++;
            }
        }
    }
    // ******************** End Private Methods ******************** //
}
