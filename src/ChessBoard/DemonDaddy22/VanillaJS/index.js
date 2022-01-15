(function () {
    const chessBoard = document.getElementById('chess-board');
    const BOARD_SIZE = 8;
    let lastClickBlock = null;
    let chessBoardBlocks = [];

    // create chess board
    for (let i = 0; i < BOARD_SIZE; i++) {
        const row = document.createElement('div');
        row.classList.add('chess-board-row');
        for (let j = 0; j < BOARD_SIZE; j++) {
            const block = document.createElement('div');
            block.classList.add('block');
            block.dataset.row = i;
            block.dataset.col = j;
            row.append(block);
        }
        chessBoard.append(row);
        chessBoardBlocks = [...chessBoardBlocks, ...row.childNodes];
    }

    // diagonal traversal helper
    const diagonalTraversal = (row, col, highlightPath = true) => {
        // math.min(i, j), subtract min from both, whichever becomes 0,
        // start from there and add 1 to both
        // for diagonal 1 (\)
        const min = Math.min(row, col);
        let startRow1 = row - min;
        let startCol1 = col - min;
        while (startRow1 < BOARD_SIZE && startCol1 < BOARD_SIZE) {
            const block = chessBoardBlocks[startRow1 * BOARD_SIZE + startCol1];
            if (highlightPath) {
                block.classList.add('highlight');
            } else {
                block.classList.remove('highlight');
            }
            startRow1++;
            startCol1++;
        }

        // if x + y > 7, find diff between 7 and y
        // subtract diff from x, add diff to y
        // if x + y <= 7, add x to y, subtract x from x
        // for diagonal 2 (/)
        const sum = row + col;
        let startRow2, startCol2;
        if (sum <= BOARD_SIZE - 1) {
            startRow2 = 0;
            startCol2 = sum;
        } else {
            const diff = BOARD_SIZE - col - 1;
            startRow2 = row - diff;
            startCol2 = BOARD_SIZE - 1;
        }
        while (startRow2 < BOARD_SIZE && startCol2 >= 0) {
            const block = chessBoardBlocks[startRow2 * BOARD_SIZE + startCol2];
            if (highlightPath) {
                block.classList.add('highlight');
            } else {
                block.classList.remove('highlight');
            }
            startRow2++;
            startCol2--;
        }
    };

    // click event handler
    const handleBlockClick = (e) => {
        const element = e.target;
        if (!element || !element.classList.contains('block')) {
            return;
        }

        const row = Number.parseInt(element.dataset.row);
        const col = Number.parseInt(element.dataset.col);
        if (lastClickBlock) {
            // traverse previous diagonals to remove highlight class
            diagonalTraversal(lastClickBlock.row, lastClickBlock.col, false);
        }

        // traverse diagonals to add highlight class
        diagonalTraversal(row, col);

        // update lastClickedBlock to point to recently clicked block
        lastClickBlock = { row, col };
    };

    // add event listeners on chess board
    chessBoard.addEventListener('click', handleBlockClick);
})();
