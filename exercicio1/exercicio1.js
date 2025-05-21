document.addEventListener('DOMContentLoaded', function() {
    const pesoInput = document.getElementById('peso');
    const alturaInput = document.getElementById('altura');
    const calcularBtn = document.getElementById('calcularBtn');
    const resultadoDiv = document.getElementById('resultado');

    function formatPesoInput(inputElement) {
        let value = inputElement.value.replace(',', '.'); 

        value = value.replace(/[^0-9.]/g, '');
        const parts = value.split('.');
        if (parts.length > 2) { 
            value = parts[0] + '.' + parts.slice(1).join('');
        }

        if (value.length >= 4 && !value.includes('.')) { 
            if (!isNaN(parseFloat(value))) {
                value = value.slice(0, value.length - 2) + '.' + value.slice(value.length - 2);
            }
        }

        inputElement.value = value;
    }

    function formatAlturaInput(inputElement) {
        let value = inputElement.value.replace(',', '.'); 

        value = value.replace(/[^0-9.]/g, '');

        if (value.length >= 3 && value.length <= 4 && !value.includes('.')) {
            if (!isNaN(parseFloat(value))) {
                value = value.slice(0, value.length - 2) + '.' + value.slice(value.length - 2);
            }
        } else if (value.length > 4 && !value.includes('.')) {
        }

        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }

        inputElement.value = value;
    }

    pesoInput.addEventListener('input', () => formatPesoInput(pesoInput));
    alturaInput.addEventListener('input', () => formatAlturaInput(alturaInput));


    calcularBtn.addEventListener('click', () => {
        console.log('Botão Calcular clicado!');
        calcularIMC();
    });

    function calcularIMC() {
        console.log('Função calcularIMC iniciada.');

        resultadoDiv.className = 'resultado';
        resultadoDiv.innerHTML = '';

        const peso = parseFloat(pesoInput.value);
        const altura = parseFloat(alturaInput.value);

        console.log('Peso (float):', peso);
        console.log('Altura (float):', altura);

        if (pesoInput.value.trim() === '' || alturaInput.value.trim() === '') {
            console.log('Validação: Campos vazios.');
            resultadoDiv.innerHTML = '<p>Por favor, preencha todos os campos.</p>';
            resultadoDiv.classList.add('erro');
            return;
        }

        if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
            console.log('Validação: Valores inválidos ou zero/negativo.');
            resultadoDiv.innerHTML = '<p>Por favor, insira valores numéricos válidos e maiores que zero.</p>';
            resultadoDiv.classList.add('erro');
            return;
        }

        const imc = peso / (altura * altura);
        let classificacao = '';
        let classeCor = '';

        if (imc < 18.5) {
            classificacao = 'Abaixo do peso';
            classeCor = 'baixo-peso';
        } else if (imc >= 18.5 && imc < 24.9) {
            classificacao = 'Peso normal';
            classeCor = 'peso-normal';
        } else if (imc >= 25 && imc < 29.9) {
            classificacao = 'Sobrepeso';
            classeCor = 'sobrepeso';
        } else if (imc >= 30 && imc < 34.9) {
            classificacao = 'Obesidade Grau I';
            classeCor = 'obesidade';
        } else if (imc >= 35 && imc < 39.9) {
            classificacao = 'Obesidade Grau II';
            classeCor = 'obesidade';
        } else { 
            classificacao = 'Obesidade Grau III (Mórbida)';
            classeCor = 'obesidade';
        }

        resultadoDiv.innerHTML = `
            <p>Seu IMC é: <strong>${imc.toFixed(2)}</strong></p>
            <p>Classificação: <span>${classificacao}</span></p>
        `;
        resultadoDiv.classList.add(classeCor);
    }
});