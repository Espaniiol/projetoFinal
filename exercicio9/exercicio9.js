document.addEventListener('DOMContentLoaded', function() {
    const itemInput = document.getElementById('itemInput');
    const addItemBtn = document.getElementById('addItemBtn');
    const shoppingList = document.getElementById('shoppingList');
    const messageDiv = document.getElementById('message');

    function addItem() {
        const itemText = itemInput.value.trim();

        if (itemText === '') {
            displayMessage('Por favor, digite um item para adicionar.', 'error');
            return;
        }

        clearMessage();

        const listItem = document.createElement('li');
        const itemSpan = document.createElement('span');
        itemSpan.textContent = itemText;
        itemSpan.classList.add('item-text');
        listItem.appendChild(itemSpan);

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');

        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-btn');
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
        actionsDiv.appendChild(completeBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        actionsDiv.appendChild(deleteBtn);

        listItem.appendChild(actionsDiv);
        shoppingList.appendChild(listItem);

        itemInput.value = '';

        itemSpan.addEventListener('click', function() {
            listItem.classList.toggle('completed');
            if (listItem.classList.contains('completed')) {
                displayMessage('Item marcado como comprado!', 'success');
            } else {
                displayMessage('Item desmarcado.', 'info');
            }
        });

        completeBtn.addEventListener('click', function() {
            listItem.classList.toggle('completed');
            if (listItem.classList.contains('completed')) {
                displayMessage('Item marcado como comprado!', 'success');
            } else {
                displayMessage('Item desmarcado.', 'info');
            }
        });

        deleteBtn.addEventListener('click', function() {
            shoppingList.removeChild(listItem);
            displayMessage('Item removido da lista!', 'info');
        });
    }

    addItemBtn.addEventListener('click', addItem);

    itemInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addItem();
        }
    });

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
});