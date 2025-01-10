class List {
    constructor() {
        this.content = new Map();
    }

    addToList(task) {
        this.content.set(task, false);
    }

    getContent() {
        return this.content;
    }

    display() {
        this.itemsDOM = document.querySelector('.items');
        this.itemsDOM.textContent = '';

        let i = 0;
        this.content.forEach((value, key) => {
            i++;
            const item = document.createElement('div');
            item.id = 'item' + i;
            console.log(key, value);

            const taskName = document.createElement('li');
            taskName.textContent = key;
            item.appendChild(taskName);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'delete';
            item.appendChild(deleteBtn);

            this.itemsDOM.appendChild(item);
        });
    }
}

//adds functionality to all buttons
(function () {
    const dialog = document.querySelector('dialog');
    document.querySelector(".add-task").addEventListener('click', () => {
        dialog.showModal();
    });

    const submitBtn = document.querySelector('button#submit');
    document.addEventListener('click', () => {

    });

    const tasks = document.querySelector('.tasks');
})();