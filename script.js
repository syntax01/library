
const library = [];

function Book(title, author, pages) {

    this.title = title,
    this.author = author,
    this.pages = pages;

}

function createElementAppend(type, className, parent, text) {
    const el = document.createElement(type);
    el.classList.add(className);
    if(text) {
        el.textContent = text;
    }
    parent.appendChild(el);
    return el;
}

function createBookElement(title, author, pages) {

    const libraryEl = document.querySelector('.library');

    const book = createElementAppend('div', 'book', libraryEl);
    const book_info = createElementAppend('div', 'book-info', book);
    const book_buttons = createElementAppend('div', 'book-buttons', book);
    
    createElementAppend('h1', 'title', book_info, title);
    createElementAppend('p', 'author', book_info, author);
    createElementAppend('p', 'pages', book_info, pages);

    createElementAppend('button', 'book-button-read', book_buttons, 'Read');
    createElementAppend('button', 'book-button-delete', book_buttons, 'Delete');

}

library.push(new Book('Intelligent Design', 'William Dembski', 312));
library.push(new Book('Book Title 2', 'Author 2', 123));
library.push(new Book('Book Title 3', 'Author 3', 456));

library.forEach((book) => {
    createBookElement(book.title, book.author, book.pages);

    }
)