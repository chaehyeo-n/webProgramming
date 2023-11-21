<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>여행 짜조.com</title>
	<link href="Map.css" rel="stylesheet"></link>
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=c42d9650f0d0202aac6c47d98ea0c55d&libraries=services"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
	<script src="popup.js"></script>
</head>
<body>
	<div class="choose" id="place">
		<div><h6 class="chooseText">장소 선택</h6></div>
		<input type="text" id="placeInput" placeholder="검색하실 장소를 입력해주세요." onKeypress="javascript:if(event.keyCode==13){searchPlace();}"/>
		<div class="place-pop-up">
			<h5 id="place_alert">장소를 입력해주세요.</h5>
	        <ul id="placesList"></ul>
        	<div id="pagination"></div>
		</div>
		<div id="date">
			<img alt="" src="../image/map_image/calendar.png" width="100px" height="100px" id="calander_img">
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;00월 00일
		</div>
		<div id="places_list_result_wrapper">
			<ul id="places_list_result"></ul>
		</div>
	</div>
	<span class="body"></span>
	<div id="map"></div>
	<script src="Map.js"></script>
</body>
</html>