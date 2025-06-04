document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell');
    const statusMessage = document.getElementById('statusMessage');
    const restartButton = document.getElementById('restartButton');
    const messageDiv = document.getElementById('message');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex);

        if (board[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());

        checkResult();
    }

    function checkResult() {
        let roundWon = false;
        let winningCells = [];

        for (let i = 0; i < winConditions.length; i++) {
            const winCondition = winConditions[i];
            let a = board[winCondition[0]];
            let b = board[winCondition[1]];
            let c = board[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                winningCells = winCondition;
                break;
            }
        }

        if (roundWon) {
            statusMessage.textContent = `Jogador ${currentPlayer} venceu!`;
            gameActive = false;
            displayMessage(`Parabéns, Jogador ${currentPlayer} venceu!`, 'success');
            winningCells.forEach(index => {
                cells[index].classList.add('winning-cell');
            });
            return;
        }

        let roundDraw = !board.includes('');
        if (roundDraw) {
            statusMessage.textContent = 'Empate!';
            gameActive = false;
            displayMessage('O jogo terminou em empate!', 'info');
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = `É a vez do Jogador ${currentPlayer}`;
    }

    function restartGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        statusMessage.textContent = `É a vez do Jogador ${currentPlayer}`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning-cell');
        });
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

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);

    statusMessage.textContent = `É a vez do Jogador ${currentPlayer}`;
});