(function (size) {
    const currentScore = document.querySelector('#current-score span');
    const highScore = document.querySelector('#high-score span');
    const blocksContainer = document.querySelector('#blocks-container');
    const startButton = document.querySelector('#start-button');

    let cScore = 0;
    let hScore = JSON.parse(localStorage.getItem('memoryGameHighScore')) || 0;
    highScore.textContent = hScore;

    let blocksSequence = [];
    let gameCounter = 0;
    let showingSequence = false;

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
        for (let i = 0; i < cScore + 1; i++) {
            sequence.push(Math.floor(Math.random() * size));
        }
        return sequence;
    };

    const handleStartGame = () => {
        startButton.disabled = true;
        showingSequence = true;
        gameCounter = 0;
        blocksSequence = generateMoveSequence();

        blocksSequence.forEach((blockId, index) => {
            const block = blocks[blockId];
            setTimeout(() => {
                block.classList.add('background-correct');
            }, 500 + 1000 * index);
            setTimeout(() => {
                block.classList.remove('background-correct');
                if (index === blocksSequence.length - 1) {
                    showingSequence = false;
                }
            }, 1000 * (index + 1));
        });
    };

    const handleBlockClick = (e) => {
        if (showingSequence || !blocksSequence.length) return;

        const block = e.target;
        if (!block || !block.classList.contains('block')) return;

        if (block.dataset.id == blocksSequence[gameCounter]) {
            gameCounter++;
            block.classList.add('background-correct');
            setTimeout(() => block.classList.remove('background-correct'), 250);

            if (gameCounter === blocksSequence.length) {
                startButton.disabled = false;
                cScore = cScore + 1;
                hScore = Math.max(hScore, cScore);
                currentScore.textContent = cScore;
                highScore.textContent = hScore;
                blocksSequence = [];
                localStorage.setItem(
                    'memoryGameHighScore',
                    JSON.stringify(hScore)
                );
            }
        } else {
            block.classList.add('background-incorrect');
            blocksContainer.classList.add('shake');
            cScore = 0;
            blocksSequence = [];
            currentScore.textContent = cScore;
            setTimeout(() => {
                block.classList.remove('background-incorrect');
                blocksContainer.classList.remove('shake');
            }, 800);
        }
    };

    startButton.addEventListener('click', handleStartGame);
    blocksContainer.addEventListener('click', handleBlockClick);
})(5);
