import { createNote, deleteNote, getAllNotes } from "./api/noteService.js";
import { displayMessage } from "./displayMessage.js";

const notesContainer = document.querySelector("#note-grid");
const noteCardTemplate = document.querySelector("[data-note-card-template]");
const searchInput = document.getElementById("search-input");
const noteForm = document.getElementById("note-form");
// const paginationContainer = document.querySelector("#pagination-controls");

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
		const { id } = note;
		window.location.href = `./html/edit.html?id=${id}`;
	});

	deleteBtn.addEventListener("click", async () => {
		const { id } = note;
		const deletedNote = await deleteNote(id);
		if (deletedNote) {
			card.remove();
		} else {
			console.error("Failed to remove card after attempted deletion.");
		}
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

const loadApplication = async (page = 1, limit = 10) => {
	const apiResponse = await getAllNotes(page, limit);
	if (apiResponse && apiResponse.data) {
		const notes = apiResponse.data;

		if (notes.length > 0) {
			notesList = renderNotes(notes);
		} else {
			notesContainer.textContent = "No notes to display on this page.";
		}
	} else {
		notesContainer.textContent = "Failed to load notes or no data available.";
	}

	initSearch();
	SubmitFormData();
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
const formMessage = document.getElementById("form-message");
const SubmitFormData = () => {
	// We no longer need document.getElementById("form-message");

	if (!noteForm) return null;

	noteForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		// Use the form itself as the target container for the dynamic message
		const messageContainer = noteForm;

		try {
			const formData = getFormData(noteForm);
			await createNote(formData);

			// Call the dynamic function, passing the form as the container
			displayMessage(messageContainer, "Successfully created the note!", "success");

			noteForm.reset();
		} catch (error) {
			// Call the dynamic function for the error message
			displayMessage(messageContainer, error.message, "error");
		}
	});
};
