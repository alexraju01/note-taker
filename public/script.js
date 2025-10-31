const notesContainer = document.querySelector("#note-grid");
const noteCardTemplate = document.querySelector("[data-note-card-template]");
const searchInput = document.querySelector("#search-input");
let notesList = [];

const createNoteCard = (note) => {
	// Clone the template content (deep clone)
	const card = noteCardTemplate.content.cloneNode(true).children[0];

	// Select the data-attributes within the cloned card
	const header = card.querySelector("[data-header]");
	const content = card.querySelector("[data-content]");

	// Set the content
	header.textContent = note.title;
	content.textContent = note.content;

	return card;
};

const renderNotes = (notes) => {
	// Clear the existing notes before rendering
	notesContainer.innerHTML = "";

	const newNotesList = notes.map((note) => {
		const cardElement = createNoteCard(note);

		// Append to the container
		notesContainer.append(cardElement);

		// Return structured data for search/filtering logic
		return {
			title: note.title,
			content: note.content,
			element: cardElement,
		};
	});

	return newNotesList;
};

const fetchNotes = async () => {
	const url = "http://localhost:8000/api/v1/notes";
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const result = await response.json();
		// Use object destructuring to safely access 'data'
		const { data: notes } = result;
		return notes;
	} catch (error) {
		console.error(`❌ Failed to fetch notes from ${url}:`, error);
		// Propagate the error or return an empty array if loading fails
		return [];
	}
};

const loadApplication = async () => {
	const notes = await fetchNotes();
	if (notes && notes.length > 0) {
		notesList = renderNotes(notes);
	} else {
		notesContainer.textContent = "No notes to display.";
	}
};

// loadNotes();

searchInput.addEventListener("input", (e) => {
	const searchValue = e.value.toLowerCase();
	notesList.forEach((note) => {
		const isVisible = note.title.toLowerCase().includes(searchValue);
		note.element.classList.toggle("hide", !isVisible);
	});
});

// Start the application
loadApplication();
