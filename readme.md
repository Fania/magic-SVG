# Drawing the magic line of magic squares

Uses SVG to draw the [magic line](http://recmath.org/Magic%20Squares/transform.htm#Magic%20Lines) traced by joining the integers of a magic square of order `n` in a sequence from `0-(n^2)-1`.

- accepts a string of numbers only if separated by **single spaces** (not double)
- accepts magic square strings where the lowest integer is either `0` or `1`


## TODO: magic square checking

Use code from the [magic square checker](https://github.com/DaveEveritt/magic-square) for the following:

- [x] remove non-numeric characters
- [ ] remove returns, line feeds
- [ ] remove duplicate spaces
- [ ] fix errors caused by strings without a single space separating numbers
- [ ] use Frénicle's rules to normalise each square (see below)
- [ ] finish adding and checking pandiagonal order 5 set
- [ ] if contains '0' `arr.map(x => x + 1)`


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
- [x] run line length filter on full set of 7040 squares
- [x] give choice of print sizes
- [x] not super happy with print styles
- [x] check mobile styles (reduce margins)
- [x] regenerate arcs in new style/ both styles?
- [x] fix single input for squares not already catalogued
- [x] generate animations for larger orders 10 - 20
- [ ] set fill-opacity/stroke-opacity="0.0" - "1.0"
- [ ] loop through colour change
- [ ] progress bar (loading) for animate
- [ ] clean up unused stuff
- [ ] refactor for node ?
- [ ] add settings to localstorage
- [ ] change font size for larger order squares
- [ ] fix arc size to match natural size
- [ ] add our own transformations
- [ ] add dataset option
- [ ] allow ranges in single input
- [ ] add options for (odd, even, odd-even) classes
- [ ] add option for groups (I-XII)
- [ ] resize number svgs to fit properly


## URGENT

- [ ] allow comma separated strings for single-input







# Theory


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
- https://archive.org/details/mathematicalrecr0000krai/page/10#maincontent
- https://archive.org/details/DeOccultaPhilosophiaLoc1533/page/n163/mode/2up
- http://esotericarchives.com/agrippa/agrippa2.htm#contents
- (H.E. Dudeney "Amusements in Mathematics" 1917)[https://www.gutenberg.org/files/16713/16713-h/16713-h.htm]


## Order

Frénicle established two simple rules to determine the [standard position](http://recmath.org/Magic%20Squares/transform.htm#Normalized%20position%20&%20Magic%20Lines) or order 4 squares, which can be used for any order:

- rotate the square until the smallest number in any corner is top left
- the second number in the top row must be lower than the first number in the second row

This is different to the order we employ which is normal numerical order given by the generation algorithm in Haskell.


## Classification

- **Semi-magic**: rows & columns = magic constant
- **Simple** rows & columns & two diagonals = magic constant
- **Self-complementary** complementary = rotated / reflected copy
- **Associative/symmetric** every number added to the number equidistant, in a straight line, from the center gives n2 + 1. Do not exist for squares of singly even order. All associated magic squares are self-complementary magic squares as well.
- **Pandiagonal/panmagic/perfect** rows & columns & two diagonals & broken diagonals = magic constant. Do not exist for singly even orders.
- **Ultra** associative and pandiagonal. Only for orders n ≥ 5.
- **Bordered** remains magic when the rows and columns at the outer edge is removed. They are also called concentric bordered magic squares if removing a border of a square gives another smaller bordered magic square. Only for orders  n ≥ 5.
- **Composite** can be partitioned into smaller magic subsquares, wholly or partly, which may or may not overlap with each other. By this definition, bordered magic squares are also composite magic squares.
- **Most-perfect** magic square when it is a pandiagonal magic square with two further properties (i) each 2×2 subsquare add to 1/k of the magic constant where n = 4k, and (ii) all pairs of integers distant n/2 along any diagonal (major or broken) are complementary (i.e. they sum to n2 + 1). Only for squares of doubly even order. All pandiagonal squares of order 4 are also most perfect.
- **Multimagic** remains magic even if all its numbers are replaced by their k-th power for 1 ≤ k ≤ P. They are also known as P-multimagic square or satanic squares. They are also referred to as bimagic squares, trimagic squares, tetramagic squares, pentamagic squares when the value of P is 2, 3, 4, and 5 respectively.


## Transformation

D4 rotations and reflections are considered trivial.

**Dihedral Group D4 / Octic Group**

1. R0 identity
2. R1 rotation 90° anticlockwise
3. R2 rotation 180°
4. R3 rotation 90° clockwise
5. M1 vertical symmetry
6. M2 horizontal symmetry
7. D1 symmetry about the first diagonal
8. D2 symmetry about the second diagonal



### Gaspalou's 32 transformations
https://www.gaspalou.fr/magic-squares/order-4.htm#1

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



other sets:

http://www.magic-squares.net/order4lista.htm



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



OUR SET OF TRANSFORMATIONS

- identity
- mirrorLR
- mirrorUD
- mirrorDiag1
- mirrorDiag2
- rotate90
- rotate-90
- rotate180





	Wed Mar 11 09:41 2020 Time and Allocation Profiling Report  (Final)

	   magic.exe +RTS -p -RTS

	total time  =     5812.00 secs   (5812004 ticks @ 1000 us, 1 processor)
	total alloc = 11,027,078,141,904 bytes  (excludes profiling overheads)




## Classification

Moran, J. (1982) The Wonders of Magic Squares. New York: Random House.

Lines join complementary numbers.


**6 Purebred & fertile**:

!(Hera: Group I)[C:\Users\Fania\Dropbox\us\magic-square-art\EVA2020\images\groupI.svg]

!(Asteria: Group II)[C:\Users\Fania\Dropbox\us\magic-square-art\EVA2020\images\groupII.svg]

!(Niobe: Group III)[C:\Users\Fania\Dropbox\us\magic-square-art\EVA2020\images\groupIII.svg]

!(Elara: Group IV)[C:\Users\Fania\Dropbox\us\magic-square-art\EVA2020\images\groupIV.svg]

!(Hestia: Group V)[C:\Users\Fania\Dropbox\us\magic-square-art\EVA2020\images\groupV.svg]

!(Demeter: Group VI)[C:\Users\Fania\Dropbox\us\magic-square-art\EVA2020\images\groupVI.svg]



**6 Hybrid & sterile**:

!(Arges: Group VII)[C:\Users\Fania\Dropbox\us\magic-square-art\EVA2020\images\groupVII.svg]

!(Moros: Group VIII)[C:\Users\Fania\Dropbox\us\magic-square-art\EVA2020\images\groupVIII.svg]

!(Thaumas: Group IX)[C:\Users\Fania\Dropbox\us\magic-square-art\EVA2020\images\groupIX.svg]

!(Nemesis: Group X)[C:\Users\Fania\Dropbox\us\magic-square-art\EVA2020\images\groupX.svg]

!(Cottus: Group XI)[C:\Users\Fania\Dropbox\us\magic-square-art\EVA2020\images\groupXI.svg]

!(Eris: Group XII)[C:\Users\Fania\Dropbox\us\magic-square-art\EVA2020\images\groupXII.svg]













---

Fania Raczinski and Dave Everitt
