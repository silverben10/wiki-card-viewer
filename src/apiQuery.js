// const fetch = require("node-fetch");

async function searchWiki(searchTerm) {
	let url =
		"https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" +
		searchTerm +
		"&origin=*"; // We send an unauthenticated CORS request thingy

	const response = await fetch(url);
	const data = await response.json();
	let results = await formatResponse(data);
	results = await appendImages(results);

	return results;
}

function formatResponse(data) {
	let results = [];
	for (let i = 0; i < data[1].length; i++) {
		let element = {
			title: data[1][i],
			description: data[2][i],
			link: data[3][i],
			imgUrl: ""
		};

		results.push(element);
	}
	return results;
}

async function appendImages(results) {
	for (let element of results) {
		let url =
			"https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages&pithumbsize=500&titles=" +
			element.title +
			"&origin=*";

		const response = await fetch(url);
		const data = await response.json();
		let thumbUrl;

		try {
			thumbUrl = data.query.pages[0].thumbnail.source;
		} catch (e) {
			console.log("Thumbnail not found. Appended default instead.");
			thumbUrl =
				"https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/500px-Wikipedia-logo-v2.svg.png";
		}

		element.imgUrl = thumbUrl;
	}

	return results;
}

export { searchWiki, formatResponse, appendImages };
