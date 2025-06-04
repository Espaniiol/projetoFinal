document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const messageDiv = document.getElementById('message');

    function filterImages(event) {
        const selectedFilter = event.target.dataset.filter;

        filterButtons.forEach(button => button.classList.remove('active'));
        event.target.classList.add('active');

        let visibleCount = 0;
        galleryItems.forEach(item => {
            const itemCategory = item.dataset.category;

            if (selectedFilter === 'all' || itemCategory === selectedFilter) {
                item.classList.remove('hidden');
                visibleCount++;
            } else {
                item.classList.add('hidden');
            }
        });

        if (selectedFilter === 'all') {
            displayMessage('Mostrando todas as imagens.', 'info');
        } else if (visibleCount > 0) {
            displayMessage(`Mostrando ${visibleCount} imagem(ns) da categoria "${selectedFilter}".`, 'success');
        } else {
            displayMessage(`Nenhuma imagem encontrada para a categoria "${selectedFilter}".`, 'error');
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

    filterButtons.forEach(button => {
        button.addEventListener('click', filterImages);
    });

    displayMessage('Use os botões para filtrar as imagens.', 'info');
});