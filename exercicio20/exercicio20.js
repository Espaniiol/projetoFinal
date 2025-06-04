document.addEventListener('DOMContentLoaded', function() {
    const gameBoard = document.getElementById('gameBoard');
    const statusMessage = document.getElementById('statusMessage');
    const restartButton = document.getElementById('restartButton');
    const messageDiv = document.getElementById('message');

    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let cards = [];
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchesFound = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createBoard() {
        gameBoard.innerHTML = '';
        cards = [...cardValues, ...cardValues];
        shuffle(cards);

        cards.forEach(value => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.value = value;

            const frontFace = document.createElement('div');
            frontFace.classList.add('front-face');
            frontFace.textContent = value;

            const backFace = document.createElement('div');
            backFace.classList.add('back-face');
            backFace.textContent = '?';

            card.appendChild(frontFace);
            card.appendChild(backFace);
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });

        statusMessage.textContent = 'Clique em qualquer carta para começar!';
        matchesFound = 0;
        resetBoard();
        clearMessage();
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.value === secondCard.dataset.value;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');

        matchesFound++;
        displayMessage(`Par encontrado! (${firstCard.dataset.value})`, 'success');

        if (matchesFound === cardValues.length) {
            statusMessage.textContent = 'Parabéns! Você encontrou todos os pares!';
            displayMessage('Você venceu o jogo!', 'success');
        }

        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
            displayMessage('Cartas diferentes. Tente novamente!', 'error');
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function displayMessage(msg, type = 'info') {
        messageDiv.textContent = msg;
        messageDiv.className = `message ${type}`;
        setTimeout(() => {
            clearMessage();
        }, 3000);
    }

    function clearMessage() {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
    }

    restartButton.addEventListener('click', createBoard);

    createBoard();
});