

class List {
    constructor() {
        this.content = new Map();
    }

    // Making a GET request to the '/products/123' endpoint
    //fetch('/dohw', {
    //    method: 'GET',
    //})
        // Handling the response by converting it to JSON
     //   .then(response => response.json())
        // Handling the data obtained from the response
     //   .then(data => {
        // Update UI with product details from the response
    //});
    
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


const dialog = document.querySelector('dialog');

document.querySelector(".add-task").addEventListener('click', () => {
    dialog.showModal();
});

const submitBtn = document.querySelector('button#submit');
const input = document.querySelector('#new-task');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    l.add(input.value);
    input.value = '';
    dialog.close();
});

fetch('http://localhost:3001/displaytasks', {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    data.forEach(item => {
        console.log(item);
        l.add(item.task);
    });
  })
  .catch(error => console.error('Error fetching data:', error));
