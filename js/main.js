"use strict";

$(document).ready(function() {

	let makerKey = "jBdzjx6A04qjewchH_aRTAnKz_838X8VntQ4qCPay2Z";

	var apiKey = "U31QXBjycdeRrJ0gsnCQpvlaWLpvBBsb2QKCQqUL";

	var startDate = "2016-09-16";
	var endDate = "2016-09-17";

	var url = "https://api.nasa.gov/neo/rest/v1/feed?api_key="+apiKey+"&start_date="+startDate+"&end_date="+endDate;

	brucewillis(url);

	function brucewillis(url) {

		$.ajax({
			url: url,
			success: function(result) {

				console.log(result);

				var asteroids = [];

				for(let i in result.near_earth_objects[endDate]) {

					let asteroid = result.near_earth_objects[endDate][i];

					console.log(asteroid);

					let object = {
						name: asteroid.name,
						hazardous: "Oui",
						missDistance: asteroid.close_approach_data[0].miss_distance.kilometers,
						timestamp: moment(asteroid.close_approach_data[0].epoch_date_close_approach),
						diameter: Math.round((asteroid.estimated_diameter.meters.estimated_diameter_max + asteroid.estimated_diameter.meters.estimated_diameter_min) /2)
					}

					if(!asteroid.is_potentially_hazardous_asteroid) object.hazardous = "Non";

					asteroids.push(object);

					let element = `
						<li>
							<div>name : ${object.name}
							<div>hazardous : ${object.hazardous}</div>
							<div>Hour Pass : ${object.timestamp}</div>
							<div>Miss distance : ${object.missDistance} kilometers</div>
							<div>Diameter : ${object.diameter} meters</div>
						</li>
					`;

					functionKarimjy(asteroids);

					$('ul').append(element);
				}
			}
		});
	}

	function functionKarimjy(asteroids) {
		console.log(asteroids);
	}
});
