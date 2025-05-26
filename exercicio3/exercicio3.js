document.addEventListener('DOMContentLoaded', function() {
    const numeroInput = document.getElementById('numero');
    const gerarTabuadaBtn = document.getElementById('gerarTabuadaBtn');
    const resultadoTabuadaDiv = document.getElementById('resultadoTabuada');

    gerarTabuadaBtn.addEventListener('click', function() {
        gerarTabuada();
    });

    numeroInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            gerarTabuada();
        }
    });

    function gerarTabuada() {
        resultadoTabuadaDiv.innerHTML = ''; 
        resultadoTabuadaDiv.classList.remove('erro'); 

        const numeroStr = numeroInput.value;

        if (numeroStr.trim() === '') {
            resultadoTabuadaDiv.innerHTML = '<p class="erro">Por favor, digite um número.</p>';
            resultadoTabuadaDiv.classList.add('erro');
            return;
        }

        const numero = parseInt(numeroStr);

        if (isNaN(numero)) {
            resultadoTabuadaDiv.innerHTML = '<p class="erro">Entrada inválida. Por favor, digite um número inteiro.</p>';
            resultadoTabuadaDiv.classList.add('erro');
            return;
        }

        let tabuadaHTML = `<h3>Tabuada do ${numero}:</h3>`;
        for (let i = 1; i <= 10; i++) {
            tabuadaHTML += `<p>${numero} x ${i} = <strong>${numero * i}</strong></p>`;
        }

        resultadoTabuadaDiv.innerHTML = tabuadaHTML;
    }
});