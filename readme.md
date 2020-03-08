# Draw the magic line of magic squares

Uses SVG to draw the [magic line](http://recmath.org/Magic%20Squares/transform.htm#Magic%20Lines) traced by joining the integers of a magic square of order `n` in a sequence from `0-(n^2)-1`.

- accepts a string of numbers only if separated by **single spaces** (not double)
- accepts magic square strings where the lowest integer is either `0` or `1`

## TODO: magic square checking

Use code from the [magic square checker](https://github.com/DaveEveritt/magic-square) for the following:

- [ ] remove non-numeric characters
- [ ] remove returns, line feeds
- [ ] remove duplicate spaces
- [ ] fix errors caused by strings without a single space separating numbers
- [ ] use Frénicle's rules to normalise each square (see below)
- [ ] finish adding and checking pandiagonal order 5 set
- [ ] if contains '0' `arr.map(x => x + 1)`

Frénicle established two simple rules to determine the [standard position](http://recmath.org/Magic%20Squares/transform.htm#Normalized%20position%20&%20Magic%20Lines) or order 4 squares, which can be used for any order:

- rotate the square until the smallest number in any corner is top left
- the second number in the top row must be lower than the first number in the second row

## TODO: interface

- [x] swap between multi and single square
- [x] set padding between squares
- [x] set size of squares
- [x] set SVG fill in JavaScript
- [x] user input for fill colour
- [x] user input for line colour
- [x] when numbers selected disable animate and stroke
- [x] hide settings for printing
- [x] printing stylesheet (order-4)
- [x] fix padding trigger
- [x] number squares fix mobile
- [x] fix color swapping issues (fill transparency)
- [x] swap coordsArray x y
- [x] merge js files into one
- [x] set size of squares
- [x] write library of helper function for hardcoding
- [x] hardcode lengths
- [x] redesign menu
- [x] hide settings after drawing
- [x] filters
- [x] use new index4new
- [x] filters page broken (populateOptions) (use new index only)
- [x] error message / disable numbers in filterGroups
- [x] give option of inputting numbers of squares
- [x] single input animations broken/disabled
- [x] add day/night mode
- [x] fix slowness of load due to massive index file
- [x] add about/info page
- [x] broken filter for order >= 7
- [x] fix print styles for all orders
- [x] check animation for >= order 7
- [ ] give choice of print sizes
- [ ] set fill-opacity/stroke-opacity="0.0" - "1.0"
- [ ] loop through colour change
- [ ] progress bar (loading) for animate
- [ ] clean up unused stuff
- [ ] refactor for node ?
- [ ] not super happy with print styles
- [ ] check mobile styles (reduce margins)
- [ ] add settings to localstorage
- [ ] change font size for larger order squares
- [ ] fix arc size to match natural size
- [ ] add our own transformations

## URGENT

- [ ] fix single input for squares not already catalogued
- [ ] generate animations for larger orders 10 - 20



## References

- [SVG Fills and Strokes (MDN)](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes)
- Possible use: [SVG++ library documentation](http://svgpp.org/index.html)




## Theory


- http://www.multimagie.com/
- https://www.gaspalou.fr/magic-squares/transformation.htm
- https://www.grogono.com/magic/4x4.php
- https://www.cs.umb.edu/~eb/d4/index.html
- https://en.wikipedia.org/wiki/Dihedral_group
- https://www.primepuzzles.net/thepuzzlers/Mutsumi%20Suzuki's%20Magic%20Squares%20Web%20Pages.pdf
- http://www.magic-squares.net/transform.htm
- http://recmath.org/Magic%20Squares/
- http://www.magic-squares.net/order4listc.htm
- http://www.magic-squares.net/downloads.htm



**Dihedral Group D4**

**8 transformations**

1. R0 identity
2. R1 rotation 90° anticlockwise
3. R2 rotation 180°
4. R3 rotation 90° clockwise
5. M1 vertical symmetry
6. M2 horizontal symmetry
7. D1 symmetry about the first diagonal
8. D2 symmetry about the second diagonal



or taken from https://www.gaspalou.fr/magic-squares/order-4.htm#1


1. I identity
2. R1 rotation 90° anticlockwise
3. R2 rotation 180°
4. R3 rotation 90° clockwise
5. V vertical symmetry
6. H horizontal symmetry
7. G symmetry about the first diagonal
8. D symmetry about the second diagonal



### Gaspalou's 32 transformations

I: 
A1 A2 A3 A4 
B1 B2 B3 B4 
C1 C2 C3 C4 
D1 D2 D3 D4

V:
A4 A3 A2 A1
B4 B3 B2 B1
C4 C3 C2 C1
D4 D3 D2 D1

H:
D1 D2 D3 D4
C1 C2 C3 C4
B1 B2 B3 B4
A1 A2 A3 A4

G:
A1 B1 C1 D1
A2 B2 C2 D2
A3 B3 C3 D3
A4 B4 C4 D4

D:
D4 C4 B4 A4
D3 C3 B3 A3
D2 C2 B2 A2
D1 C1 B1 A1

R1:
A4 B4 C4 D4
A3 B3 C3 D3
A2 B2 C2 D2
A1 B1 C1 D1

R2:
D4 D3 D2 D1
C4 C3 C2 C1
B4 B3 B2 B1
A4 A3 A2 A1

R3:
D1 C1 B1 A1
D2 C2 B2 A2
D3 C3 B3 A3
D4 C4 B4 A4

IT: 
A1 A3 A2 A4
C1 C3 C2 C4
B1 B3 B2 B4
D1 D3 D2 D4

EX:
D4 D2 D3 D1
B4 B2 B3 B1
C4 C2 C3 C1
A4 A2 A3 A1

M:
A1 C1 B1 D1
A3 C3 B3 D3
A2 C2 B2 D2
A4 C4 B4 D4

N:
D4 B4 C4 A4
D2 B2 C2 A2
D3 B3 C3 A3
D1 B1 C1 A1

X:
A4 A2 A3 A1
C4 C2 C3 C1
B4 B2 B3 B1
D4 D2 D3 D1

Y:
D1 D3 D2 D4
B1 B3 B2 B4
C1 C3 C2 C4
A1 A3 A2 A4

Z:
A4 C4 B4 D4
A2 C2 B2 D2
A3 C3 B3 D3
A1 C1 B1 D1

T:
D1 B1 C1 A1
D3 B3 C3 A3
D2 B2 C2 A2
D4 B4 C4 A4

A: 
B2 B1 B4 B3
A2 A1 A4 A3
D2 D1 D4 D3
C2 C1 C4 C3

V*A:
B3 B4 B1 B2
A3 A4 A1 A2
D3 D4 D1 D2
C3 C4 C1 C2

H*A:
C2 C1 C4 C3
D2 D1 D4 D3
A2 A1 A4 A3
B2 B1 B4 B3

G*A:
B2 A2 D2 C2
B1 A1 D1 C1
B4 A4 D4 C4
B3 A3 D3 C3

D*A:
C3 D3 A3 B3
C4 D4 A4 B4
C1 D1 A1 B1
C2 D2 A2 B2

R1*A:
B3 A3 D3 C3
B4 A4 D4 C4
B1 A1 D1 C1
B2 A2 D2 C2

R2*A:
C3 C4 C1 C2
D3 D4 D1 D2
A3 A4 A1 A2
B3 B4 B1 B2

R3*A:
C2 D2 A2 B2
C1 D1 A1 B1
C4 D4 A4 B4
C3 D3 A3 B3

IT*A: 
C3 C1 C4 C2
A3 A1 A4 A2
D3 D1 D4 D2
B3 B1 B4 B2

EX*A:
B2 B4 B1 B3
D2 D4 D1 D3
A2 A4 A1 A3
C2 C4 C1 C3

M*A:
C3 A3 D3 B3
C1 A1 D1 B1
C4 A4 D4 B4
C2 A2 D2 B2

N*A:
B2 D2 A2 C2
B4 D4 A4 C4
B1 D1 A1 C1
B3 D3 A3 C3

X*A: 
C2 C4 C1 C3
A2 A4 A1 A3
D2 D4 D1 D3
B2 B4 B1 B3

Y*A:
B3 B1 B4 B2
D3 D1 D4 D2
A3 A1 A4 A2
C3 C1 C4 C2

Z*A:
C2 A2 D2 B2
C4 A4 D4 B4
C1 A1 D1 B1
C3 A3 D3 B3

T*A:
B3 D3 A3 C3
B1 D1 A1 C1
B4 D4 A4 C4
B2 D2 A2 C2





### Tests

square 9 + 13 order 4

A1 A2 A3 A4
B1 B2 B3 B4
C1 C2 C3 C4
D1 D2 D3 D4

A2 A1 A4 A3
B2 B1 B4 B3
D2 D1 D4 D3
C2 C1 C4 C3










---

Fania Raczinski and Dave Everitt
