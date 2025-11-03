import { createNote, deleteNote, getAllNotes } from "./api/noteService.js";

const notesContainer = document.querySelector("#note-grid");
const noteCardTemplate = document.querySelector("[data-note-card-template]");
const searchInput = document.getElementById("search-input");
const noteForm = document.getElementById("note-form");
const paginationContainer = document.querySelector("#pagination-controls");

let notesList = [];
let currentPage = 1;
let totalPages = 1; // This will be set based on the API response
const NOTES_PER_PAGE = 10; // The api for this is (limit) which by default is 10

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

const loadApplication = async (page = 1, limit = NOTES_PER_PAGE) => {
	const apiResponse = await getAllNotes(page, limit);
	console.log(apiResponse);
	if (apiResponse && apiResponse.data) {
		// --- Extract Data and Metadata ---
		const notes = apiResponse.data; // The array of notes
		currentPage = apiResponse.currentPage;
		totalPages = apiResponse.totalPages;

		// 2. Render the notes and pagination controls

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

const SubmitFormData = () => {
	if (!noteForm) return null;

	noteForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		const formData = getFormData(noteForm);

		console.log(formData);
		const newNote = await createNote(formData);
		window.location.href = `../index.html`;
		console.log("Note successfully created:", newNote);
	});
};
