/*
 * Creates pixel art grid
 * @param el DOM Element
 * @param rows Number of rows
 * @param rows Number of cols
 */
function PixelArt(el, rows, cols) {
  // write logic to create pixel art grid.
  this.el = document.querySelector(el);
  this.rows = rows;
  this.cols = cols;
  this.colour = null;
  this.dragging = false;

  if (!this.el) {
    return;
  }

  PixelArt.prototype.createElementWithClasses = function(element = 'div',
                                                         classes = []) {
    const newElement = document.createElement(element);
    newElement.classList.add(...classes);
    return newElement;
  };

  PixelArt.prototype.getRandomColour = function() {
    return '#000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16));
  };

  PixelArt.prototype.getRandomColours = function(size) {
    return Array.from(Array(size)).map(() => this.getRandomColour());
  };

  PixelArt.prototype.handleCellClick = function(e) {
    // add cell click logic
    const cell = e.target;
    if (!cell) {
      return;
    }

    const type = cell.dataset.type || null;
    const colour = cell.dataset.colour || null;
    const status = cell.dataset.status || null;

    if (type === 'palette-cell') {
      this.colour = colour;
      return;
    }

    if (type === 'cell' && status === 'empty') {
      cell.dataset.status = 'filled';
      cell.style.backgroundColor = this.colour;
      return;
    }
  };

  PixelArt.prototype.handleCellDragStart = function(e) {
    const cell = e.target;
    if (cell) {
      this.dragging = true;
    }
  };

  PixelArt.prototype.handleCellDrag = function(e) {
    const cell = e.target;
    const type = cell.dataset.type || null;
    const status = cell.dataset.status || null;
    if (this.dragging && type === 'cell' && status === 'empty') {
      cell.dataset.status = 'filled';
      cell.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
    }
  };

  PixelArt.prototype.handleCellDragEnd = function(e) {
    const cell = e.target;
    if (cell) {
      this.dragging = false;
    }
  };

  // create n*n grid
  for (let i = 0; i < rows; i++) {
    const row = this.createElementWithClasses('div', [ 'grid-row' ]);

    for (let j = 0; j < cols; j++) {
      const cell = this.createElementWithClasses('div', [ 'grid-cell' ]);
      cell.dataset.type = 'cell';
      cell.dataset.status = 'empty';
      row.append(cell);
    }

    this.el.append(row);
  }

  const colours = this.getRandomColours(cols);

  const row = this.createElementWithClasses('div', [ 'grid-row' ]);

  // create color palette
  for (let j = 0; j < cols; j++) {
    const cell = this.createElementWithClasses('div', [ 'grid-cell' ]);
    cell.style.backgroundColor = colours[j];
    cell.style.cursor = 'pointer';
    cell.dataset.type = 'palette-cell';
    cell.dataset.colour = colours[j];
    row.append(cell);
  }

  this.el.append(row);

  // add event listeners
  this.el.addEventListener('click', this.handleCellClick);
  this.el.addEventListener('mousedown', this.handleCellDragStart);
  this.el.addEventListener('mouseover', this.handleCellDrag);
  this.el.addEventListener('mouseup', this.handleCellDragEnd);
}
