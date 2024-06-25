const path = require("path");

module.exports = {
	// Other configurations like entry, output, etc.
	resolve: {
		fallback: {
			util: require.resolve("util/"),
			// Add other polyfills here if needed
		},
	},
	// Add other configurations as needed
};
