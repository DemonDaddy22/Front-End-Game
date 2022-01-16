/*
 * Creates pixel art grid
 * @param el DOM Element
 * @param rows Number of rows
 * @param rows Number of cols
 */
let selectedColor = '';
function PixelArt(el, rows, cols) {
    // write logic to create pixel art grid.
    const cellWidthString = getComputedStyle(
        document.documentElement
    ).getPropertyValue('--cell-width');

    const cellWidthInt = parseInt(
        cellWidthString.substring(1, cellWidthString.indexOf('p'))
    );

    const color = [];
    for (let i = 0; i < rows; i++) {
        color.push(`#${getColorValue()}`);
    }
    selectedColor = color[0];

    const gridElement = document.querySelector(el);
    gridElement.style.gridTemplateColumns = `repeat(${rows}, ${cellWidthString})`;
    for (let i = 0; i <= rows; i++) {
        for (let j = 0; j < cols; j++) {
            const element = document.createElement('div');
            element.setAttribute('id', `${i} ${j} `);
            element.classList.add('cell');
            gridElement.appendChild(element);
            if (i === rows) {
                element.classList.add('color');
                element.style.background = color[j];
            } else {
                element.setAttribute('draggable', true);
            }
        }
    }

    const width = rows * cellWidthInt;
    const bottomBorder = document.createElement('div');
    bottomBorder.classList.add('border');
    bottomBorder.style.width = `${width}px`;
    gridElement.appendChild(bottomBorder);

    gridElement.addEventListener('click', (e) => handleClick(e, rows, color));
    gridElement.addEventListener('dragover', (e) => handleDrag(e, rows));
}

function getColorValue() {
    let color = Math.floor(Math.random() * 16777215).toString(16);
    return color;
}

function handleClick(e, lastRow, color) {
    const id = e.target.id;
    const [row, col] = id.split(' ');
    const element = document.getElementById(id);
    if (parseInt(row) === lastRow) {
        selectedColor = color[col];
        return;
    }
    element.style.background = selectedColor;
}

function handleDrag(e, lastRow) {
    const id = e.target.id;
    const element = document.getElementById(id);
    const row = id.split(' ')[0];
    if (parseInt(row) === lastRow) {
        return;
    }
    element.style.background = '#808080';
}