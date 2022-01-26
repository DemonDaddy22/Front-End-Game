<h1 align="center">Front-End-Game</h1>

![GitHub last commit](https://img.shields.io/github/last-commit/demondaddy22/front-end-game?color=%23445397&style=for-the-badge)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/demondaddy22/front-end-game?color=%23DD2266&style=for-the-badge)
![GitHub repo size](https://img.shields.io/github/repo-size/demondaddy22/front-end-game?color=%235EB2AA&style=for-the-badge)

This repository consists of various UI exercises which are frequently asked in machine coding rounds of Frontend interviews. If you want to practice along, you can fork the repository and start practising by adding your solutions to the already added projects, or by creating a new project. Please follow the guidelines specified in [PROJECT.md](/docs/PROJECT.md).

List of projects added so far:

-   [Sudoku](/src/Sudoku) -> Implement a 9x9 Sudoku puzzle with the following conditions

    -   user can perform operations like undo and redo
    -   a reset button to reset the game
    -   track number of moves
    -   state of the game needs to be persisted

-   [Star Ratings](/src/StarRatings) -> Create [star rating](https://github.com/devkodeio/the-dom-challenge/blob/main/star-rating/README.md) utility

    -   Default state must display n unfilled stars
    -   On hovering over any star, all the stars before that star and that star must get filled till the mouse is over the star
    -   On clicking a star, all the stars before that star and that star must get filled

-   [Pixel Art](/src/PixelArt) -> Implement [pixel art](https://github.com/devkodeio/the-dom-challenge/blob/main/pixel-art/README.md) board with the following conditions

    -   user can select a colour from colour palette
    -   on clicking an empty cell, selected colour gets filled in the cell
    -   on dragging over the cells, a constant faded colour gets filled in the cells

-   [Chess Board](/src/ChessBoard) -> Create [chess board](https://github.com/devkodeio/the-dom-challenge/blob/main/chess-board/README.md) exercise

    -   Create the board using JavaScript
    -   On clicking a block, all the blocks on both the diagonals should get highlighted

-   [Color Spotter](/src/ColorSpotter) -> Create [color spotter](https://github.com/devkodeio/the-dom-challenge/blob/main/color-spotter/README.md) game

    -   Create the game board using JavaScript
    -   On clicking the odd coloured cell, increment the score and increase board size by 1
    -   On clicking any other cell, reset the score and board size to 4

-   [Progress Bar](/src/ProgressBar) -> Create [progress bar](https://github.com/devkodeio/the-dom-challenge/blob/main/progress-bar/README.md) exercise

    -   Create the progress bar exercise using JavaScript
    -   On clicking the run button, progress bar should transition from start to end
    -   On clicking the button multiple times, the progress animation should get queued
