import { createNote, deleteNote, getAllNotes } from "./api/noteService.js";

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
	console.log(apiResponse);
	if (apiResponse && apiResponse.data) {
		const notes = apiResponse.data;
		// const currentPage = apiResponse.currentPage;
		// const totalPages = apiResponse.totalPages;

		// 2. Render the notes and pagination controls
		if (notes.length > 0) {
			notesList = renderNotes(notes);
			// renderPagination(totalPages, currentPage);
		} else {
			notesContainer.textContent = "No notes to display on this page.";
		}
	} else {
		notesContainer.textContent = "Failed to load notes or no data available.";
	}

	initSearch();
	SubmitFormData();
};

// ################ Future Implementation of pagination ###############

// const renderPagination = (totalPages, currentPage) => {
// 	if (!paginationContainer) return;
// 	paginationContainer.innerHTML = "";

// If the data is empty or only one page exists, hide controls
// if (totalPages <= 1) {
// 	paginationContainer.style.display = "none";
// 	return;
// }

// paginationContainer.style.display = "flex";

// Helper function (remains the same)
// const createButton = (text, pageNumber, isActive, isDisabled) => {
// 	const button = document.createElement("button");
// 	button.textContent = text;
// 	button.disabled = isDisabled;
// 	button.classList.add("pagination-btn");

// 	if (isActive) button.classList.add("active");

// 	button.addEventListener("click", () => {
// 		loadApplication(pageNumber);
// 	});
// 	return button;
// };

// // Helper function to create the '...' element
// const createEllipsis = () => {
// 	const span = document.createElement("span");
// 	span.textContent = "...";
// 	span.classList.add("pagination-ellipsis");
// 	return span;
// };

// // Define how many page numbers to show around the current page
// const sideCount = 1; // How many pages to show on either side of currentPage
// const startPage = Math.max(2, currentPage - sideCount);
// const endPage = Math.min(totalPages - 1, currentPage + sideCount);

// // --- 1. Previous Button ---
// const prevBtn = createButton("Previous", currentPage - 1, false, currentPage === 1);
// paginationContainer.append(prevBtn);

// // --- 2. Dynamic Page Numbers ---

// // A. Always show the FIRST page button (unless totalPages is tiny)
// if (totalPages > 0) {
// 	paginationContainer.append(createButton(1, 1, currentPage === 1, false));
// }

// // B. Render Left Ellipsis
// // Show '...' if the second page (2) is not visible
// if (startPage > 2) {
// 	paginationContainer.append(createEllipsis());
// }

// // C. Render Middle Block (around the current page)
// for (let i = startPage; i <= endPage; i++) {
// 	// Skip pages 1 and totalPages if they are within the calculated middle block
// 	if (i !== 1 && i !== totalPages) {
// 		paginationContainer.append(createButton(i, i, i === currentPage, false));
// 	}
// }

// // D. Render Right Ellipsis
// // Show '...' if the second-to-last page (totalPages - 1) is not visible
// if (endPage < totalPages - 1) {
// 	paginationContainer.append(createEllipsis());
// }

// // E. Always show the LAST page button
// if (totalPages > 1) {
// 	paginationContainer.append(
// 		createButton(totalPages, totalPages, currentPage === totalPages, false)
// 	);
// }

// // --- 3. Next Button ---
// const nextBtn = createButton("Next", currentPage + 1, false, currentPage === totalPages);
// paginationContainer.append(nextBtn);
// };

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
