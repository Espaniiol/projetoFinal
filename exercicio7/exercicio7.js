document.addEventListener('DOMContentLoaded', function() {
    let numeroSecreto;
    let tentativas;

    const palpiteInput = document.getElementById('palpiteInput');
    const verificarPalpiteBtn = document.getElementById('verificarPalpiteBtn');
    const reiniciarJogoBtn = document.getElementById('reiniciarJogoBtn');
    const feedbackMessageDiv = document.getElementById('feedbackMessage');
    const tentativasCountP = document.getElementById('tentativasCount');

    function iniciarNovoJogo() {
        numeroSecreto = Math.floor(Math.random() * 100) + 1; // Número entre 1 e 100
        tentativas = 0;
        palpiteInput.value = '';
        palpiteInput.disabled = false; // Habilita o input
        verificarPalpiteBtn.disabled = false; // Habilita o botão de verificar
        reiniciarJogoBtn.classList.add('hidden'); // Esconde o botão de reiniciar
        feedbackMessageDiv.textContent = ''; // Limpa a mensagem
        feedbackMessageDiv.className = 'message'; // Reseta a classe da mensagem
        tentativasCountP.textContent = 'Tentativas: 0'; // Reseta o contador
    }

    function verificarPalpite() {
        const palpiteStr = palpiteInput.value.trim();
        const palpite = parseInt(palpiteStr);

        if (palpiteStr === '') {
            displayMessage('Por favor, insira um número.', 'error');
            return;
        }

        if (isNaN(palpite) || palpite < 1 || palpite > 100) {
            displayMessage('Por favor, insira um número entre 1 e 100.', 'error');
            return;
        }

        tentativas++;
        tentativasCountP.textContent = `Tentativas: ${tentativas}`;

        if (palpite === numeroSecreto) {
            displayMessage(`Parabéns! Você adivinhou o número ${numeroSecreto} em ${tentativas} tentativas!`, 'success');
            palpiteInput.disabled = true;
            verificarPalpiteBtn.disabled = true;
            reiniciarJogoBtn.classList.remove('hidden');
        } else if (palpite < numeroSecreto) {
            displayMessage('Muito baixo! Tente um número maior.', 'info');
        } else {
            displayMessage('Muito alto! Tente um número menor.', 'info');
        }

        palpiteInput.value = ''; // Limpa o input após cada palpite
        palpiteInput.focus(); // Coloca o foco de volta no input
    }

    function displayMessage(msg, type = 'info') {
        feedbackMessageDiv.textContent = msg;
        feedbackMessageDiv.className = `message ${type}`;
    }

    // Event Listeners
    verificarPalpiteBtn.addEventListener('click', verificarPalpite);
    reiniciarJogoBtn.addEventListener('click', iniciarNovoJogo);

    palpiteInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            verificarPalpite();
        }
    });

    // Inicia o jogo ao carregar a página
    iniciarNovoJogo();
});