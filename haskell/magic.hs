import Data.List
import ORDER4

-- BRUTE FORCE

order3 = [ 
  [a1,b1,c1, 
   a2,b2,c2, 
   a3,b3,c3] | 
      a1 <- [1..9],
      b1 <- [1..9] \\ [a1], 
      c1 <- [1..9] \\ [a1,b1], 
      a2 <- [1..9] \\ [a1,b1,c1],
      b2 <- [1..9] \\ [a1,b1,c1,a2], 
      c2 <- [1..9] \\ [a1,b1,c1,a2,b2], 
      a3 <- [1..9] \\ [a1,b1,c1,a2,b2,c2], 
      b3 <- [1..9] \\ [a1,b1,c1,a2,b2,c2,a3],
      c3 <- [1..9] \\ [a1,b1,c1,a2,b2,c2,a3,b3], 
      all (==15) [a1+b1+c1, a2+b2+c2, a3+b3+c3, -- rows
                  a1+a2+a3, b1+b2+b3, c1+c2+c3, -- cols
                  a1+b2+c3, c1+b2+a3]           -- diags
  ]


order4 = [ 
  [a1,b1,c1,d1, 
   a2,b2,c2,d2, 
   a3,b3,c3,d3, 
   a4,b4,c4,d4] | 
      a1 <- [1..16],
      b1 <- [1..16] \\ [a1], 
      c1 <- [1..16] \\ [a1,b1], 
      d1 <- [1..16] \\ [a1,b1,c1], 
      a2 <- [1..16] \\ [a1,b1,c1,d1],
      b2 <- [1..16] \\ [a1,b1,c1,d1,a2], 
      c2 <- [1..16] \\ [a1,b1,c1,d1,a2,b2], 
      d2 <- [1..16] \\ [a1,b1,c1,d1,a2,b2,c2], 
      a3 <- [1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2], 
      b3 <- [1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2,a3],
      c3 <- [1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2,a3,b3], 
      d3 <- [1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2,a3,b3,c3],
      a4 <- [1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2,a3,b3,c3,d3],
      b4 <- [1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2,a3,b3,c3,d3,a4],
      c4 <- [1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2,a3,b3,c3,d3,a4,b4], 
      d4 <- [1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2,a3,b3,c3,d3,a4,b4,c4],
      all (==34) [a1+b1+c1+d1, a2+b2+c2+d2, a3+b3+c3+d3, a4+b4+c4+d4, -- rows
                  a1+a2+a3+a4, b1+b2+b3+b4, c1+c2+c3+c4, d1+d2+d3+d4, -- cols
                  a1+b2+c3+d4, d1+c2+b3+a4]                           -- diags
  ]



-- SLIGHTLY MORE CLEVER

order3x = [ 
  [a1,b1,c1, 
   a2,b2,c2, 
   a3,b3,c3] | 
    a1 <-  [1..9],
    b1 <- ([1..9] \\ [a1]), b1<(15-a1), 
    c1 <- ([1..9] \\ [a1,b1]), c1<(15-a1+b1), 15==a1+b1+c1,
    a2 <- ([1..9] \\ [a1,b1,c1]), a2<(15-a1),
    b2 <- ([1..9] \\ [a1,b1,c1,a2]), b2<(15-a2), b2<(15-b1), b2<(15-a1), b2<(15-c1),
    c2 <- ([1..9] \\ [a1,b1,c1,a2,b2]), c2<(15-a2+b2), c2<(15-c1), 15==a2+b2+c2,
    a3 <- ([1..9] \\ [a1,b1,c1,a2,b2,c2]), a3<(15-a1+a2), a3<(15-c1+b2), 15==a1+a2+a3, 15==a3+b2+c1,
    b3 <- ([1..9] \\ [a1,b1,c1,a2,b2,c2,a3]), b3<(15-a3), b3<(15-b1+b2), 15==b1+b2+b3,
    c3 <- ([1..9] \\ [a1,b1,c1,a2,b2,c2,a3,b3]), c3<(15-a3+b3), c3<(15-c1+c2), c3<(15-a1+b2), 15==a3+b3+c3, 15==c1+c2+c3, 15==a1+b2+c3
  ]




-- http://archive.oreilly.com/oreillyschool/courses/data-structures-algorithms/bruteForce.html
-- https://youtu.be/_uQCgss-aB4
-- https://monoid.xyz/posts/magicsquares1

-- -fno-full-laziness

-- compile: 
-- ghc magic -O2 -prof
-- -fllvm ?


-- run:
-- ./magic -RTS


order4x = [ 
  [a1,b1,c1,d1, 
   a2,b2,c2,d2, 
   a3,b3,c3,d3, 
   a4,b4,c4,d4] |
      a1 <-  [1..16],
      b1 <- ([1..16] \\ [a1]), b1<(34-a1),
      c1 <- ([1..16] \\ [a1,b1]), c1<(34-a1+b1),
      d1 <- ([1..16] \\ [a1,b1,c1]), d1<(34-a1+b1+c1), 34==a1+b1+c1+d1,
      a2 <- ([1..16] \\ [a1,b1,c1,d1]), a2<(34-a1),
      b2 <- ([1..16] \\ [a1,b1,c1,d1,a2]), b2<(34-a2), b2<(34-b1), b2<(34-a1),
      c2 <- ([1..16] \\ [a1,b1,c1,d1,a2,b2]), c2<(34-a2+b2), c2<(34-c1), c2<(34-d1),
      d2 <- ([1..16] \\ [a1,b1,c1,d1,a2,b2,c2]), d2<(34-a2+b2+c2), d2<(34-d1), 34==a2+b2+c2+d2,
      a3 <- ([1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2]), a3<(34-a1+a2),
      b3 <- ([1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2,a3]), b3<(34-a3), b3<(34-b1+b2), b3<(34-d1+c2),
      c3 <- ([1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2,a3,b3]), c3<(34-a3+b3), c3<(34-c1+c2), c3<(34-a1+b2),
      d3 <- ([1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2,a3,b3,c3]), d3<(34-a3+b3+c3), d3<(34-d1+d2), 34==a3+b3+c3+d3,
      a4 <- ([1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2,a3,b3,c3,d3]), a4<(34-a1+a2+a3), a4<(34-d1+c2+b3), 34==a1+a2+a3+a4, 34==d1+c2+b3+a4,
      b4 <- ([1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2,a3,b3,c3,d3,a4]), b4<(34-a4), b4<(34-b1+b2+b3), 34==b1+b2+b3+b4,
      c4 <- ([1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2,a3,b3,c3,d3,a4,b4]), c4<(34-a4+b4), c4<(34-c1+c2+c3), 34==c1+c2+c3+c4,
      d4 <- ([1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2,a3,b3,c3,d3,a4,b4,c4]), d4<(34-a4+b4+c4), d4<(34-d1+d2+d3), d4<(34-a1+b2+c3), 34==a4+b4+c4+d4, 34==d1+d2+d3+d4, 34==a1+b2+c3+d4
  ]


-- REDUCERS
-- identity, mirrorLR, mirrorUD, mirrorD1, mirrorD2, rotate90,  rotate180, rotate-90
-- ORDER 3
mirrorLR3  [a1,a2,a3,b1,b2,b3,c1,c2,c3] = [a3,a2,a1,b3,b2,b1,c3,c2,c1]
mirrorUD3  [a1,a2,a3,b1,b2,b3,c1,c2,c3] = [c1,c2,c3,b1,b2,b3,a1,a2,a3]
mirrorD13  [a1,a2,a3,b1,b2,b3,c1,c2,c3] = [a1,b1,c1,a2,b2,c2,a3,b3,c3]
mirrorD23  [a1,a2,a3,b1,b2,b3,c1,c2,c3] = [c3,b3,a3,c2,b2,a2,c1,b1,a1]
rotate903  [a1,a2,a3,b1,b2,b3,c1,c2,c3] = [c1,b1,a1,c2,b2,a2,c3,b3,a3]
rotate1803 [a1,a2,a3,b1,b2,b3,c1,c2,c3] = [c3,c2,c1,b3,b2,b1,a3,a2,a1]
rotateM903 [a1,a2,a3,b1,b2,b3,c1,c2,c3] = [a3,b3,c3,a2,b2,c2,a1,b1,c1]

-- ORDER 4
mirrorLR  [a1,a2,a3,a4,b1,b2,b3,b4,c1,c2,c3,c4,d1,d2,d3,d4] = 
          [a4,a3,a2,a1,b4,b3,b2,b1,c4,c3,c2,c1,d4,d3,d2,d1]
mirrorUD  [a1,a2,a3,a4,b1,b2,b3,b4,c1,c2,c3,c4,d1,d2,d3,d4] = 
          [d1,d2,d3,d4,c1,c2,c3,c4,b1,b2,b3,b4,a1,a2,a3,a4]
mirrorD1  [a1,a2,a3,a4,b1,b2,b3,b4,c1,c2,c3,c4,d1,d2,d3,d4] = 
          [a1,b1,c1,d1,a2,b2,c2,d2,a3,b3,c3,d3,a4,b4,c4,d4]
mirrorD2  [a1,a2,a3,a4,b1,b2,b3,b4,c1,c2,c3,c4,d1,d2,d3,d4] = 
          [d4,c4,b4,a4,d3,c3,b3,a3,d2,c2,b2,a2,d1,c1,b1,a1]
rotate90  [a1,a2,a3,a4,b1,b2,b3,b4,c1,c2,c3,c4,d1,d2,d3,d4] = 
          [d1,c1,b1,a1,d2,c2,b2,a2,d3,c3,b3,a3,d4,c4,b4,a4]
rotate180 [a1,a2,a3,a4,b1,b2,b3,b4,c1,c2,c3,c4,d1,d2,d3,d4] = 
          [d4,d3,d2,d1,c4,c3,c2,c1,b4,b3,b2,b1,a4,a3,a2,a1]
rotateM90 [a1,a2,a3,a4,b1,b2,b3,b4,c1,c2,c3,c4,d1,d2,d3,d4] = 
          [a4,b4,c4,d4,a3,b3,c3,d3,a2,b2,c2,d2,a1,b1,c1,d1]

transform3 :: [Int] -> [[Int]]
transform3 ns = [ns,
                mirrorLR3 ns,
                mirrorUD3 ns,
                mirrorD13 ns,
                mirrorD23 ns,
                rotate903 ns,
                rotate1803 ns,
                rotateM903 ns]

transform :: [Int] -> [[Int]]
transform ns = [ns,
                mirrorLR ns,
                mirrorUD ns,
                mirrorD1 ns,
                mirrorD2 ns,
                rotate90 ns,
                rotate180 ns,
                rotateM90 ns]


reduceD43 :: [[Int]] -> [[Int]]
reduceD43 [] = []
reduceD43 (n:ns) = n : reduceD43 (ns \\ (tail $ transform3 n))


reduceD4 :: [[Int]] -> [[Int]]
reduceD4 [] = []
reduceD4 (n:ns) = n : reduceD4 (ns \\ (tail $ transform n))


main = do
  -- print $ length order4
  -- print order4x
  -- print $ transform $ head order4x
  -- print $ order3x
  -- print $ transform3 $ head order3x
  -- print $ reduceD43 order3x
  -- print $ length $ reduceD4 ORDER4.order4s
  print $ reduced == (sort suzuki)