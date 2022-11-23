
// artistData - It fetches the Artist's Name from the JSON file response
var artistData = new XMLHttpRequest();

artistData.onreadystatechange = function () {
	if ((artistData.readyState === 4) && (artistData.status === 200)) {
		var extractData = JSON.parse(artistData.responseText);
		// It places the extracted Artist's Name in the header element of the Html
		var artistName = document.getElementById("artistNameHeader");
		artistName.innerHTML = extractData.artist.name;
	}
}

// artistTopFiveAlbums - It fetches the Cover Art and the Information of the Top 5 albums
var artistTopFiveAlbums = new XMLHttpRequest();

artistTopFiveAlbums.onreadystatechange = function () {
	if ((artistTopFiveAlbums.readyState === 4) && (artistTopFiveAlbums.status === 200)) {
		var topFiveAlbums = JSON.parse(artistTopFiveAlbums.responseText);

		// It makes the "Top 5 Albums" header to display in the GUI
		var topAlbumsHeader = document.getElementById("topAlbumsHeader");
		topAlbumsHeader.innerHTML = "Top 5 albums" ;

		// It loops through the JSON file and makes the Top 5 Albums' cover and info to display in a table
		for (var i = 0; i < 5; i++) {
			var topAlbumsList = document.getElementById("disc" + i);
			topAlbumsList.innerHTML = "<img src='" + topFiveAlbums.topalbums.album[i].image[0]["#text"] + "'>" + topFiveAlbums.topalbums.album[i].name;
		}
	}
}


// requestArtistData - It executes the AJAX GET requests from the API
function requestArtistData() {
	let apiRoot =  "http://ws.audioscrobbler.com/2.0/?",
		apiKey = "fb6515c4da805c48249b4baa7bcec4fc"
  
	if (!searchArtist.value) {
		} 
	
	else {
		// Search artist data (ie Name and Top 5 albums) from input
		artistData.open("GET", apiRoot + "method=artist.getinfo&artist=" + searchArtist.value + "&api_key=" + apiKey + "&format=json");
		artistTopFiveAlbums.open("GET", apiRoot + "method=artist.gettopalbums&artist=" + searchArtist.value + "&api_key=" + apiKey + "&format=json");

		artistData.send();
		artistTopFiveAlbums.send();

		// Reset the input field after executing the search
		searchArtist.value = "";
	}
}

