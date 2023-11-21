<!DOCTYPE html>
<html>
<head>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.HashMap" %>
<link rel="stylesheet" type="text/css" href="style.css">
<script type="text/JavaScript">
	init();
	
	function init(){
		document.querySelectorAll('li').forEach(function(li) {
            li.addEventListener('click', Check);
        });
	}
	
	function Check(e){
		checkSupplies(e);
	}
	
	function checkSupplies(e){
		const Supplies = e.target.querySelector('a');
		if(e.target.querySelector('input[type="checkbox"]').checked){
	        Supplies.style.color = "#dddddd";
	        Supplies.style.textDecorationLine = "line-through";
	    }else {
	        Supplies.style.color = "#000000";
	        Supplies.style.textDecorationLine = "none";
	    }
	} //수정하기
</script>
</head>
<body>
<!-- 사용자 추가 폼 -->
<form action="AddPerson" method="post" class="addperson">
    <label for="personName">여행 멤버 : </label>
    <input type="text" id="personName" name="personName" required>
    <button type="submit">추 가</button>
</form>

<!-- 버튼 형식으로 표시된 사람 목록 -->
<div class="person-list">
    <div class="memberbox">
    	<ul>
        <% 
            ArrayList<String> personList = (ArrayList<String>) request.getSession().getAttribute("personList");
            if (personList != null) {
                for (String person : personList) {
        %>
                    <li>
                        <a href="Checklist?person=<%= person %>"><%= person %></a>
                        <form action="DeletePerson" method="post" style="display: inline;">
                            <input type="hidden" name="personToDelete" value="<%= person %>">
                            <button type="submit">삭 제</button>
                        </form>
                    </li>
        <%
                }
            }
        %>
    </ul>
    </div>
</div>

<!-- 선택된 사람의 체크리스트 표시 -->
<div class="checklist">
    <div class="listbox">
    	<span class="checkimg"></span>
    	<h2 class="listtitle"><%= request.getAttribute("selectedPerson") %>님의 체크리스트</h2>
    <form action="AddChecklistItem" method="post" class="addchecklistitem">
        <input type="hidden" name="selectedPerson" value="<%= request.getAttribute("selectedPerson") %>">
        <label for="checklistItem">준비물 : </label>
        <input type="text" id="checklistItem" name="checklistItem" required>
        <button type="submit">추 가</button>
    </form>
    <ul>
        <% 
            String selectedPerson = (String) request.getAttribute("selectedPerson");
            HashMap<String, ArrayList<String>> checklists = (HashMap<String, ArrayList<String>>) request
                    .getSession().getAttribute("checklists");

            if (checklists != null && checklists.containsKey(selectedPerson)) {
                ArrayList<String> checklist = checklists.get(selectedPerson);

                for (String item : checklist) {
        %>
            <li>
                <input type="checkbox" name="checkedItems" value="<%= item %>">
                <%= item %>
                <form action="DeleteChecklistItem" method="post" style="display: inline;">
                    <input type="hidden" name="selectedPerson" value="<%= selectedPerson %>">
                    <input type="hidden" name="itemToDelete" value="<%= item %>">
                    <button type="submit">삭 제</button>
                </form>
            </li>
        <%
                }
            }
        %>
    </ul>
    </div>
</div>
</body>
</html>