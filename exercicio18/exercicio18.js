document.addEventListener('DOMContentLoaded', function() {
    const minutesInput = document.getElementById('minutesInput');
    const secondsInput = document.getElementById('secondsInput');
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    const timeDisplay = document.getElementById('timeDisplay');
    const messageDiv = document.getElementById('message');

    let totalSeconds = 0;
    let timerInterval;

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function updateDisplay() {
        timeDisplay.textContent = formatTime(totalSeconds);
    }

    function startTimer() {
        const initialMinutes = parseInt(minutesInput.value);
        const initialSeconds = parseInt(secondsInput.value);

        if (isNaN(initialMinutes) || initialMinutes < 0 ||
            isNaN(initialSeconds) || initialSeconds < 0 || initialSeconds > 59) {
            displayMessage('Por favor, insira valores válidos para minutos (>=0) e segundos (0-59).', 'error');
            return;
        }

        totalSeconds = (initialMinutes * 60) + initialSeconds;

        if (totalSeconds <= 0) {
            displayMessage('Por favor, defina um tempo maior que zero.', 'error');
            return;
        }

        clearInterval(timerInterval);

        minutesInput.disabled = true;
        secondsInput.disabled = true;
        startButton.disabled = true;
        resetButton.disabled = false;
        displayMessage('Contador regressivo iniciado!', 'success');

        updateDisplay();
        timerInterval = setInterval(() => {
            totalSeconds--;
            updateDisplay();

            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                timeDisplay.textContent = '00:00';
                displayMessage('Tempo esgotado!', 'info');
                resetButton.disabled = false;
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timerInterval);
        totalSeconds = 0;
        minutesInput.value = '0';
        secondsInput.value = '0';
        updateDisplay();
        minutesInput.disabled = false;
        secondsInput.disabled = false;
        startButton.disabled = false;
        resetButton.disabled = true;
        clearMessage();
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
    resetButton.addEventListener('click', resetTimer);

    updateDisplay();
});