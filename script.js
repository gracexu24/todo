class List {
    constructor() {
        this.content = new Map();
    }

    add(task) {
        this.content.set(task, false);
        this.display();
    }

    complete(itemName) {
        console.log('done');
        this.content.set(itemName, true);
        this.display();
    }

    getContent() {
        return this.content;
    }
    
    delete(itemName) {
        this.content.delete(itemName);
        this.display();
    }

    display() {
        this.itemsDOM = document.querySelector('.items');
        this.itemsDOM.textContent = '';

        let i = 0;
        this.content.forEach((value, key) => {
            i++;
            const item = document.createElement('div');
            item.id = 'item' + i;

            const taskName = document.createElement('li');
            taskName.textContent = key;
            taskName.addEventListener('click', () => this.complete(key));
            item.appendChild(taskName);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'delete';
            deleteBtn.addEventListener('click', () => this.delete(key));
            item.appendChild(deleteBtn);

            if (value) {
                item.classList.add('done');
            }

            this.itemsDOM.appendChild(item);
        });
    }
}

const l = new List();
l.add("practice");
l.add("do homework");
l.add("wash dishes");


const dialog = document.querySelector('dialog');

document.querySelector(".add-task").addEventListener('click', () => {
    dialog.showModal();
});

const submitBtn = document.querySelector('button#submit');
const input = document.querySelector('#new-task');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    l.add(input.value);
    dialog.close();
});