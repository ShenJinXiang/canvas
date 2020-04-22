/*
x: r * 16 * Math.pow(Math.sin(θ), 3),
y: -r * (13 * Math.cos(θ)- 5 * Math.cos(2 * θ) - 2 * Math.cos(3 * θ) - Math.cos(4 * θ) )

13 * cosθ              5 * cos2θ            2 * cos3θ                cos4θ
--------------  -  ------------------ - ---------------------- - -------------------
16 * sinθ ^ 3        16 * sinθ ^ 3          16 * sinθ ^ 3               16 * sinθ ^ 3



    13    cosA
1:  -- * ---------
    16   sinA ^ 3

       5     cosA ^ 2      5        1
2:  - --- * --------   + ------ * ------
      16   sinA ^ 3       16      sinA

       2      4 * cosA ^ 3 - 3 * cosA         8     cosA ^ 3       6          conA
3: - ----- * -------------------------  ==> - --- * ------------ + ----- * ----------------
      16      sinA ^ 3                        16     sinA ^ 3       16        sinA ^ 3


      1     1 - 8×cosA^2   + 8×cosA^4             1       1           8      cosA ^ 2       8      cosA ^ 4
4: - ---- * ---------------------------  ==>  - ---- * ----------- + --- * ------------- - ---- * -------------------
     16      sinA ^ 3                            16      sinA ^ 3     16      sinA ^ 3      16      sinA ^ 3


         1
X = -------------
      sinA ^ 3

         cosA
y = ----------------
       sinA ^ 3

        cosA ^ 2
z = -------------
       sinA ^ 3

         consA ^ 3
w = -------------------
        sinA ^ 3


         cosA ^ 4
h = ----------------
         sinA ^ 3

          1
i = ---------------
         sinA

  3          5           5            8             6           1           8          8
 --- * y - ----- * z + ------ * i - ------- * w  + ----- * y - ---- * x + ----- * z - ---- * h
  16        16           16           16            16          16          16         16

   1         9        3          8         8      5
- ---  x + ---  y +  ---  z + - ---  w - --- h + --- i
   16        16       16         16        16    16

   1       1          9      cosA        3     cosA ^ 2      8     cosA ^ 3     8     cosA ^ 4      5     1
- --- -----------  + --- ------------ + --- -----------   - --- ------------ - --- ------------- + --- ----------
   16  sinA ^ 3       16  sinA ^ 3       16    sinA ^ 3      16    sinA ^ 3     16    sinA ^ 3      16   sinA


   1   sinA ^ 2 + cosA^2       9      cosA        3     cosA ^ 2      8     cosA ^ 3     8     cosA ^ 4      5     1
- --- --------------------  + --- ------------ + --- -----------   - --- ------------ - --- ------------- + --- ----------
   16       sinA ^ 3          16  sinA ^ 3       16    sinA ^ 3      16    sinA ^ 3     16    sinA ^ 3      16   sinA

   1   sinA ^ 2                9      cosA        2     cosA ^ 2      8     cosA ^ 3     8     cosA ^ 4      5     1
- --- --------------------  + --- ------------ + --- -----------   - --- ------------ - --- ------------- + --- ----------
   16       sinA ^ 3          16  sinA ^ 3       16    sinA ^ 3      16    sinA ^ 3     16    sinA ^ 3      16   sinA

  9      cosA        2     cosA ^ 2      8     cosA ^ 3     8     cosA ^ 4      4     1
 --- ------------ + --- -----------   - --- ------------ - --- ------------- + --- ----------
 16  sinA ^ 3       16    sinA ^ 3      16    sinA ^ 3     16    sinA ^ 3      16   sinA
 */

/*


sin3A = 3sinA-4(sinA)^3; 

3sinA - sin3A
 */