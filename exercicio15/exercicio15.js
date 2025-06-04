document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.control-buttons button');
    const messageDiv = document.getElementById('message');

    function toggleVisibility(event) {
        const targetId = event.target.dataset.target;
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.classList.toggle('hidden');
            const isHidden = targetSection.classList.contains('hidden');
            let msg = isHidden ? `Seção "${targetId}" escondida.` : `Seção "${targetId}" mostrada.`;
            let type = isHidden ? 'info' : 'success';
            displayMessage(msg, type);
        }
    }

    function displayMessage(msg, type = 'info') {
        messageDiv.textContent = msg;
        messageDiv.className = `message ${type}`;
        setTimeout(() => {
            clearMessage();
        }, 3000);
    }

    function clearMessage() {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
    }

    toggleButtons.forEach(button => {
        button.addEventListener('click', toggleVisibility);
    });
});