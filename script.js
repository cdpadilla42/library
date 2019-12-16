var x = 3;

var myLibrary = [];
var display = document.querySelector(".library");


function Book (title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function () {
		let readString;
		if (read) {
			readString = "read";
		} else {
			readString = "not read yet";
		}
		return `${title} by ${author}, ${pages} pages, ${readString}`;
	}
}

var pooh = new Book ("Winnie the Pooh", "James", 50, true);
myLibrary.push(pooh);
var hp = new Book ("Harry Potter", "James", 100, true);
myLibrary.push(hp);

Book.prototype.print = function () {
  console.log("Printing...");
}

pooh.info();


function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function render() {
  for (var i = 0; i < myLibrary.length; i++) {
    let text = myLibrary[i].info();
    let currentNode = document.createElement('div');
    currentNode.textContent = text;
    currentNode.classList.add("book")
    display.appendChild(currentNode);
  }
}

render();