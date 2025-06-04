document.addEventListener('DOMContentLoaded', function() {
    const timeDisplay = document.getElementById('timeDisplay');
    const startButton = document.getElementById('startButton');
    const pauseButton = document.getElementById('pauseButton');
    const resetButton = document.getElementById('resetButton');
    const messageDiv = document.getElementById('message');

    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;

    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function updateTime() {
        const currentTime = Date.now();
        elapsedTime = currentTime - startTime;
        timeDisplay.textContent = formatTime(elapsedTime);
    }

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(updateTime, 1000);
            startButton.disabled = true;
            pauseButton.disabled = false;
            resetButton.disabled = false;
            displayMessage('Cronômetro iniciado!', 'success');
        }
    }

    function pauseTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            isRunning = false;
            startButton.disabled = false;
            pauseButton.disabled = true;
            displayMessage('Cronômetro pausado.', 'info');
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        elapsedTime = 0;
        timeDisplay.textContent = '00:00';
        startButton.disabled = false;
        pauseButton.disabled = true;
        resetButton.disabled = true;
        displayMessage('Cronômetro resetado.', 'info');
    }

    function displayMessage(msg, type = 'info') {
        messageDiv.textContent = msg;
        messageDiv.className = `message ${type}`;
        setTimeout(() => {
            clearMessage();
        }, 4000);
    }

    function clearMessage() {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
    }

    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);

    pauseButton.disabled = true;
    resetButton.disabled = true;
});