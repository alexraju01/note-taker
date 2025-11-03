class APIFeature {
	constructor(model, queryString) {
		// 'model' will be the Sequelize model (e.g., Note)
		this.model = model;
		this.queryString = queryString;
		// Initialize an empty options object for Sequelize
		this.queryOptions = {};
	}

	paginate() {
		// Setting defaults for page:1 and limit:10 if not specified
		const page = parseInt(this.queryString.page, 10) || 1;
		const limit = parseInt(this.queryString.limit, 10) || 10;

		// 'offset' the index position of the item
		const offset = (page - 1) * limit;

		// Store the pagination parameters in the queryOptions object
		this.queryOptions.limit = limit;
		this.queryOptions.offset = offset;
		this.queryOptions.page = page;

		return this;
	}

	async execute() {
		// Use findAndCountAll to get both the paginated data and the total count
		const result = await this.model.findAndCountAll(this.queryOptions);

		// Return a structured object containing the data and pagination metadata
		return {
			notes: result.rows,
			count: result.count,
			limit: this.queryOptions.limit,
			page: this.queryOptions.page,
		};
	}
}

module.exports = APIFeature;
