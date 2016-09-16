"use strict";

$(document).ready(function() {

	var apiKey = "U31QXBjycdeRrJ0gsnCQpvlaWLpvBBsb2QKCQqUL";

	var startDate = "2016-09-16";
	var endDate = "2016-09-16";

	var url = "https://api.nasa.gov/neo/rest/v1/feed?api_key="+apiKey+"&start_date="+startDate+"&end_date="+endDate;

	$.ajax({
		url: url,
		success: function(result) {

			console.log(result);

			for(let i in result.near_earth_objects[startDate]) {

				let asteroid = result.near_earth_objects[startDate][i];

				console.log(asteroid);
				console.log(asteroid.name);

				// let test = asteroid.absolute_magnitude_h;

				let element = `
					<li>
						test
					</li>
				`;

				$('ul').append(element);


			}
		}
	});
});
