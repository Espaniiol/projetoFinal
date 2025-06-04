document.addEventListener('DOMContentLoaded', function() {
    let saldo = 0; 

    const saldoDisplay = document.getElementById('saldoDisplay');
    const valorInput = document.getElementById('valorInput');
    const depositarBtn = document.getElementById('depositarBtn');
    const sacarBtn = document.getElementById('sacarBtn');
    const consultarBtn = document.getElementById('consultarBtn');
    const messageDiv = document.getElementById('message');

    function formatarMoeda(valor) {
        return `R$ ${valor.toFixed(2).replace('.', ',')}`;
    }

    function updateSaldoDisplay() {
        saldoDisplay.textContent = formatarMoeda(saldo);
    }

    function validarValor(valorStr) {
        const valor = parseFloat(valorStr);
        if (valorStr.trim() === '' || isNaN(valor) || valor <= 0) {
            displayMessage('Por favor, insira um valor positivo e válido.', 'error');
            return null;
        }
        return parseFloat(valor.toFixed(2));
    }

    function depositar() {
        const valorDepositado = validarValor(valorInput.value);

        if (valorDepositado === null) {
            return;
        }

        saldo += valorDepositado;
        updateSaldoDisplay();
        displayMessage(`Depósito de ${formatarMoeda(valorDepositado)} realizado com sucesso!`, 'success');
        valorInput.value = '';
    }

    function sacar() {
        const valorSacado = validarValor(valorInput.value);

        if (valorSacado === null) {
            return;
        }

        if (valorSacado > saldo) {
            displayMessage('Saldo insuficiente para realizar o saque.', 'error');
            return;
        }

        saldo -= valorSacado;
        updateSaldoDisplay();
        displayMessage(`Saque de ${formatarMoeda(valorSacado)} realizado com sucesso!`, 'success');
        valorInput.value = '';
    }

    function consultarSaldo() {
        displayMessage(`Seu saldo atual é de ${formatarMoeda(saldo)}.`, 'info');
    }

    function displayMessage(msg, type = 'info') {
        messageDiv.textContent = msg;
        messageDiv.className = `message ${type}`;
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'message';
        }, 4000); 
    }

    depositarBtn.addEventListener('click', depositar);
    sacarBtn.addEventListener('click', sacar);
    consultarBtn.addEventListener('click', consultarSaldo);

    valorInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            depositar(); 
        }
    });

    updateSaldoDisplay();
});