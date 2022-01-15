# Chess Board

## By [DemonDaddy22](https://github.com/DemonDaddy22/)

-   Implemented the solution in VanillaJS
-   Took about 80 minutes to complete the exercise
-   Thought of implementing the solution in *three* different ways
    1.  Iterating over the entire chess board everytime and toggling the classes of blocks which fall on both the diagonals
    2.  Starting from the clicked block, first going towards one corner and toggling the classes of the blocks on the path. Similarly, for other three paths.
    3.  Finding the corner points of both the diagonals, then traversing just once for each diagonal from corner to corner.
-   Implemented the solution of third approach
