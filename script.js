
const bookTitle = document.querySelector('#title-input');
const bookAuthor = document.querySelector('#author-input'); 
const bookPages = document.querySelector('#page-input'); 
const readStatus = document.querySelector('#read'); 
const submitBtn = document.querySelector('#submit');
const textInput = Array.from(document.querySelectorAll('.text'));
const table = document.querySelector('table');


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

let myLibrary = [];
let deleteNumber = 0;
let statusNumber = 0;
let rowNumber = 0;

submitBtn.addEventListener('click', function() {

    // Check that user is submitting empty values
    if (!bookTitle.value || !bookAuthor.value || !bookPages.value) return;

    // Add the books in the library 
    const book = new Book(bookTitle.value, bookAuthor.value, bookPages.value, readStatus.checked);
    myLibrary.push(book);
    textInput.forEach(input => input.value = '');

    // Display the library
    const row = document.createElement('tr');
    row.setAttribute('id',`${rowNumber}`);
    rowNumber++;

    const columnTitle = document.createElement('td');
    columnTitle.textContent = `${book.title}`;
    row.appendChild(columnTitle);

    const columnAuthor = document.createElement('td');
    columnAuthor.textContent = `${book.author}`;
    row.appendChild(columnAuthor);

    const columnPages = document.createElement('td');
    columnPages.textContent = `${book.pages}`;
    row.appendChild(columnPages);

    const columnStatus = document.createElement('td');
    const statusButton = document.createElement('button');
    if (!book.read) {
        statusButton.textContent = 'Not yet';
        statusButton.setAttribute('id', `${statusNumber}`);
        statusNumber++;
        statusButton.classList.add('not', 'button');
       
        columnStatus.appendChild(statusButton);
        row.appendChild(columnStatus);
    }
    else {
        statusButton.textContent = 'Read';
        statusButton.setAttribute('id', `${statusNumber}`);
        statusNumber++;
        statusButton.classList.add('read-status','button');
        
        columnStatus.appendChild(statusButton);
        row.appendChild(columnStatus);
    }

    const columnRemove = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Delete';
    removeButton.setAttribute('id', `${deleteNumber}`);
    deleteNumber++;

    removeButton.classList.add('delete', 'button');
    columnRemove.appendChild(removeButton);
    row.appendChild(columnRemove);
    
    table.appendChild(row);
    
    
    // Update the library 
    const tableBody = document.querySelector('table');
    tableBody.addEventListener('click', function(e) {
    
        e.stopImmediatePropagation();
        const element = e.target;
        
        const string = element.getAttribute('class');
        if (!string) return;
        const word = string.split(' ');
        const attribute = word[0];

        // Book status
        if (attribute == 'not') {
            element.textContent = 'Read';
            element.setAttribute('class','read-status button');
        
        }
        else if (attribute == 'read-status') {
            element.textContent = 'Not yet';
            element.setAttribute('class','not button')
        }

        // Remove the book in the library
        else if (attribute == 'delete') {
            const index = element.getAttribute('id');
            
            if (index > -1) {
                myLibrary.splice(index, 1);
            }
            const rows = Array.from(document.querySelectorAll('tr'));
            rows.forEach(row => row.addEventListener('click', function(e) {
                row.remove();
            }));
        }
    });
});