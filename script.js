// Add a button on each book’s display to remove the book from the library.
// You will need to associate your DOM elements with the actual book objects in some way. One easy solution is giving them a data-attribute that corresponds to the index of the library array.


// Debug input for reach checkbox - switch to radio buttons
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


function addBookToLibrary() {
	let title = document.querySelector("#title");
	let author = document.querySelector("#author");
	let pages = document.querySelector("#pages");
	let read = document.querySelector("#read").value;
	if (read === "on") {
		read = true;
	} else {
		read = false;
	}
	let newBook = new Book(title.value, author.value, pages.value, read);
	myLibrary.push(newBook);
	
	// Clear input field
	title.value = "";
	author.value = "";
	pages.value = "";
	// Clear button value???

	display.innerHTML = "";
	render();
}

var submitBttn = document.querySelector("#submit");
submitBttn.addEventListener("click", addBookToLibrary);

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