function saveData () {
	if (Kakao.Auth.getAccessToken() === null) {
		console.log("is logged out");
	} else {
		$(document).ready( function () {
			var userData = new Object();
			userData.id = KakaoUser.id;
			userData.str = $("#str").val();
			
			console.log(userData);
		});
	}
}
