<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
	<meta charset="UTF-8">
	<title>test</title>
	<script src="http://code.jquery.com/jquery-latest.min.js"></script>
	<script type="text/javascript">
		var hashmap = new Map();
		hashmap.set("공통",[]);
	</script>
	<script src="add_option.js"></script>
</head>
<body>
	<input type="text" id="member"/>
	<input type="button" id="member_btn" value="멤버 추가"/>
	<input type="text" id="item"/>
	<input type="button" id="item_btn" value="아이템 추가"/>
	<select id="select_people">
		<option value="공통">공통</option>
	</select>
	<input type="button" id="submit" value="제출"/>
	<ul id="people"></ul>
	<ul id="print_things"></ul>
</body>
</html>