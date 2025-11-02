// public/editScript.js (Assuming you have updateNote and getNoteById functions in noteService.js)
import { getNoteById, updateNote } from "./api/noteService.js";

const form = document.getElementById("edit-note-form");
const titleInput = document.getElementById("edit-title");
const contentInput = document.getElementById("edit-content");
const idHiddenInput = document.getElementById("note-id-hidden");

const getNoteIdFromUrl = () => {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get("id"); // Gets the 'id' from ?id=...
};

const loadNoteForEditing = async () => {
	const noteId = getNoteIdFromUrl();

	if (!noteId) {
		alert("Note ID missing. Cannot edit.");
		window.location.href = "/index.html"; // Redirect back
		return;
	}

	try {
		// Fetch the existing note data from your server
		const note = await getNoteById(noteId);

		// Pre-fill the form with the current note data
		titleInput.value = note.title;
		contentInput.value = note.content;
		idHiddenInput.value = note.id; // Store the ID for the submission
	} catch (error) {
		console.error("Failed to load note:", error);
		alert("Error loading note for editing.");
		window.location.href = "/index.html";
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
			const updatedNote = await updateNote(noteId, updatedData);

			alert("Note successfully updated!");
			window.location.href = "/index.html"; // Redirect to dashboard
		} catch (error) {
			console.error("Update failed:", error);
			alert("Failed to save changes.");
		}
	});
};

loadNoteForEditing();
handleEditSubmit();
