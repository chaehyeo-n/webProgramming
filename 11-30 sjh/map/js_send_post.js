$(document).on('click', '#submit_button', function() {
	const url = 'optimalRouteCompute.jsp';
	
	const form = document.createElement('form'); // form 태그 생성
	form.setAttribute('method', 'post'); // 전송 방식 결정 (get or post)
	form.setAttribute('action', url); // 전송할 url 지정
	
	let promises = [];
	
	// hashmap 저장
	for (let [key, value] of place_result_hashmap) {
		let promise = new Promise((resolve, reject) => {
			let promises = [];
		
			var newObject = {
				day : key,
				places : [],
				distance : []
			};
			for (var i = 0; i < value.length; i++) {
				newObject.places.push(value[i]);
				newObject.distance[i] = new Array(value.length);
			}
			for (var i = 0; i < value.length; i++) {
				for (var j = i; j < value.length; j++) {
					const REST_API_KEY = '1dafb4c210ed27cf907860af2b53883a';
					const apiUrl = "https://apis-navi.kakaomobility.com/v1/directions";
					const headers = {
						'Content-Type': 'application/json'
					};
					headers["Authorization"] = "KakaoAK" + " " + REST_API_KEY;
					const params = {
						origin: value[i][0].x + "," + value[i][0].y,
						destination: value[j][0].x + "," + value[j][0].y
					};
					
					(function (i, j) {
						// Promise를 생성하여 AJAX 호출 완료를 기다림
						let promise = new Promise((resolve, reject) => {
							$.ajax({
								url: apiUrl,
								mode: 'no-cors',
								method: 'GET',
								data: params,
								headers: headers,
								success: function(response) {
									let result_code = response.routes[0].result_code;
									if (result_code === 0) {
										let duration = response.routes[0].summary.duration;
										console.log(`${i}, ${j}: ${duration}`);
										
										newObject.distance[i][j] = duration;
										newObject.distance[j][i] = duration;
									}
									else newObject.distance[i][j] = 0;
									resolve();
								},
								error: function() {
									reject();
								}
							});
						});
		
						promises.push(promise);
					}) (i, j);
				}
			}
			
			Promise.all(promises)
				.then(() => {
					const place = document.createElement('input');
					place.setAttribute('type', 'hidden');
					place.setAttribute('name', 'place')
					place.setAttribute('value', JSON.stringify(newObject));
					form.appendChild(place);
					resolve();
				})
				.catch((error) => {
					console.error("Error in AJAX request:", error);
				})
		});
		promises.push(promise);
	}
	
	Promise.all(promises)
		.then(() => {
			document.body.appendChild(form);
			console.log(form);
			form.submit();
		})
		.catch((error) => {
			console.error("Error in AJAX request:", error);
		});
})
