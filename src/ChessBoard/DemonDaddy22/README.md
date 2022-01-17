# Chess Board

## By [DemonDaddy22](https://github.com/DemonDaddy22/)

-   Implemented the solution in VanillaJS
-   Took about 80 minutes to complete the exercise
-   Thought of implementing the solution in _three_ different ways
    1.  Iterating over the entire chess board everytime and toggling the classes of blocks which fall on both the diagonals
    2.  Starting from the clicked block, first going towards one corner and toggling the classes of the blocks on the path. Similarly, for other three paths.
    3.  Finding the corner points of both the diagonals, then traversing just once for each diagonal from corner to corner.
-   Implemented the solution of third approach

<p align='left'>
    <img width="450" height="450" alt="Screenshot 2022-01-15 at 6 53 52 PM" src="https://user-images.githubusercontent.com/39908472/149623748-c79d94c6-0ab0-40ec-9931-1d8b9130e0d8.png">
    <img width="450" height="450" alt="Screenshot 2022-01-15 at 6 54 07 PM" src="https://user-images.githubusercontent.com/39908472/149623753-40822e8b-691c-4169-9ffc-8a65feccda24.png">
</p>
