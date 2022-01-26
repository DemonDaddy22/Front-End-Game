(function () {
    const progressBar = document.querySelector('.progress-bar');
    const runButton = document.querySelector('#run');

    const animationDuration = 1500;
    let playCount = 0;
    let isPlaying = false;

    const handleBarAnimation = () => {
        isPlaying = true;
        // use animate interface of element to fill the bar
        // on animation finish, check if count is non-zero
        // then re-call the animation function and update the button content
        // else, set isPlaying to false and update the button content
        progressBar
            .animate(
                { flexBasis: [0, '100%'] },
                {
                    duration: animationDuration,
                    easing: 'linear',
                    iterations: 1,
                }
            )
            .finished.then(() => {
                playCount--;
                if (playCount > 0) {
                    runButton.textContent = `Run ${playCount}`;
                    handleBarAnimation();
                } else {
                    isPlaying = false;
                    runButton.textContent = 'Run';
                }
            });
    };

    // update count on button click
    // queue animation calls on each click
    const handleRunButtonClick = () => {
        playCount++;
        runButton.textContent = `Run ${playCount}`;

        if (!isPlaying) handleBarAnimation();
    };

    // click event listener
    runButton.addEventListener('click', handleRunButtonClick);
})();
