let lastClickedId = null;
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
    // Remove prev Color
    const [prevRow, prevCol] = lastClickedId.split('_');
    handleDiagonal(parseInt(prevRow), parseInt(prevCol), false);
  }
  // Add Color
  const [currRow, currCol] = id.split('_');
  handleDiagonal(parseInt(currRow), parseInt(currCol), true);
};

function updateColor(i, j, highlight) {
  const id = `${i}_${j}`;
  const cell = document.getElementById(id);
  if (highlight) {
    cell.classList.add('highlight');
  } else {
    cell.classList.remove('highlight');
  }
};

function handleDiagonal(row, col, highlight) {
  // left top
  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
    updateColor(i, j, highlight);
  }
  // left bottom
  for (let i = row + 1, j = col - 1; i < rows && j >= 0; i++, j--) {
    updateColor(i, j, highlight);
  }
  // right bottom
  for (let i = row + 1, j = col + 1; i < rows && j < rows; i++, j++) {
    updateColor(i, j, highlight);
  }
  // right top
  for (let i = row - 1, j = col + 1; i >= 0 && j < rows; i--, j++) {
    updateColor(i, j, highlight);
  }
  if (highlight) {
    lastClickedId = `${row}_${col}`;
  }
};

ChessBoard();
