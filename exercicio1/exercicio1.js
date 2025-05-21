document.addEventListener('DOMContentLoaded', function() {
    const pesoInput = document.getElementById('peso');
    const alturaInput = document.getElementById('altura');
    const calcularBtn = document.getElementById('calcularBtn');
    const resultadoDiv = document.getElementById('resultado');

    calcularBtn.addEventListener('click', calcularIMC);

    function calcularIMC() {
        // Limpa classes de resultado anteriores
        resultadoDiv.className = 'resultado';
        resultadoDiv.innerHTML = '';

        const peso = parseFloat(pesoInput.value);
        const altura = parseFloat(alturaInput.value);

        // Validação básica dos inputs
        if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
            resultadoDiv.innerHTML = '<p>Por favor, insira valores válidos para peso e altura.</p>';
            resultadoDiv.classList.add('erro'); // Opcional: adicione uma classe de erro para estilizar
            return;
        }

        // Fórmula do IMC: peso / (altura * altura)
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
        } else { // imc >= 30
            classificacao = 'Obesidade';
            classeCor = 'obesidade';
        }

        // Exibe o resultado
        resultadoDiv.innerHTML = `
            <p>Seu IMC é: <strong>${imc.toFixed(2)}</strong></p>
            <p>Classificação: <span>${classificacao}</span></p>
        `;
        resultadoDiv.classList.add(classeCor); // Adiciona a classe de cor correspondente
    }
});