# Draw the magic line of a single magic square

Uses SVG to draw the magic line traced by joining the integers of a magic square of order `n` in a sequence from `0-(n^2)-1`.

- accepts a string of numbers only if separated by **single spaces** (not double)
- accepts magic square strings where the lowest integer is either `0` or `1`

Sample for demo:

22 21 24 25 06 07 20 23 27 26 05 04 03 00 17 16 35 34 01 02 19 18 33 32 31 30 08 09 12 15 28 29 10 11 14 13

## Further development

Fix errors caused by strings without a single space separating numbers:

- remove non-numeric characters
- remove returns, line feeds
- remove duplicate spaces

---

Fania Raczinski and Dave Everitt
