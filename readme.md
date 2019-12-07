# Draw the magic line of magic squares

Uses SVG to draw the [magic line](http://recmath.org/Magic%20Squares/transform.htm#Magic%20Lines) traced by joining the integers of a magic square of order `n` in a sequence from `0-(n^2)-1`.

- accepts a string of numbers only if separated by **single spaces** (not double)
- accepts magic square strings where the lowest integer is either `0` or `1`

## TO DO: magic square checking

Use code from the [magic square checker](https://github.com/DaveEveritt/magic-square) for the following:

- [ ] remove non-numeric characters
- [ ] remove returns, line feeds
- [ ] remove duplicate spaces
- [ ] fix errors caused by strings without a single space separating numbers
- [ ] use Frénicle's rules to normalise each square (see below)

Frénicle established two simple rules to determine the [standard position](http://recmath.org/Magic%20Squares/transform.htm#Normalized%20position%20&%20Magic%20Lines) or order 4 squares, which can be used for any order:

- rotate the square until the smallest number in any corner is top left
- the second number in the top row must be lower than the first number in the second row

## TO DO: interface

- [x] swap between multi and single square
- [x] set padding between squares
- [x] set size of squares
- [x] set SVG fill in JavaScript
- [x] user input for fill colour
- [x] user input for line colour
- [ ] hide settings after drawing
- [x] hide settings for printing
- [x] printing stylesheet (order-4)
- [ ] progress bar (loading) for animate
- [ ] number squares fix mobile
- [ ] give choice of print sizes
- [ ] when numbers selected disable animate and stroke
- [ ] swap coordsArray x y
- [ ] merge js files into one
- [ ] set size of squares
- [ ] set fill-opacity/stroke-opacity="0.0" - "1.0"
- [ ] loop trhough colour change

## References

- [SVG Fills and Strokes (MDN)](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes)
- Possible use: [SVG++ library documentation](http://svgpp.org/index.html)

## Printing

22x40 order-4s will produce an even block.

---

Fania Raczinski and Dave Everitt
