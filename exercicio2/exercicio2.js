document.addEventListener('DOMContentLoaded', function() {
    const nota1Input = document.getElementById('nota1');
    const nota2Input = document.getElementById('nota2');
    const nota3Input = document.getElementById('nota3');
    const calcularMediaBtn = document.getElementById('calcularMediaBtn');
    const resultadoMediaDiv = document.getElementById('resultadoMedia');

    function formatAndValidateNoteInput(inputElement) {
        let value = inputElement.value.replace(',', '.'); 

        value = value.replace(/[^0-9.]/g, '');

        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }

        let numericValue = parseFloat(value);

        if (!isNaN(numericValue)) {
            if (numericValue < 0) {
                value = '0';
            } else if (numericValue > 10) {
                value = '10';
            }
        }

        if (value === '' || value === '.') {
        } else if (!isNaN(numericValue)) {
             if (numericValue < 0) {
                value = '0';
            } else if (numericValue > 10) {
                value = '10';
            }
        }


        inputElement.value = value;
    }

    nota1Input.addEventListener('input', () => formatAndValidateNoteInput(nota1Input));
    nota2Input.addEventListener('input', () => formatAndValidateNoteInput(nota2Input));
    nota3Input.addEventListener('input', () => formatAndValidateNoteInput(nota3Input));

    calcularMediaBtn.addEventListener('click', calcularMedia);

    function calcularMedia() {
        resultadoMediaDiv.className = 'resultado';
        resultadoMediaDiv.innerHTML = '';

        const nota1 = parseFloat(nota1Input.value);
        const nota2 = parseFloat(nota2Input.value);
        const nota3 = parseFloat(nota3Input.value);

        if (nota1Input.value.trim() === '' || nota2Input.value.trim() === '' || nota3Input.value.trim() === '') {
            resultadoMediaDiv.innerHTML = '<p>Por favor, preencha todas as notas.</p>';
            resultadoMediaDiv.classList.add('erro');
            return;
        }

        if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3) ||
            nota1 < 0 || nota1 > 10 ||
            nota2 < 0 || nota2 > 10 ||
            nota3 < 0 || nota3 > 10)
        {
            resultadoMediaDiv.innerHTML = '<p>Por favor, insira notas válidas entre 0.0 e 10.0.</p>';
            resultadoMediaDiv.classList.add('erro');
            return;
        }

        const media = (nota1 + nota2 + nota3) / 3;
        let avaliacao = '';
        let classeCor = '';
      
        if (media >= 7) {
            avaliacao = 'Aprovado!';
            classeCor = 'aprovado';
        } else if (media >= 5 && media < 7) { 
            avaliacao = 'Em Exame';
            classeCor = 'exame';
        } else { 
            avaliacao = 'Reprovado';
            classeCor = 'reprovado';
        }

        resultadoMediaDiv.innerHTML = `
            <p>Média: <strong>${media.toFixed(2)}</strong></p>
            <p>Status: <span>${avaliacao}</span></p>
        `;
        resultadoMediaDiv.classList.add(classeCor);
    }
});