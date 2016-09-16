"use strict";

$(document).ready(function() {

	/*******************/
	/*	  Variables    */
	/*******************/

	let startDate = "2016-09-16", //moment().format("YYYY-MM-DD");
		endDate = "2016-09-17"
	;

	const launchAtBegin = false;




	/*******************/
	/*	  Launching    */
	/*******************/

	checkHour();

	getConfiguration(function(apiKey) {

		const url = "https://api.nasa.gov/neo/rest/v1/feed?api_key="+apiKey+"&start_date="+startDate+"&end_date="+endDate;

		// Launch watching of Asteroids
		brucewillis(url);
	});



	/*******************/
	/*	  Functions    */
	/*******************/

	function getConfiguration(callback) {
		$.ajax({
			url: 'config.json',
			method: 'get',
			success: function(response) {
				console.log(response);

				callback(response.apikey);
			}
		})
	}

    // Get les datas asteroid du jour
	function brucewillis(url) {

		$.ajax({
			url: url,
			success: function(result) {

				// console.log(result);

				var asteroids = [];

				for(let i in result.near_earth_objects[endDate]) {

					let asteroid = result.near_earth_objects[endDate][i];

					// Create our own asteroid object with the formated datas we want
					let object = {
						name: asteroid.name,
						hazardous: "Oui",
						missDistance: asteroid.close_approach_data[0].miss_distance.kilometers,
						timestamp: moment(asteroid.close_approach_data[0].epoch_date_close_approach).format("HH:mm"),
						diameter: Math.round((asteroid.estimated_diameter.meters.estimated_diameter_max + asteroid.estimated_diameter.meters.estimated_diameter_min) /2)
					}

					// Change hour of one asteroid in order to match with current
					if(asteroid.name === "(2016 QL44)" && launchAtBegin) {
						object.timestamp = moment().format("HH:mm");
					}

					// Convert asterois hazard from boolean to text
					if(!asteroid.is_potentially_hazardous_asteroid) object.hazardous = "Non";

					// Push of our asteroid objects in asteroid global array
					asteroids.push(object);

					let element = `
						<li>
							<div><b>${object.name}</b></div>
							<div>hazardous : ${object.hazardous}</div>
							<div>Hour Pass : ${object.timestamp}</div>
							<div>Miss distance : ${object.missDistance} kilometers</div>
							<div>Diameter : ${object.diameter} meters</div>
						</li>
					`;

					$('ul').append(element);
				}

				// Launch the time watcher of asteroid hour pass and our current hour
				check(asteroids);
			}
		});
	}
    
    // Check le timestamp asteroid à maintenant
    function check(asteroids) {

    	console.log(asteroids);

    	for(let elem in asteroids) {
    		if(asteroids[elem].timestamp == moment().format("HH:mm")) {
    			impact(asteroids[elem].name);	
    		}
    	}

        setInterval(function() {

        	for(let elem in asteroids) {
        		if(asteroids[elem].timestamp == moment().format("HH:mm")) {
        			impact(asteroids[elem].name);	
        		}
        	}

        }, 1000*60);
    }

    // LittleBit
	function impact(asteroidName) {

		$('.showImpact').text(asteroidName + " is passing next to us");

		const makerKey = "jBdzjx6A04qjewchH_aRTAnKz_838X8VntQ4qCPay2Z",
			url = "https://maker.ifttt.com/trigger/asteroid/with/key/"+makerKey
		;

        $.ajax({
            url: url,
            method: 'POST',
            success: function(result) {
                console.log(result);
            }
        });
	}

	function checkHour() {

		setInterval(() => {
			$('.hour').text(moment().format("HH:mm:ss"));
		}, 1000);
	}

	$('.impact').on('click', () => {
		impact("test");
	});
});
