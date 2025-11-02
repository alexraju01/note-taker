import { fetchData } from "./baseApi.js";

export const getNotes = async () => {
	try {
		const notes = await fetchData();
		return notes;
	} catch (error) {
		console.error("Failed to retrieve notes list.", error);
		return [];
	}
};

export const createNote = async (newNote) => {
	try {
		const notes = await fetchData("POST", newNote);
		return notes;
	} catch (error) {
		console.error("Failed to craete new note.", error);
		return [];
	}
};

export const deleteNote = async (noteId) => {
	try {
		const deleteNote = await fetchData("DELETE", null, `notes/${noteId}`);
		return deleteNote;
	} catch (error) {
		console.error("Failed to delete note.", error);
	}
};
