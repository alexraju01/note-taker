import { createNote, getNotes } from "./api/noteService.js";

const notesContainer = document.querySelector("#note-grid");
const noteCardTemplate = document.querySelector("[data-note-card-template]");
const searchInput = document.getElementById("search-input");
const noteForm = document.getElementById("note-form");

let notesList = [];

const createNoteCard = (note) => {
	const card = noteCardTemplate.content.cloneNode(true).children[0];

	const header = card.querySelector("[data-header]");
	const content = card.querySelector("[data-content]");
	const editBtn = card.querySelector('[data-action="edit"]');
	const deleteBtn = card.querySelector('[data-action="delete"]');

	// Set the content
	header.textContent = note.title;
	content.textContent = note.content;

	if (!editBtn || !deleteBtn) return null;

	editBtn.addEventListener("click", () => {
		console.log("edit note");
	});

	deleteBtn.addEventListener("click", () => {
		console.log("delete Note");
	});

	return card;
};

const renderNotes = (notes) => {
	if (!notesContainer) return null;
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
	const notes = await getNotes(); // Fetches all notes first

	if (notes && notes.length > 0) {
		notesList = renderNotes(notes);
	} else {
		notesContainer.textContent = "No notes to display.";
	}

	initSearch(); // Then initiates the search box
	SubmitFormData(); // Load the form last as it is not in the initial page
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

const SubmitFormData = () => {
	if (!noteForm) return null;

	noteForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		const formData = getFormData(noteForm);

		console.log(formData);
		const newNote = await createNote(formData);

		console.log("Note successfully created:", newNote);
	});
};
