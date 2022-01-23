function ColorSpotter(initialRows = 4) {
  this.rows = initialRows;
  this.grid = document.getElementById('game-grid');
  this.displayScore = document.querySelector('#score span');
  this.oddBlockId = null;
  this.currentScore = 0;
  ColorSpotter.prototype.getRandomColors = function() {
    const ratio = 0.618033988749895;
    const hue = (Math.random() + ratio) % 1;
    const saturation = Math.round(Math.random() * 100) % 85;
    const lightness = Math.round(Math.random() * 100) % 85;

    const color = `hsl(${Math.round(360 * hue)},${saturation}%, ${lightness}%)`;
    const oddColor = `hsl(${Math.round(360 * hue)},${saturation}%,
        ${lightness + 5}%)`;
    return {
      color,
      oddColor,
    };
  };

  ColorSpotter.prototype.getRandomNumber = function(
      max) { return Math.floor(Math.random() * max); };

  ColorSpotter.prototype.handleBlockClick = function(e) {
    const id = e.target.id;
    if (id === this.oddBlockId) {
      this.currentScore++;
      this.displayScore.innerText = this.currentScore;
      this.displayGrid(this.rows + this.currentScore);
    } else {
      this.grid.classList.add('shake');
      setTimeout(() => this.grid.classList.remove('shake'), 800);
      this.currentScore = 0;
      this.displayScore.innerText = this.currentScore;
      this.displayGrid(this.rows);
    }
  };

  ColorSpotter.prototype.displayGrid = function(row) {
    this.grid.innerHTML = '';
    const {color, oddColor} = this.getRandomColors();
    const oddRow = this.getRandomNumber(row);
    const oddCol = this.getRandomNumber(row);
    this.oddBlockId = `${oddRow}_${oddCol}`;
    for (let i = 0; i < row; i++) {
      const gridRow = document.createElement('div');
      gridRow.classList.add('grid-row');
      for (let j = 0; j < row; j++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.id = `${i}_${j}`;
        if (i === oddRow && j === oddCol) {
          block.style.background = oddColor;
        } else {
          block.style.background = color;
        }
        gridRow.appendChild(block);
      }
      this.grid.appendChild(gridRow);
    }
  };
  this.displayGrid(this.rows);
  this.grid.addEventListener('click', this.handleBlockClick.bind(this));
}

new ColorSpotter(4);
