import { getNotes } from "./api/noteService.js";

const notesContainer = document.querySelector("#note-grid");
const noteCardTemplate = document.querySelector("[data-note-card-template]");
const searchInput = document.getElementById("search-input");
const noteForm = document.getElementById("note-form");

let notesList = [];

const createNoteCard = (note) => {
	const card = noteCardTemplate.content.cloneNode(true).children[0];

	const header = card.querySelector("[data-header]");
	const content = card.querySelector("[data-content]");

	// Set the content
	header.textContent = note.title;
	content.textContent = note.content;

	return card;
};

const renderNotes = (notes) => {
	notesContainer.innerHTML = "";

	const newNotesList = notes.map((note) => {
		const cardElement = createNoteCard(note);

		notesContainer.append(cardElement);

		return {
			title: note.title,
			content: note.content,
			element: cardElement,
		};
	});

	return newNotesList;
};

const getFormData = (formElement) => {
	if (!formElement) null;

	return Object.fromEntries(new FormData(formElement).entries());
};

const loadApplication = async () => {
	initSearch();
	const notes = await getNotes();
	if (notes && notes.length > 0) {
		notesList = renderNotes(notes);
	} else {
		notesContainer.textContent = "No notes to display.";
	}
};

const initSearch = () => {
	if (!searchInput) return null;

	searchInput.addEventListener("input", (e) => {
		const searchValue = e.target.value.toLowerCase();
		notesList.forEach((note) => {
			const isVisible = note.title.toLowerCase().includes(searchValue);
			note.element.classList.toggle("hide", !isVisible);
		});
	});
};

loadApplication();

noteForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const formData = getFormData(noteForm);

	console.log(formData);
});
