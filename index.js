const apiKey = "5aGWcVrg0aSd18hV3GgezGI4OEWDd70UuuGOrIRx";

function formatQueryParameters(params) {
	const queryItems = Object.keys(params)
	 .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
	return queryItems.join('&');
}

function displayParks(json) {
	$("#parks-container").removeClass("hidden");
	
	$("#parks-list").empty();
	
	
	
	json.data.forEach(function(park) {
		let ad = park.addresses[0];
		let full_ad = ad.line1 + ", " + ad.city + " " + ad.stateCode;
		full_ad = ad? full_ad : "No address found.";
		
		$("#parks-list").append(`
		<li>
			<h3>${park.fullName}</h3>
			<p class="display-block">${park.description}</p>
			<p class="display-block">${full_ad}</p>
			<p class="display-block">${park.url}</p>
		</li>`);
	});
	
	console.log(json);
}

function watchForm() {
	$("form").submit(function(event){
		event.preventDefault();
		let states = $("#state-select").val();
		let limit = $("#max-results").val();
		
		let options = {
			headers: new Headers({
				"accept": "application/json"
			})
		};
		
		let params = {
			"stateCode": states.join(","),
			"limit": parseInt(limit),
			"fields": "addresses",
			"api_key": apiKey
		};
		
		let url = "https://developer.nps.gov/api/v1/parks?" + formatQueryParameters(params);

		fetch(url, options)
		.then(function(response){
			if(response.ok) {
				console.log(response.body);
				return response.json();
			}
			else {
				console.log(response);
				throw new Error(response.statusText);
			}
		})
		.then(json => displayParks(json))
		.catch(err => alert(`${err}\nTry again.`));
	});
}

$(function() {
	console.log("App loaded. Watching form...");
	watchForm();
});
