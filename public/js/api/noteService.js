import { fetchData } from "./baseApi.js";

export const getAllNotes = async (page = 1, limit = 10) => {
	try {
		const endpoint = `notes?page=${page}&limit=${limit}`;
		const notes = await fetchData("GET", null, endpoint);
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
		console.error("Failed to create new note.", error);
		throw error;
	}
};

export const deleteNote = async (noteId) => {
	try {
		const deleteNote = await fetchData("DELETE", null, `notes/${noteId}`);
		return deleteNote;
	} catch (error) {
		console.error("Failed to delete note.", error);
		throw error;
	}
};

export const updateNote = async (noteId, noteUpdates) => {
	try {
		const updateNote = await fetchData("PATCH", noteUpdates, `notes/${noteId}`);
		return updateNote;
	} catch (error) {
		console.error("Failed to delete note.", error);
		throw error;
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
