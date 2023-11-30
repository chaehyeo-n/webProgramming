<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>여행 짜조.com</title>
	<link href="Map.css" rel="stylesheet"></link>
	<link href="calendar.css" rel="stylesheet"></link>
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=c42d9650f0d0202aac6c47d98ea0c55d&libraries=services"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
	<script src="popup.js"></script>
	<script src="place_result_func.js"></script>
	<script src="calendar.js"></script>
	<script src="js_send_post.js"></script>
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
		<div id="places_list_result_wrapper">
			<ul id="places_list_result"></ul>
		</div>
	</div>
	<div class="choose" id="date_range">
		<div><h6 class="chooseText">날짜 범위 선택</h6></div>
		<input class="insert_date" id="start" type="date" data-placeholder="시작 일자" required>~
		<input class="insert_date" id="end" type="date" data-placeholder="종료 일자" required>
	</div>
	<div class="choose" id="date_text">
		<div><h6 class="chooseText">몇 일 차 선택</h6></div>
		<select name="days" id="what_day">
			<option value="error">범위가 잘못되었습니다.</option>
    	</select>
	</div>
	<span class="body"></span>
	<div id="map"></div>
	<input type="submit" id="submit_button" value="최적 경로 얻기!"></input>
	<script src="Map.js"></script>
</body>
</html>