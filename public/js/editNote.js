import { getNoteById, updateNote } from "./api/noteService.js";
import { displayMessage } from "./displayMessage.js";

const form = document.getElementById("edit-note-form");
const titleInput = document.getElementById("edit-title");
const contentInput = document.getElementById("edit-content");
const idHiddenInput = document.getElementById("note-id-hidden");

const getNoteIdFromUrl = () => {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get("id");
};

const loadNoteForEditing = async () => {
	const noteId = getNoteIdFromUrl();

	if (!noteId) {
		return console.error("Could not load note editor");
	}

	try {
		// Fetch the existing note data from your server
		const { data: note } = await getNoteById(noteId);
		// Pre-fill the form with the current note data
		titleInput.value = note.title;
		contentInput.value = note.content;
		idHiddenInput.value = note.id; // Store the ID for the submission
	} catch (error) {
		console.error("Failed to load note:", error);
	}
};

const handleEditSubmit = () => {
	if (!form) return;

	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		const noteId = idHiddenInput.value;
		const updatedData = {
			title: titleInput.value,
			content: contentInput.value,
		};

		try {
			// Send the updated data to the server
			await updateNote(noteId, updatedData);
			displayMessage(form, "Successfully created the note", "success");
		} catch (error) {
			console.error("Update failed:", error);
			alert("Failed to save changes.");
		}
	});
};

loadNoteForEditing();
handleEditSubmit();
