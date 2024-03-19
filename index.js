const myLibrary = [];
const toggleModal = document.querySelectorAll('.modal');
const Table = document.querySelector('table');
const modal = document.querySelector('dialog');
const submitButton = document.querySelector('input[type=submit]');

for (const book of myLibrary) displayBook(book);

// Toggle the modal and other elements in the main(.body) container.
toggleModal.forEach((button) => {
    button.addEventListener('click', () => {
        modal.classList.toggle('hidden');
        Table.classList.toggle('hidden');
        document.querySelector('.new-book').classList.toggle('hidden');
    });
});

// Listen for clicks on the dynamic buttons in the action column
Table.addEventListener('click', (event) => {
    const target = event.target;
    if (target.id !== 'remove' && target.id !== 'change') return;
    const row = target.parentElement.parentElement;
    const index = +row.dataset.index;

    if (target.id == 'remove') {
        row.remove();
        myLibrary.splice(index, 1);
    }
    else if (target.id == 'change') {
        const read = myLibrary[index].changeRead();
        row.childNodes[2].innerText = read;
    }
});

// Allow user to add a book to the library
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    Table.classList.toggle('hidden');
    document.querySelector('.new-book').classList.toggle('hidden');

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').value;

    const book = addBookToLibrary(title, author, pages, read);
    displayBook(book);

    modal.classList.toggle('hidden');
});


// Constructor function for books.
function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

// Add function to constructor prototype
Book.prototype.changeRead = function () {
    this.read = (this.read == 'No') ? 'Yes' : 'No';
    return this.read;
}

// Function for adding new books to the library
function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    return book;
}

// Display in the table 
function displayBook(book) {
    const row = document.createElement('tr');
    row.setAttribute('data-index', `${myLibrary.length - 1}`);

    let rowData = [];
    for (let i = 0; i < 4; i++) rowData.push(document.createElement('td'));
    
    const title = rowData.pop();
    title.innerText = `${book.title} by ${book.author}`;
    title.setAttribute('class', 'title');

    const pages = rowData.pop();
    pages.innerText = `${book.pages}`;
    pages.setAttribute('class', 'pages');

    const read = rowData.pop();
    read.innerText = `${book.read}`
    read.setAttribute('class', 'read');

    const action = rowData.pop();
    action.setAttribute('class', 'action');

    const Read = '<button id=change>Read</button>';
    const Remove = '<button id=remove>Remove</button>';
    action.innerHTML += Remove;
    action.innerHTML += Read;

    rowData = [title, pages, read, action];

    for (const data of rowData) row.append(data);

    Table.append(row);
}