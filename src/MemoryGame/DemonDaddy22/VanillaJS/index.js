(function (size) {
    const currentScore = document.querySelector('#current-score span');
    const highScore = document.querySelector('#high-score span');
    const blocksContainer = document.querySelector('#blocks-container');
    const startButton = document.querySelector('#start-button');

    let cScore = 0;
    let hScore = JSON.parse(localStorage.getItem('memoryGameHighScore')) || 0;

    // create blocks container
    (function () {
        for (let i = 0; i < size; i++) {
            const block = document.createElement('div');
            block.classList.add('block');
            block.dataset.id = i;
            blocksContainer.append(block);
        }
    })();

    const blocks = blocksContainer.childNodes;

    const generateMoveSequence = () => {
        const sequence = [];
        for (let i = 0; i < cScore; i++) {
            sequence.push(Math.floor(Math.random() * size));
        }
        return sequence;
    };

    const handleStartGame = () => {};

    const handleBlockClick = (e) => {};
})(5);
