document.addEventListener('DOMContentLoaded', function() {
    const celsiusInput = document.getElementById('celsius');
    const fahrenheitInput = document.getElementById('fahrenheit');
    const converterBtn = document.getElementById('converterBtn');
    const limparBtn = document.getElementById('limparBtn');
    const resultadoDiv = document.getElementById('resultadoConversao');

    converterBtn.addEventListener('click', converterTemperatura);
    limparBtn.addEventListener('click', limparCampos);

    celsiusInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            converterTemperatura();
        }
    });

    fahrenheitInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            converterTemperatura();
        }
    });

    function converterTemperatura() {
        const celsiusValue = celsiusInput.value.trim();
        const fahrenheitValue = fahrenheitInput.value.trim();

        resultadoDiv.className = 'resultado';
        resultadoDiv.innerHTML = '';

        if (celsiusValue !== '' && fahrenheitValue !== '') {
            resultadoDiv.innerHTML = '<p>Por favor, preencha apenas um campo para conversão.</p>';
            resultadoDiv.classList.add('erro');
            return;
        }

        if (celsiusValue !== '') {
            const celsius = parseFloat(celsiusValue);
            if (isNaN(celsius)) {
                resultadoDiv.innerHTML = '<p>Valor em Celsius inválido.</p>';
                resultadoDiv.classList.add('erro');
                return;
            }
            const fahrenheit = (celsius * 9/5) + 32;
            fahrenheitInput.value = fahrenheit.toFixed(2);
            resultadoDiv.innerHTML = `<p>${celsius.toFixed(2)}°C equivalem a <strong>${fahrenheit.toFixed(2)}°F</strong></p>`;
        } else if (fahrenheitValue !== '') {
            const fahrenheit = parseFloat(fahrenheitValue);
            if (isNaN(fahrenheit)) {
                resultadoDiv.innerHTML = '<p>Valor em Fahrenheit inválido.</p>';
                resultadoDiv.classList.add('erro');
                return;
            }
            const celsius = (fahrenheit - 32) * 5/9;
            celsiusInput.value = celsius.toFixed(2);
            resultadoDiv.innerHTML = `<p>${fahrenheit.toFixed(2)}°F equivalem a <strong>${celsius.toFixed(2)}°C</strong></p>`;
        } else {
            resultadoDiv.innerHTML = '<p>Digite um valor em Celsius ou Fahrenheit para converter.</p>';
        }
    }

    function limparCampos() {
        celsiusInput.value = '';
        fahrenheitInput.value = '';
        resultadoDiv.className = 'resultado';
        resultadoDiv.innerHTML = '<p>Digite um valor em Celsius ou Fahrenheit e clique em "Converter".</p>';
    }
});