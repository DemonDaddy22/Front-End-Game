(function () {
    const barElement = document.getElementById('progress-bar');
    const runButton = document.getElementById('run-button');
    const spanElement = document.querySelector('#run-button span');
    // Time is in milli seconds
    const animationTime = 3000;
    const maxWidth = 100;
    let progress = 0;
    let run = 0;
    let timerId = null;
    let isPlaying = false;

    // Helps to update the progress bar width to show animation effect
    const updateProgress = () => {
        progress += (4 * maxWidth) / animationTime;
        barElement.style.width = `${progress}%`;
        if (progress >= 100) checkForQueue();
    };

    // This function helps to maintain queue when button is clicked multiple times
    const checkForQueue = () => {
        clearInterval(timerId);
        timerId = null;
        run--;
        progress = 0;
        barElement.style.width = `0%`;
        if (run !== 0) {
            spanElement.innerHTML = run;
            timerId = setInterval(updateProgress, 1);
        } else {
            spanElement.innerHTML = '';
        }
    };

    // helps to animate the bar with animate element
    const handleProgressBar = () => {
        isPlaying = true;
        barElement
            .animate(
                { width: [0, '100%'] },
                {
                    duration: animationTime,
                    easing: 'linear',
                    iterations: 1,
                }
            )
            .finished.then(() => {
                // on finished we check if button is clicked mutltiple times
                // then start the animation again
                run--;
                if (run !== 0) {
                    spanElement.innerHTML = run;
                    handleProgressBar();
                } else {
                    isPlaying = false;
                    spanElement.innerHTML = '';
                }
            });
    };

    const handleButtonClick = () => {
        run++;
        spanElement.innerHTML = run;
        // if (!timerId) timerId = setInterval(updateProgress, 1);
        if (!isPlaying) handleProgressBar();
    };

    runButton.addEventListener('click', handleButtonClick);
})();
