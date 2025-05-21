document.addEventListener('DOMContentLoaded', function() {
    const toggleListBtn = document.getElementById('toggleListBtn');
    const exerciseList = document.querySelector('.exercise-list');
    const exerciseItems = document.querySelectorAll('.exercise-item');
    const exerciseIframe = document.getElementById('exerciseIframe');
    const currentExerciseName = document.getElementById('currentExerciseName');
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    const logoutBtn = document.getElementById('logoutBtn');

    // Função para carregar o exercício no iframe
    function loadExercise(src, name) {
        exerciseIframe.src = src;
        currentExerciseName.textContent = name;
        welcomeOverlay.classList.remove('active'); // Esconde a overlay
    }

    // Função para gerenciar a classe 'active' nos itens do menu
    function setActiveItem(clickedItem) {
        exerciseItems.forEach(item => item.classList.remove('active'));
        if (clickedItem) {
            clickedItem.classList.add('active');
        }
    }

    // Event listener para o botão de toggle da lista de exercícios
    toggleListBtn.addEventListener('click', function() {
        exerciseList.classList.toggle('collapsed');
    });

    // Event listeners para os itens da lista de exercícios
    exerciseItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); // Impede o comportamento padrão do link

            const exerciseSrc = this.dataset.src; // Obtém o caminho do arquivo do exercício
            const exerciseName = this.textContent; // Obtém o nome do exercício (texto do link)

            if (exerciseSrc) {
                loadExercise(exerciseSrc, exerciseName);
                setActiveItem(this); // Marca o item clicado como ativo
            }
        });
    });

    // Event listener para o botão de Sair
    logoutBtn.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'index.html'; // Redireciona de volta para a tela de login
    });

    // Opcional: Carregar o primeiro exercício automaticamente ao carregar a página
    // descomente as linhas abaixo se quiser que o primeiro exercício já apareça
    // if (exerciseItems.length > 0) {
    //     const firstExerciseItem = exerciseItems[0];
    //     const firstExerciseSrc = firstExerciseItem.dataset.src;
    //     const firstExerciseName = firstExerciseItem.textContent;
    //     loadExercise(firstExerciseSrc, firstExerciseName);
    //     setActiveItem(firstExerciseItem);
    // }
});