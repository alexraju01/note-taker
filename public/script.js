const notesContainer = document.querySelector("#note-grid");
const userCardTemplate = document.querySelector("[data-note-card-template]");

async function loadNotes() {
	try {
		const response = await fetch("http://localhost:8000/api/v1/notes");

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const result = await response.json();
		const { data: notes } = result;

		renderNotes(notes);
	} catch (error) {
		console.error("Failed to load notes:", error);
	}
}

function renderNotes(notes) {
	notes.forEach((note) => {
		const card = userCardTemplate.content.cloneNode(true).children[0];

		const header = card.querySelector("[data-header]");
		const content = card.querySelector("[data-content]");

		header.textContent = note.title;
		content.textContent = note.content;

		notesContainer.append(card);
	});
}

loadNotes();
