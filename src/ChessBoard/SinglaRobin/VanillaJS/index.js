let lastClickedId = null;
let lastColorList = [];
const rows = 8;

function ChessBoard() {
    board = document.getElementById('board');
    for (let i = 0; i < rows; i++) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('boardRow');
        for (let j = 0; j < rows; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `${i}_${j}`;
            cell.dataset.type = 'cell';
            rowElement.appendChild(cell);
        }
        board.appendChild(rowElement);
    }

    board.addEventListener('click', handleClick);
};

function handleClick(e) {
    const id = e.target.id;
    if (lastClickedId !== null) {
        //Remove prev Color
        const [prevRow, prevCol] = lastClickedId.split('_');
        handleDiagonal(parseInt(prevRow), parseInt(prevCol), 'remove');
    }
    //Add Color
    const [currRow, currCol] = id.split('_');
    handleDiagonal(parseInt(currRow), parseInt(currCol), 'add');
};

function updateColor(i, j, operation) {
    const id = `${i}_${j}`;
    const cell = document.getElementById(id);
    if (operation === 'remove') {
        cell.style.background = lastColorList[0];
        cell.style.borderColor = lastColorList[0];
        lastColorList.splice(0, 1);
    } else {
        const colorValue = getComputedStyle(cell).backgroundColor;
        lastColorList.push(colorValue);
        cell.style.background = 'red';
        cell.style.borderColor = 'red';
    }
}

function handleDiagonal(row, col, operation) {
    //left top
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        updateColor(i, j, operation);
    }
    //left bottom
    for (let i = row + 1, j = col - 1; i < rows && j >= 0; i++, j--) {
        updateColor(i, j, operation);
    }
    //right bottom
    for (let i = row + 1, j = col + 1; i < rows && j < rows; i++, j++) {
        updateColor(i, j, operation);
    }
    //right top
    for (let i = row - 1, j = col + 1; i >= 0 && j < rows; i--, j++) {
        updateColor(i, j, operation);
    }
    if (operation === 'add') {
        lastClickedId = `${row}_${col}`;
    }
}

ChessBoard();
