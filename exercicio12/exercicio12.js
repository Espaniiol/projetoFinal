document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        {
            question: "Qual tag HTML é usada para incluir um arquivo JavaScript externo?",
            options: ["<script>", "<js>", "<javascript>", "<src>"],
            answer: "<script>"
        },
        {
            question: "Qual propriedade CSS é usada para mudar a cor do texto de um elemento?",
            options: ["text-color", "font-color", "color", "background-color"],
            answer: "color"
        },
        {
            question: "Qual método JavaScript é usado para imprimir algo no console?",
            options: ["console.log()", "print()", "display()", "log.console()"],
            answer: "console.log()"
        },
        {
            question: "Em CSS, qual seletor é usado para selecionar um elemento pelo seu ID?",
            options: [". (ponto)", "# (hash)", "* (asterisco)", ": (dois pontos)"],
            answer: "# (hash)"
        },
        {
            question: "Qual destes não é um tipo de dado primitivo em JavaScript?",
            options: ["string", "boolean", "object", "number"],
            answer: "object"
        }
    ];

    const quizForm = document.getElementById('quizForm');
    const submitQuizBtn = document.getElementById('submitQuizBtn');
    const restartQuizBtn = document.getElementById('restartQuizBtn');
    const resultArea = document.getElementById('resultArea');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const feedbackContainer = document.getElementById('feedbackContainer');
    const messageDiv = document.getElementById('message');

    function renderQuiz() {
        quizForm.innerHTML = '';
        questions.forEach((q, index) => {
            const questionBlock = document.createElement('div');
            questionBlock.classList.add('question-block');
            questionBlock.dataset.questionIndex = index;

            const questionText = document.createElement('p');
            questionText.textContent = `${index + 1}. ${q.question}`;
            questionBlock.appendChild(questionText);

            const optionsGroup = document.createElement('div');
            optionsGroup.classList.add('options-group');

            q.options.forEach((option, optionIndex) => {
                const optionItem = document.createElement('div');
                optionItem.classList.add('option-item');

                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.id = `q${index}-option${optionIndex}`;
                radioInput.name = `question${index}`;
                radioInput.value = option;
                optionItem.appendChild(radioInput);

                const label = document.createElement('label');
                label.htmlFor = `q${index}-option${optionIndex}`;
                label.textContent = option;
                optionItem.appendChild(label);

                optionsGroup.appendChild(optionItem);
            });
            questionBlock.appendChild(optionsGroup);
            quizForm.appendChild(questionBlock);
        });
        resultArea.classList.add('hidden');
        submitQuizBtn.classList.remove('hidden');
        restartQuizBtn.classList.add('hidden');
        clearMessage();
    }

    function submitQuiz() {
        let score = 0;
        feedbackContainer.innerHTML = '';
        let allAnswered = true;

        questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            const questionBlock = document.querySelector(`.question-block[data-question-index="${index}"]`);
            
            const feedbackItem = document.createElement('div');
            feedbackItem.classList.add('feedback-item');
            
            const questionTitle = document.createElement('p');
            questionTitle.textContent = `${index + 1}. ${q.question}`;
            feedbackItem.appendChild(questionTitle);

            if (selectedOption) {
                const userAnswer = selectedOption.value;
                const correctAnswer = q.answer;
                
                const userAnswerText = document.createElement('p');
                userAnswerText.innerHTML = `Sua resposta: <strong>${userAnswer}</strong>`;
                feedbackItem.appendChild(userAnswerText);

                if (userAnswer === correctAnswer) {
                    score++;
                    feedbackItem.classList.add('correct');
                    userAnswerText.innerHTML += ' <span style="color: #28a745;">(Correta!)</span>';
                } else {
                    feedbackItem.classList.add('incorrect');
                    const correctAnswerText = document.createElement('p');
                    correctAnswerText.innerHTML = `Resposta correta: <span class="correct-answer">${correctAnswer}</span>`;
                    feedbackItem.appendChild(correctAnswerText);
                }
            } else {
                allAnswered = false;
                feedbackItem.classList.add('incorrect');
                const noAnswerText = document.createElement('p');
                noAnswerText.textContent = 'Você não respondeu a esta pergunta.';
                feedbackItem.appendChild(noAnswerText);
                const correctAnswerText = document.createElement('p');
                correctAnswerText.innerHTML = `Resposta correta: <span class="correct-answer">${q.answer}</span>`;
                feedbackItem.appendChild(correctAnswerText);
            }
            feedbackContainer.appendChild(feedbackItem);
        });

        if (!allAnswered) {
            displayMessage('Por favor, responda a todas as perguntas.', 'error');
            return;
        }

        scoreDisplay.textContent = `${score} / ${questions.length}`;
        resultArea.classList.remove('hidden');
        submitQuizBtn.classList.add('hidden');
        restartQuizBtn.classList.remove('hidden');
        displayMessage('Quiz finalizado! Veja seus resultados.', 'info');

        // Desabilita os radios após o envio
        quizForm.querySelectorAll('input[type="radio"]').forEach(radio => radio.disabled = true);
    }

    function displayMessage(msg, type = 'info') {
        messageDiv.textContent = msg;
        messageDiv.className = `message ${type}`;
        setTimeout(() => {
            clearMessage();
        }, 4000);
    }

    function clearMessage() {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
    }

    submitQuizBtn.addEventListener('click', submitQuiz);
    restartQuizBtn.addEventListener('click', renderQuiz);

    renderQuiz();
});