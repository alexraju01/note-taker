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
