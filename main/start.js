/**
 * 
 */
updateLoginText();
if (Kakao.Auth.getAccessToken() !== null) {
	window.Kakao.API.request({
		url: '/v2/user/me',
		success: res => {
			console.log(res);
			KakaoUser = res;
		}
	});
}