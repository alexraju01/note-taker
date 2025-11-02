import { fetchData } from "./baseApi.js";

export const getAllNotes = async () => {
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

export const updateNote = async (noteId, noteUpdates) => {
	try {
		const updateNote = await fetchData("PATCH", noteUpdates, `notes/${noteId}`);
		return updateNote;
	} catch (error) {
		console.error("Failed to delete note.", error);
	}
};

export const getNoteById = async (noteId) => {
	try {
		const updateNote = await fetchData("GET", null, `notes/${noteId}`);
		return updateNote;
	} catch (error) {
		console.error("Failed to delete note.", error);
	}
};
