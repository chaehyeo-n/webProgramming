window.Kakao.init("c42d9650f0d0202aac6c47d98ea0c55d");

const RESTkey = "c42d9650f0d0202aac6c47d98ea0c55d";
const RedirectURL = "http://localhost:8080/webprog/Main.jsp";

var kakaoAuthAccessToken = null, KakaoUser = null;

function kakaoLogin_out() {
	if (!Kakao.Auth.getAccessToken()) {
		window.Kakao.Auth.login({
			success: function(authObj) {
				kakaoAuthAccessToken = authObj.access_token;
				window.Kakao.API.request({
					url: '/v2/user/me',
					success: res => {
						console.log(res);
						KakaoUser = res;
						updateLoginText();
					}
				});
			}
		});
	}
	else {
	    window.Kakao.Auth.logout(function() { // 카카오 로그아웃
	        kakaoAuthAccessToken = null; // 로그아웃 후에 초기화
	        KakaoUser = null;
			updateLoginText();
			window.location.href='https://kauth.kakao.com/oauth/logout?client_id=' + RESTkey +  
			'&logout_redirect_uri=' + RedirectURL;
	    });
	}
}

// 텍스트 업데이트 함수
function updateLoginText() {
    var loginOutElement = $("#Login_out");
    console.log("Access Token:", Kakao.Auth.getAccessToken()); // 여기에 로그 추가

    var text = (Kakao.Auth.getAccessToken() !== null) ? "Log out" : "Log in";

    $(document).ready(function() {
        loginOutElement.attr("value", text);
    });
}
