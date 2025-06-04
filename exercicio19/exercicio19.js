document.addEventListener('DOMContentLoaded', function() {
    const toolbarButtons = document.querySelectorAll('.toolbar button');
    const editorContent = document.getElementById('editorContent');
    const messageDiv = document.getElementById('message');

    function applyFormat(event) {
        const command = event.target.dataset.command;
        if (command) {
            document.execCommand(command, false, null);
            editorContent.focus();
            displayMessage(`Formato "${command}" aplicado.`, 'success');
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

    toolbarButtons.forEach(button => {
        button.addEventListener('click', applyFormat);
    });

    displayMessage('Digite no editor e use os botões para formatar.', 'info');
});