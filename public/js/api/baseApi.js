export const fetchData = async (method = "GET", data = null, endpoint = "notes") => {
	const url = `http://localhost:8000/api/v1/${endpoint}`;

	const config = {
		method,
		headers: {
			"Content-Type": "application/json",
		},
	};

	if (data && ["POST", "PUT", "PATCH"].includes(config.method)) {
		config.body = JSON.stringify(data);
	}

	try {
		const response = await fetch(url, config);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		if (response.status === 204) {
			console.log(`Successfully completed ${method} request to ${url} with 204 No Content.`);
			return {}; // Return an empty object or true to signal success
		}

		const data = await response.json();
		return data;
		// Use result.data if available, otherwise return the whole result
	} catch (error) {
		console.error(`API execution failed for ${config.method} ${url}:`, error);
		throw error;
	}
};
