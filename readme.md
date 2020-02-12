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
- [ ] give choice of print sizes
- [ ] set fill-opacity/stroke-opacity="0.0" - "1.0"
- [ ] loop through colour change
- [ ] progress bar (loading) for animate
- [ ] clean up unused stuff
- [ ] refactor for node ?


## URGENT

- [ ] broken filter for order >= 7
- [ ] check animation for >= order 7

## References

- [SVG Fills and Strokes (MDN)](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes)
- Possible use: [SVG++ library documentation](http://svgpp.org/index.html)

## Printing

22x40 order-4s will produce an even block.

---

Fania Raczinski and Dave Everitt
