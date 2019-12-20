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
	render();
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


// Grabbing radio values
let readValue;
var radios = document.forms["add-form"].elements["read"];
		for (var i=0; i < radios.length; i++) {
			radios[i].onclick = function() {
				readValue = (this.value == "true");
			}
		}

function addBookToLibrary() {
	let title = document.querySelector("#title");
	let author = document.querySelector("#author");
	let pages = document.querySelector("#pages");


	let newBook = new Book(title.value, author.value, pages.value, readValue);
	myLibrary.push(newBook);
	populateStorage();
	
	title.value = "";
	author.value = "";
	pages.value = "";

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

	display.innerHTML = "<tr><th scope=\"col\">Title</th><th scope=\"col\">Author</th><th scope=\"col\">Pages</th><th scope=\"col\">Read</th><th scope=\"col\">Delete</th></tr>";

  for (var i = 0; i < myLibrary.length; i++) {
		let currentBook = myLibrary[i]

		let currentNode = document.createElement("tr");
		currentNode.classList.add("book");

		let titleNode = document.createElement("td");
		titleNode.innerHTML = currentBook.title;
		currentNode.appendChild(titleNode);

		let authorNode = document.createElement("td");
		authorNode.innerHTML = currentBook.author;
		currentNode.appendChild(authorNode);

		let pagesNode = document.createElement("td");
		pagesNode.innerHTML = currentBook.pages;
		currentNode.appendChild(pagesNode);

		let readNode = document.createElement("td");
		let readBttn = document.createElement("button");
		readBttn.setAttribute("data-index", i);
		if (currentBook.read === true) {
			readBttn.innerText = "Read"
			readBttn.classList.add("bookRead");
		} else {
			readBttn.innerText = "Not read"
			readBttn.classList.add("bookUnread");
		}
		readBttn.addEventListener("click", toggleRead);
		readNode.appendChild(readBttn);
		currentNode.appendChild(readNode);		

		let deleteNode = document.createElement("td");
		
		
		deleteNode.innerHTML = "<button class=\"delete\" id=\"" + i + "\"data-index=\"" + i + "\">Delete</button>"; 
		deleteNode.addEventListener("click", deleteBook);


		currentNode.appendChild(deleteNode);

		

		// let buttonRead = document.createElement("button");
		// buttonRead.classList.add("buttonRead");
		// buttonRead.setAttribute("data-index", i);
		// buttonRead.innerText = "Toggle Read";
		// buttonRead.addEventListener("click", toggleRead)

		// currentNode.appendChild(buttonDel);
		// currentNode.appendChild(buttonRead);
		display.appendChild(currentNode);
		
  }
}

render();