const apiKey = "5aGWcVrg0aSd18hV3GgezGI4OEWDd70UuuGOrIRx";

function formatQueryParameters(params) {
	const queryItems = Object.keys(params)
	 .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
	return queryItems.join('&');
}

function displayRepos(json, handle) {
	$("#repos-container").removeClass("hidden");
	$("#repos-header").html(`Repo List for User ${handle}`);
	
	$("#repos-list").empty();
	
	json.forEach(function(repo) {
		$("#repos-list").append(`
		<li>
			<h3>${repo.name}</h3>
			<p><a href="${repo.html_url}">Link</a></p>
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
				"X-Api-Key": apiKey
			})
		};
		
		let params = {
			"stateCode": states.join(","),
			"limit": limit
		};
		
		let url = "https://developer.nps.gov/api/v1/parks?" + formatQueryParameters(params);
		
		fetch(url, options)
		.then(function(response){
			if(response.ok) {
				return response.json();
			}
			else {
				console.log(response);
				throw new Error(response.statusText);
			}
		})
		.then(json => displayRepos(json, handle))
		.catch(err => alert(`${err}\nTry again.`));
	});
}

$(function() {
	console.log("App loaded. Watching form...");
	watchForm();
});
