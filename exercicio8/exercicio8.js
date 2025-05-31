document.addEventListener('DOMContentLoaded', function() {
    const numeroPrimoInput = document.getElementById('numeroPrimoInput');
    const verificarPrimoBtn = document.getElementById('verificarPrimoBtn');
    const resultadoPrimoDiv = document.getElementById('resultadoPrimo');

    function isPrimo(num) {
        if (num <= 1) return false; 
        if (num <= 3) return true;  
        if (num % 2 === 0 || num % 3 === 0) return false;

        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) {
                return false;
            }
        }
        return true;
    }

    function verificarNumero() {
        const numeroStr = numeroPrimoInput.value.trim();
        const numero = parseInt(numeroStr);

        resultadoPrimoDiv.className = 'message'; 

        if (numeroStr === '') {
            displayMessage('Por favor, insira um número inteiro.', 'error');
            return;
        }

        if (isNaN(numero) || !Number.isInteger(parseFloat(numeroStr)) || numero < 1) {
            displayMessage('Por favor, insira um número inteiro positivo válido.', 'error');
            return;
        }

        if (isPrimo(numero)) {
            displayMessage(`O número ${numero} é PRIMO!`, 'success');
        } else {
            displayMessage(`O número ${numero} NÃO é primo.`, 'info');
        }
    }

    function displayMessage(msg, type = 'info') {
        resultadoPrimoDiv.textContent = msg;
        resultadoPrimoDiv.classList.add(type);
    }

    verificarPrimoBtn.addEventListener('click', verificarNumero);

    numeroPrimoInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            verificarNumero();
        }
    });
});