<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>여행 짜조.com</title>
        <link href="main.css" rel="stylesheet" />
        <script src="http://code.jquery.com/jquery-latest.min.js"></script>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
        <script src="kakao_login_logout.js"></script>
        <script src="checkIsLogin.js"></script>
    </head>
    <body>
    	<span class="miniTitle">여행 짜조</span>
        <input type="button" class="login" onclick="javascript:kakaoLogin_out();" id="Login_out" value="Log in"></input>
        <span class="developer">Developers: 김민선 | 김유민 | 박채현 | 서정훈</span>
        <input type="button" class="checklist"></input>
        <input type="button" class="goschedule" onclick="javascript:checkIsLogin();"></input>
	    <script src="start.js"></script>
    </body>
</html>