// Make it pretty!!

// Debug input for reach checkbox - switch to radio buttons

// ACCESSING LOCAL STORAGE
var myLibrary = [];

if (!localStorage.length > 0) {
	// sets default books in storage
	var pooh = new Book ("Winnie the Pooh", "James", 50, true);
	myLibrary.push(pooh);
	var hp = new Book ("Harry Potter", "James", 100, true);
	myLibrary.push(hp);
	populateStorage();
} else {
	document.addEventListener("DOMContentLoaded", renderLibrary);
}

function populateStorage() {
	localStorage.setItem("libraryArray", JSON.stringify(myLibrary));
};

function renderLibrary() {
	myLibrary = JSON.parse(localStorage.getItem("libraryArray"))
	render();
}


// SETTING OBJECT CONSTRUCTOS


var display = document.querySelector(".library");


function Book (title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function () {
		let readString;
		if (this.read === true) {
			readString = "read";
		} else {
			readString = "not read yet";
		}
		return `${title} by ${author}, ${pages} pages, ${readString}`;
	}
}

function bookInfo(obj) {
	let readString;
	if (obj.read === true) {
		readString = "read";
	} else {
		readString = "not read yet";
	}
	return `${obj.title} by ${obj.author}, ${obj.pages} pages, ${readString}`;
}


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
	populateStorage();
	
	// Clear input field
	title.value = "";
	author.value = "";
	pages.value = "";
	// Clear button value???

	refreshDisplay();
}

function refreshDisplay() {
	display.innerHTML = "";
	render();
}

function deleteBook(e) {
	var index = e.target.attributes["data-index"].value
	myLibrary.splice(index, 1);
	populateStorage();
}

function toggleRead(e) {
	var index = e.target.attributes["data-index"].value
	let current = myLibrary[index];
	current.read = !current.read;
	populateStorage();
}

var submitBttn = document.querySelector("#submit");
submitBttn.addEventListener("click", addBookToLibrary);

function render() {
  for (var i = 0; i < myLibrary.length; i++) {
		let text = bookInfo(myLibrary[i]);
		let name = myLibrary[i].title;

		let currentNode = document.createElement('div');
		currentNode.classList.add("book")
		currentNode.innerHTML = text;

		let buttonDel = document.createElement("button");
		buttonDel.classList.add("delete");
		buttonDel.setAttribute("data-index", i);
		buttonDel.innerText = "Delete";
		buttonDel.addEventListener("click", deleteBook)

		let buttonRead = document.createElement("button");
		buttonRead.classList.add("buttonRead");
		buttonRead.setAttribute("data-index", i);
		buttonRead.innerText = "Toggle Read";
		buttonRead.addEventListener("click", toggleRead)

		currentNode.appendChild(buttonDel);
		currentNode.appendChild(buttonRead);
		display.appendChild(currentNode);
		
  }
}

render();