(function () {
    const barElement = document.getElementById('progress-bar');
    const runButton = document.getElementById('run-button');
    const spanElement = document.querySelector('#run-button span');
    // Time is in seconds
    const animationTime = 3;
    const maxProgress = 100;
    let progress = 0;
    let run = 0;
    let timerId = null;

    const updateBarValue = () => {
        if (progress >= 100) {
            progress = 0;
            barElement.value = 0;
            clearInterval(timerId);
            timerId = null;
            run--;
            if (run === 0) {
                spanElement.innerHTML = '';
            } else {
                spanElement.innerHTML = run;
                handleProgressBar();
            }
        } else {
            progress += maxProgress / animationTime;
            barElement.value = progress;
        }
    };

    const handleProgressBar = () => {
        timerId = setInterval(() => updateBarValue(), 1000);
    };

    const handleButtonClick = () => {
        run++;
        spanElement.innerHTML = run;
        if (!timerId) handleProgressBar();
    };

    runButton.addEventListener('click', handleButtonClick);
})();
