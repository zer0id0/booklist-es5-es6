//Book Constructor
function Book (title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI() {}
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  //Create tr Element
  const row = document.createElement('tr');
//Insert cols 
row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a></td>
`;

list.appendChild(row);
}
//Show Alert
UI.prototype.showAlert = function(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  //Add text
  div.appendChild(document.createTextNode(message));
  //Get Parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  //instert alert
  container.insertBefore(div , form);
  
  //Timeout after 3 sec
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000)

}

//Delete Book (Event deletagtion)
UI.prototype.deleteBook = function (target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

//Clear Fields
UI.prototype.clearFields = function() { 
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

//Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  //Get form Values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

// Instantiate book
const book = new Book (title , author , isbn);

//Instantiate UI
const ui = new UI();

//Validate 
if (title === '' || author === '' || isbn === '' ) {
  // Error alert 
  ui.showAlert('Please fill in all fields', 'error');
} else {
  
//Add book to list
ui.addBookToList(book)
//Show Success
ui.showAlert('Book Added!', 'success');

//Clear Input fields
ui.clearFields();

}

e.preventDefault();
});

//Event Listerner for delete

document.getElementById('book-list').addEventListener('click', function(e){

//Instantiate UI
const ui = new UI();

//Delete Book
ui.deleteBook(e.target);

//Show message 
ui.showAlert('book Removed', 'success');



e.preventDefault()
})