<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.HashMap" %>
<link rel="stylesheet" type="text/css" href="style.css">
<html>
<head>
    <script>
        // 체크된 항목을 로컬 스토리지에 저장하는 함수
        function saveCheckedItems() {
            var checkboxes = document.querySelectorAll('input[type="checkbox"]');
            var checkedItems = [];

            checkboxes.forEach(function (checkbox) {
                if (checkbox.checked) {
                    checkedItems.push(checkbox.value);
                }
            });

            localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
        }

        // 로컬 스토리지에서 체크된 항목을 불러오는 함수
        function loadCheckedItems() {
            var checkboxes = document.querySelectorAll('input[type="checkbox"]');
            var checkedItems = JSON.parse(localStorage.getItem('checkedItems')) || [];

            checkboxes.forEach(function (checkbox) {
                if (checkedItems.includes(checkbox.value)) {
                    checkbox.checked = true;
                    checkbox.parentElement.querySelector('label').style.color = 'gray';
                    checkbox.parentElement.querySelector('label').style.textDecoration = 'line-through';
                }
            });
        }

        // 페이지가 로드될 때 체크된 항목을 불러옴
        window.addEventListener('load', function () {
            loadCheckedItems();
        });
    </script>
</head>
<body>
    <!-- 사용자 추가 폼 -->
    <form action="../AddPerson" method="post" class="addperson">
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
                                <form action="../DeletePerson" method="post" style="display: inline;">
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
            <form action="../AddChecklistItem" method="post" class="addchecklistitem">
                <input type="hidden" name="selectedPerson" value="<%= request.getAttribute("selectedPerson") %>">
                <label for="checklistItem">준비물 : </label>
                <input type="text" id="checklistItem" name="checklistItem" required>
                <button type="submit">추 가</button>
            </form>
            <div class="checklist-item">
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
                                <label for="<%= item %>"><%=item %></label>
                                <form action="../DeleteChecklistItem" method="post" style="display: inline;">
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
    </div>

    <!-- 체크박스에 이벤트 리스너를 추가 -->
    <script>
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        
        checkboxes.forEach(function (checkbox) {
            checkbox.addEventListener('change', function () {
                var label = this.nextElementSibling;
                if (this.checked) {
                    label.style.color = 'gray';
                    label.style.textDecoration = 'line-through';
                } else {
                    label.style.color = '';
                    label.style.textDecoration = '';
                }

                // 체크박스가 변경될 때 체크된 항목을 저장
                saveCheckedItems();
            });
        });
    </script>
</body>
</html>
