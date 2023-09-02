/* Book Class */
const library = new Map();

function Book(title, author, pages) {

    this.id = window.crypto.randomUUID(),
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.isRead = false;

}

/* DOM Helper Functions */
function createElementAppend(type, className, parent, text) {
    const el = document.createElement(type);
    el.classList.add(className);
    if(text) {
        el.textContent = text;
    }
    parent.appendChild(el);
    return el;
}

function createBookElement(book) {

    const libraryEl = document.querySelector('.library');

    const book_div = createElementAppend('div', 'book', libraryEl);
    book_div.setAttribute('data-book-id', book.id);
    const book_info = createElementAppend('div', 'book-info', book_div);
    const book_buttons = createElementAppend('div', 'book-buttons', book_div);
    
    createElementAppend('h1', 'title', book_info, book.title);
    createElementAppend('p', 'author', book_info, 'By: ' + book.author);
    createElementAppend('p', 'pages', book_info, 'Pages: ' + book.pages);

    const button_read = createElementAppend('button', 'book-button-read', book_buttons, 'Read');
    const button_delete = createElementAppend('button', 'book-button-delete', book_buttons, 'Delete');

    button_read.addEventListener('click', function(event) {
        
        // The "closest" method traverses up to the root, returning the first match for the selector criteria
        const button = this;
        const book_div = this.closest('.book');
        const book_id = book_div.getAttribute('data-book-id');
        const book = library.get(book_id);

        if(book.isRead) {
            book.isRead = false;
            button.textContent = 'Read';
        } else {
            book.isRead = true;
            button.textContent = 'Not Read';
        }           
        
    });

    button_delete.addEventListener('click', function(event) {

        const book_div = this.closest('.book');
        const book_id = book_div.getAttribute('data-book-id');
        
        // Remove from library map, then remove from dom
        library.delete(book_id);
        book_div.remove();

    })

}

/* Modal */
const modal_add_book = document.querySelector("#modal-add-book");

document.querySelector('#button-add-book').addEventListener('click', () => {
    modal_add_book.showModal();
});

document.querySelector('#modal-button-close').addEventListener('click', (event) => {
    event.preventDefault();
    closeModal(modal_add_book);
})

document.querySelector('#modal-button-add').addEventListener('click', (event) => {
    event.preventDefault(); // This avoids the normal button "submit" functionality

    title = document.querySelector('#title');
    author = document.querySelector('#author');
    pages = document.querySelector('#pages');

    book = new Book(title.value, author.value, pages.value);
    library.set(book.id, book);
    createBookElement(book);

    closeModal(modal_add_book);

});

function closeModal(modal) {
    const inputs = modal.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
    modal.close();
}


/* Initialize Library */
const book1 = new Book('Intelligent Design', 'William Dembski', 312);
const book2 = new Book('Book 2', 'Author 2', 123); 
const book3 = new Book('Book 3', 'Author 3', 456);

library.set(book1.id, book1);
library.set(book2.id, book2);
library.set(book3.id, book3);

library.forEach(book => createBookElement(book));

