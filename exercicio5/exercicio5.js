document.addEventListener('DOMContentLoaded', function() {
    const cpfInput = document.getElementById('cpf');
    const validarBtn = document.getElementById('validarBtn');
    const resultadoDiv = document.getElementById('resultadoValidacao');

    validarBtn.addEventListener('click', validarCPF);

    cpfInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            validarCPF();
        }

        if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Tab') {
            event.preventDefault();
        }
    });

    cpfInput.addEventListener('input', function() {

        let digits = this.value.replace(/\D/g, '');

        if (digits.length > 11) {
            digits = digits.substring(0, 11);
        }
        this.value = digits;
    });


    function validarCPF() {
        const cpf = cpfInput.value.replace(/\D/g, '');

        resultadoDiv.className = 'resultado'; 
        resultadoDiv.innerHTML = '';

        if (cpf === '') {
            resultadoDiv.innerHTML = '<p>Por favor, digite um CPF.</p>';
            resultadoDiv.classList.add('invalido');
            return;
        }

        if (cpf.length === 11) {
            resultadoDiv.innerHTML = '<p>CPF válido (contém 11 dígitos).</p>';
            resultadoDiv.classList.add('valido');
        } else {
            resultadoDiv.innerHTML = `<p>CPF inválido. Deve conter 11 dígitos. (Digitado: ${cpf.length})</p>`;
            resultadoDiv.classList.add('invalido');
        }
    }
});