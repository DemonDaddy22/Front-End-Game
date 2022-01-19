(function() {
const board = document.getElementById('board');
const score = document.querySelector('#score span');

const MIN_SIZE = 4;   // stores minimum board size
const MAX_SIZE = 100; // stores maximum board size
let n = MIN_SIZE;     // stores current board size
let oddRow = -1;      // stores row index of odd coloured cell
let oddCol = -1;      // stores column index of odd coloured cell

let boardContainer;

// generates a random integer value between 0 and upper limit
const getRandomValue = (upperLimit) => Math.floor(Math.random() * upperLimit);

// gives random colour and odd colour
const getRandomColors = () => {
  const ratio = 0.618033988749895;

  const hue = (Math.random() + ratio) % 1;
  const saturation = Math.round(Math.random() * 100) % 85;
  const lightness = Math.round(Math.random() * 100) % 85;

  const color = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' +
                lightness + '%)';
  const oddColor = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' +
                   (lightness + 5) + '%)';

  return {
    color,
    oddColor,
  };
};

// creates a new board cell
const createCell = (row, col) => {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.row = row;
  cell.dataset.col = col;
  return cell;
};

// creates a new board row
const createRow = (size, rowId) => {
  const row = document.createElement('div');
  row.classList.add('row');
  row.dataset.rowId = rowId;
  for (let j = 0; j < size; j++) {
    const cell = createCell(rowId, j);
    row.append(cell);
  }
  return row;
};

// fills colour in all the board cells
const fillColor = (size) => {
  const {color, oddColor} = getRandomColors();
  oddRow = getRandomValue(Math.min(size, MAX_SIZE));
  oddCol = getRandomValue(Math.min(size, MAX_SIZE));
  // select cells and fillColor

  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    const {row, col} = cell.dataset || {};
    cell.style.backgroundColor =
        row == oddRow && col == oddCol ? oddColor : color;
  });
};

// creates game board
const createBoard = (size) => {
  // if board size is MIN_SIZE, create a fresh board
  if (size === MIN_SIZE) {
    if (board.childNodes.length) {
      board.removeChild(board.childNodes[0]);
    }
    boardContainer = document.createElement('div');
    boardContainer.classList.add('board-container');
    board.append(boardContainer);
    for (let i = 0; i < size; i++) {
      const row = createRow(size, i);
      boardContainer.append(row);
    }
  }
  // else use previous board, and add a new cell to each existing board
  // and a new row at the end
  // reuses (size - 1) * (size - 1) cells
  else if (size <= MAX_SIZE) {
    for (let i = 0; i < size - 1; i++) {
      const row = document.querySelector(`[data-row-id='${i}']`);
      const cell = createCell(i, size - 1);
      row.append(cell);
    }
    const row = createRow(size, size - 1);
    boardContainer.append(row);
  }

  fillColor(size);
};

// handles board click events
const handleClick = (e) => {
  const {target} = e || {};
  if (!target || !target.classList.contains('cell'))
    return;

  const {row, col} = target.dataset;

  if (row == oddRow && col == oddCol) {
    score.textContent = Number(score.textContent) + 1;
    if (n <= MAX_SIZE)
      n++;
  } else {
    board.classList.add('shake');
    setTimeout(() => board.classList.remove('shake'), 800);
    score.textContent = 0;
    n = MIN_SIZE;
  }
  createBoard(n);
};

createBoard(n);

board.addEventListener('click', handleClick);
})();
