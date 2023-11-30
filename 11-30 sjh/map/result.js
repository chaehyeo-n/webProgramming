/**
 * 
 */
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
mapOption = { 
    center: new kakao.maps.LatLng(37.5665734, 126.978179), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

var str = "";
for (let i = 1; i <= lengthDay; i++) {
	str += '<option value="';
	str += i;
	str += '">';
	str += i;
	str += '일차'; 
	str += '</option>';
}
$("#what_day").html(str);
resetList();

function resetList() {
	var el = document.getElementById("places_list_result");
	while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
	
	var day = $("#what_day").val();
	var p_list = [];
	if (hashmap.has(day)) {
		p_list = hashmap.get(day);
	}
	
	var listElResult = document.getElementById("places_list_result");
	for (var i = 0; i < p_list.length; i++) {
		var li = addPlaceListResult(p_list[i].place);
		listElResult.appendChild(li);
	}
}

function addPlaceListResult(places) {
	
	var day = $("#what_day").val();
	$(".place-pop-up").css("visibility", "hidden");
	if (day === "error") {
		alert('날짜 선택이 잘못되었습니다. ');
		return;
	}
	
	var el = document.createElement('li');
	var itemStr = "<div class='place_result'>";
	itemStr += "    <h5 class='place_name'>" + places.place_name + '</h5>';
	
	if (places.road_address_name) {
        itemStr += '    <span class="road_address_name">&nbsp;&nbsp;' + places.road_address_name + '</span><br>' +
                   '    <span class="jibun">&nbsp;&nbsp;' +  places.address_name  + '</span>';
    } else {
        itemStr += '    <span>&nbsp;&nbsp;' +  places.address_name  + '</span>'; 
    }
    if (places.phone) {
        itemStr += '    <br><span class="tel">&nbsp;&nbsp;' + places.phone  + '</span>';
    }
    itemStr += '    <aside style="float: right; width: 100px" id="aside_bottom">';
    itemStr += '        <input type="button" id="delete" value="삭제하기"></aside>';
    itemStr += '</div>';
    
    el.innerHTML = itemStr;
    el.className = 'places_result_item';
    el.setAttribute('draggable', 'true');
    el.setAttribute('ondragstart', "dragstart(event)");
    el.setAttribute('ondragend', "dragend(event)");
    
    var moveLatLon = new kakao.maps.LatLng(places.y, places.x);
    map.setLevel(1);
    
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon); 
    
    return el;
}

function dragover(event) {
	event.preventDefault();
}

function dragstart(event) {
	event.dataTransfer.effectAllowed='move';
	event.dataTransfer.setData("Text",event.target.id);
}

function dragend(event) {
	event.dataTransfer.clearData("Text");
}

function drop(event) {
	event.preventDefault();
	var item=event.dataTransfer.getData("Text");
	event.target.appendChild(document.getElementById(item));
	event.stopPropagation();
}


