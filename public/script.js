// This function runs when the page loads
document.addEventListener("DOMContentLoaded", () => {
	fetchNotes();
});

async function fetchNotes() {
	try {
		// 1. Make the request to your Express API endpoint
		// NOTE: If your API and website are running on different ports (e.g., 5000 and 8080),
		// you might need to enable CORS in your Express app.
		const response = await fetch("http://localhost:8000/api/v1/notes");

		// 2. Check for HTTP errors (e.g., 404, 500)
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		// 3. Parse the JSON response body
		const result = await response.json();
		const { data } = result; // Assuming your API returns { status: 'success', data: [...] }
		console.log(data);
		// 4. Use the data to update your website's UI
	} catch (error) {
		console.error("Could not fetch notes:", error);
		document.getElementById("notes-list").innerHTML =
			'<p style="color: red;">Error loading data.</p>';
	}
}
