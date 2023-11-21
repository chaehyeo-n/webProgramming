/**
 * 
 */
function checkIsLogin() {
	if (Kakao.Auth.getAccessToken() == null) {
		window.Kakao.Auth.login({
			success: function(authObj) {
				kakaoAuthAccessToken = authObj.access_token;
				window.Kakao.API.request({
					url: '/v2/user/me',
					success: res => {
						console.log(res);
						KakaoUser = res;
						updateLoginText();
						window.location.href = "../map/addTravelPlace.jsp";
					}
				});
			}
		});
	}
	else {
		window.location.href = "../map/addTravelPlace.jsp";
	}
}