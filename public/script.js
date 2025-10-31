const notesContainer = document.querySelector("#note-grid");
const noteCardTemplate = document.querySelector("[data-note-card-template]");
const searchInput = document.querySelector("#search-input");

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

const fetchNotes = async () => {
	const url = "http://localhost:8000/api/v1/notes";
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const result = await response.json();
		const { data: notes } = result;
		return notes;
	} catch (error) {
		console.error(`Failed to fetch notes from ${url}:`, error);
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

searchInput.addEventListener("input", (e) => {
	const searchValue = e.target.value.toLowerCase();
	notesList.forEach((note) => {
		const isVisible = note.title.toLowerCase().includes(searchValue);
		note.element.classList.toggle("hide", !isVisible);
	});
});

loadApplication();
