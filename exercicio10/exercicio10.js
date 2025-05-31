document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('nameInput');
    const addNameBtn = document.getElementById('addNameBtn');
    const namesList = document.getElementById('namesList');
    const sortearBtn = document.getElementById('sortearBtn');
    const clearListBtn = document.getElementById('clearListBtn');
    const resultadoSorteioDiv = document.getElementById('resultadoSorteio');
    const messageDiv = document.getElementById('message');

    let nomes = []; 

    function addName() {
        const nameText = nameInput.value.trim();

        if (nameText === '') {
            displayMessage('Por favor, digite um nome para adicionar.', 'error');
            return;
        }

        if (nomes.includes(nameText)) {
            displayMessage('Este nome já está na lista.', 'info');
            return;
        }

        clearMessage();
        nomes.push(nameText); 
        renderNamesList(); 
        nameInput.value = '';
        nameInput.focus();
        updateSortearButtonState();
    }

    function removeName(nameToRemove) {
        nomes = nomes.filter(name => name !== nameToRemove); 
        renderNamesList(); 
        displayMessage(`"${nameToRemove}" removido da lista.`, 'info');
        clearResultDisplay();
        updateSortearButtonState();
    }

    function renderNamesList() {
        namesList.innerHTML = ''; 
        if (nomes.length === 0) {
            namesList.innerHTML = '<li class="empty-list-message">Nenhum nome na lista ainda.</li>';
        } else {
            nomes.forEach(name => {
                const listItem = document.createElement('li');
                const nameSpan = document.createElement('span');
                nameSpan.textContent = name;
                listItem.appendChild(nameSpan);

                const removeBtn = document.createElement('button');
                removeBtn.classList.add('remove-name-btn');
                removeBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
                removeBtn.addEventListener('click', () => removeName(name));
                listItem.appendChild(removeBtn);

                namesList.appendChild(listItem);
            });
        }
    }

    function sortearNome() {
        if (nomes.length === 0) {
            displayMessage('A lista está vazia. Adicione nomes para sortear.', 'error');
            clearResultDisplay();
            return;
        }

        clearMessage();
        const randomIndex = Math.floor(Math.random() * nomes.length);
        const nomeSorteado = nomes[randomIndex];

        resultadoSorteioDiv.textContent = nomeSorteado;
        resultadoSorteioDiv.classList.remove('empty');
        displayMessage('Nome sorteado com sucesso!', 'success');
    }

    function clearList() {
        if (nomes.length === 0) {
            displayMessage('A lista já está vazia.', 'info');
            return;
        }
        nomes = []; 
        renderNamesList(); 
        displayMessage('Lista de nomes limpa.', 'info');
        clearResultDisplay();
        updateSortearButtonState();
    }

    function clearResultDisplay() {
        resultadoSorteioDiv.textContent = 'Clique em "Sortear Nome!"';
        resultadoSorteioDiv.classList.add('empty');
    }

    function updateSortearButtonState() {
        if (nomes.length < 2) { 
            sortearBtn.disabled = true;
            sortearBtn.style.opacity = '0.6';
            sortearBtn.style.cursor = 'not-allowed';
        } else {
            sortearBtn.disabled = false;
            sortearBtn.style.opacity = '1';
            sortearBtn.style.cursor = 'pointer';
        }
    }

    function displayMessage(msg, type = 'info') {
        messageDiv.textContent = msg;
        messageDiv.className = 'message ' + type;
        setTimeout(() => {
            clearMessage();
        }, 3000);
    }

    function clearMessage() {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
    }

    addNameBtn.addEventListener('click', addName);
    nameInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addName();
        }
    });
    sortearBtn.addEventListener('click', sortearNome);
    clearListBtn.addEventListener('click', clearList);

   
    renderNamesList(); 
    clearResultDisplay(); 
    updateSortearButtonState(); 
});