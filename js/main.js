"use strict";

$(document).ready(function() {

	var apiKey = "U31QXBjycdeRrJ0gsnCQpvlaWLpvBBsb2QKCQqUL";

	var startDate = "2016-09-16";
	var endDate = "2016-09-17";

	var url = "https://api.nasa.gov/neo/rest/v1/feed?api_key="+apiKey+"&start_date="+startDate+"&end_date="+endDate;

	$.ajax({
		url: url,
		success: function(result) {

			console.log(result);

			for(let i in result.near_earth_objects[endDate]) {

				let asteroid = result.near_earth_objects[endDate][i];

				console.log(asteroid);
				console.log(asteroid.name);

				let hazardous = "Oui";

				if(!asteroid.is_potentially_hazardous_asteroid) hazardous = "Non";

				let missDistance = asteroid.close_approach_data[0].miss_distance.kilometers;
				let timestamp = moment(asteroid.close_approach_data[0].epoch_date_close_approach);
				let diameter = 
					Math.round((asteroid.estimated_diameter.meters.estimated_diameter_max + asteroid.estimated_diameter.meters.estimated_diameter_min) /2)
				;

				let element = `
					<li>
						<div>name : ${asteroid.name}
						<div>hazardous : ${hazardous}</div>
						<div>Hour Pass : ${timestamp}</div>
						<div>Miss distance : ${missDistance} kilometers</div>
						<div>Diameter : ${diameter} meters</div>
					</li>
				`;

				$('ul').append(element);
			}
		}
	});
});
