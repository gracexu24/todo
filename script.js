

class List {
    constructor() {
    }
    
    add(task) {
        this.content.set(task, false);
        this.display();
    }

    complete(itemName) {
        fetch(`http://localhost:3001/markcomplete/${itemName}`, {
            method: 'GET'});
        this.display();
    }

    getContent() {
        return this.content;
    }
    
    delete(itemName) {
        fetch(`http://localhost:3001/deletetask/${itemName}`, {
            method: 'GET'});
        this.display();
    }

    display() {
        this.itemsDOM = document.querySelector('.items');
        this.itemsDOM.textContent = '';

        let i = 0;

        fetch('http://localhost:3001/displaytasks', {
            method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data.forEach(item => {
                    i++;

                    const itemDOM = document.createElement('div');
                    itemDOM.id = 'item' + i;

                    const taskName = document.createElement('li');
                    taskName.textContent = item.task;
                    taskName.addEventListener('click', () => this.complete(item.task));
                    itemDOM.appendChild(taskName);

                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'delete';
                    deleteBtn.addEventListener('click', () => this.delete(item.task));
                    itemDOM.appendChild(deleteBtn);

                    console.log(item.task);

                    if (item.completed == 1) {
                        itemDOM.classList.add('done');
                    }
                    else {
                        itemDOM.classList.remove('done');
                    }

                    this.itemsDOM.appendChild(itemDOM);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}

const l = new List();
l.display();


const dialog = document.querySelector('dialog');

document.querySelector(".add-task").addEventListener('click', () => {
    dialog.showModal();
});

const submitBtn = document.querySelector('button#submit');
const input = document.querySelector('#new-task');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/create/${input.value}`, {
        method: 'GET'});
    l.display();
    input.value = '';
    dialog.close();
});


