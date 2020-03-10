import Data.List


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
    c1 <- ([1..9] \\ [a1,b1]), c1<(15-a1+b1),
    a2 <- ([1..9] \\ [a1,b1,c1]), a2<(15-a1),
    b2 <- ([1..9] \\ [a1,b1,c1,a2]), b2<(15-a2), b2<(15-b1), b2<(15-a1), b2<(15-c1),
    c2 <- ([1..9] \\ [a1,b1,c1,a2,b2]), c2<(15-a2+b2), c2<(15-c1),
    a3 <- ([1..9] \\ [a1,b1,c1,a2,b2,c2]), a3<(15-a1+a2), a3<(15-c1+b2),
    b3 <- ([1..9] \\ [a1,b1,c1,a2,b2,c2,a3]), b3<(15-a3), b3<(15-b1+b2),
    c3 <- ([1..9] \\ [a1,b1,c1,a2,b2,c2,a3,b3]), c3<(15-a3+b3), c3<(15-c1+c2), c3<(15-a1+b2),
    all (==15) [a1+b1+c1, a2+b2+c2, a3+b3+c3, -- rows
                a1+a2+a3, b1+b2+b3, c1+c2+c3, -- cols
                a1+b2+c3, c1+b2+a3]           -- diags
  ]


-- http://archive.oreilly.com/oreillyschool/courses/data-structures-algorithms/bruteForce.html
-- https://youtu.be/_uQCgss-aB4
-- https://monoid.xyz/posts/magicsquares1

-- -fno-full-laziness
-- -O2 -fllvm

-- compile: 
-- ghc magic -O2 -fllvm -prof

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
      d1 <- ([1..16] \\ [a1,b1,c1]), d1<(34-a1+b1+c1),
      a2 <- ([1..16] \\ [a1,b1,c1,d1]), a2<(34-a1),
      b2 <- ([1..16] \\ [a1,b1,c1,d1,a2]), b2<(34-a2), b2<(34-b1), b2<(34-a1),
      c2 <- ([1..16] \\ [a1,b1,c1,d1,a2,b2]), c2<(34-a2+b2), c2<(34-c1), c2<(34-d1),
      d2 <- ([1..16] \\ [a1,b1,c1,d1,a2,b2,c2]), d2<(34-a2+b2+c2), d2<(34-d1),
      a3 <- ([1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2]), a3<(34-a1+a2),
      b3 <- ([1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2,a3]), b3<(34-a3), b3<(34-b1+b2), b3<(34-d1+c2),
      c3 <- ([1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2,a3,b3]), c3<(34-a3+b3), c3<(34-c1+c2), c3<(34-a1+b2),
      d3 <- ([1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2,a3,b3,c3]), d3<(34-a3+b3+c3), d3<(34-d1+d2),
      a4 <- ([1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2,a3,b3,c3,d3]), a4<(34-a1+a2+a3), a4<(34-d1+c2+b3),
      b4 <- ([1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2,a3,b3,c3,d3,a4]), b4<(34-a4), b4<(34-b1+b2+b3),
      c4 <- ([1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2,a3,b3,c3,d3,a4,b4]), c4<(34-a4+b4), c4<(34-c1+c2+c3),
      d4 <- ([1..16] \\ [a1,b1,c1,d1,a2,b2,c2,d2,a3,b3,c3,d3,a4,b4,c4]), d4<(34-a4+b4+c4), d4<(34-d1+d2+d3), d4<(34-a1+b2+c3),
      all (==34) [a1+b1+c1+d1, a2+b2+c2+d2, a3+b3+c3+d3, a4+b4+c4+d4, -- rows
                  a1+a2+a3+a4, b1+b2+b3+b4, c1+c2+c3+c4, d1+d2+d3+d4, -- cols
                  a1+b2+c3+d4, d1+c2+b3+a4]                           -- diags
  ]




main = do
  -- print $ length order4
  print order3x