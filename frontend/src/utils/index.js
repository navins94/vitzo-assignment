const generateSearchTerm = (activePage) => {
	let searchTerm = [];
	if (activePage) {
		searchTerm.push(`page=${activePage}`);
	}

	searchTerm = searchTerm.join('&');
	return `/?${searchTerm}`;
};

export { generateSearchTerm };
