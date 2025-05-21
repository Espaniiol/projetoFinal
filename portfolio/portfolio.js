document.addEventListener('DOMContentLoaded', function() {
    const toggleListBtn = document.getElementById('toggleListBtn');
    const exerciseList = document.querySelector('.exercise-list');
    const exerciseItems = document.querySelectorAll('.exercise-item');
    const exerciseIframe = document.getElementById('exerciseIframe');
    const currentExerciseName = document.getElementById('currentExerciseName');
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    const logoutBtn = document.getElementById('logoutBtn');

    function loadExercise(src, name) {
        exerciseIframe.src = src;
        currentExerciseName.textContent = name;
        welcomeOverlay.classList.remove('active');
    }

    function setActiveItem(clickedItem) {
        exerciseItems.forEach(item => item.classList.remove('active'));
        if (clickedItem) {
            clickedItem.classList.add('active');
        }
    }

    toggleListBtn.addEventListener('click', function() {
        exerciseList.classList.toggle('collapsed');
    });

    exerciseItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); 

            const exerciseSrc = this.dataset.src; 
            const exerciseName = this.textContent; 

            if (exerciseSrc) {
                loadExercise(exerciseSrc, exerciseName);
                setActiveItem(this); 
            }
        });
    });

    logoutBtn.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = '../index.html';
    });

});