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

var markers = [];
var ps = new kakao.maps.services.Places();
var infowindow = new kakao.maps.InfoWindow({zIndex:2});

function searchPlace() {
var e = $("#placeInput").val();
	if (e === "") {
		$("#place_alert").css("display", "block").html('장소를 입력해주세요.');
		removeAllChildNods(document.getElementById('placesList'));
		var paginationEl = document.getElementById('pagination');
		while (paginationEl.hasChildNodes()) {
			paginationEl.removeChild (paginationEl.lastChild);
	    }
		removeMarker();
	}
	else ps.keywordSearch(e, placesSearchCB, {size: 5});
}
 
function placesSearchCB(data, status, pagination) {
	if (status === kakao.maps.services.Status.OK) {
		$("#place_alert").css("display", "none");

        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
    	displayPagination(pagination);

	} else if (status === kakao.maps.services.Status.ZERO_RESULT) {
		$("#place_alert").css("display", "block").html('검색 결과가<br>존재하지 않습니다.');
		
		removeAllChildNods(document.getElementById('placesList'));
		var paginationEl = document.getElementById('pagination');
		while (paginationEl.hasChildNodes()) {
			paginationEl.removeChild (paginationEl.lastChild);
	    }
		removeMarker();
		
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {
		$("#place_alert").css("display", "block").html('검색 결과 중<br>오류가 발생했습니다.');
        
        removeAllChildNods(document.getElementById('placesList'));
		var paginationEl = document.getElementById('pagination');
		while (paginationEl.hasChildNodes()) {
			paginationEl.removeChild (paginationEl.lastChild);
	    }
		removeMarker();
        
        return;

    }
}
 
function displayPlaces(places) {
	var listEl = document.getElementById('placesList');
	var menuEl = document.getElementsByClassName("place-pop-up");
	var fragment = document.createDocumentFragment();
	var bounds = new kakao.maps.LatLngBounds();
	
	removeAllChildNods(listEl);
	
	removeMarker();
	
	for ( var i=0; i<places.length; i++ ) {
		// 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition), 
            itemEl = getListItem(places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function(marker, place) {
			kakao.maps.event.addListener(marker, 'mouseover', function() {
                displayInfowindow(marker, place.place_name);
            });

            kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });

            itemEl.onmouseover =  function () {
                displayInfowindow(marker, place.place_name);
            };

            itemEl.onmouseout =  function () {
                infowindow.close();
            };
            
            itemEl.onclick = function () {
				var listElResult = document.getElementById("places_list_result");
				var i = addPlaceListResult(place);
				listElResult.appendChild(i);
			};
            
        })(marker, places[i]);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

function addPlaceListResult(places) {
	
	$(".place-pop-up").css("visibility", "hidden");
	
	var el = document.createElement('li');
	var itemStr = "<div class='place_result'>";
	itemStr += "    <h5 class='place_name'>";
	itemStr += places.place_name + '</h5>';
	
	if (places.road_address_name) {
        itemStr += '    <span class="road_address_name">&nbsp;&nbsp;' + places.road_address_name + '</span><br>' +
                    '   <span class="jibun">&nbsp;&nbsp;' +  places.address_name  + '</span><br>';
    } else {
        itemStr += '    <span>&nbsp;&nbsp;' +  places.address_name  + '</span><br>'; 
    }
    if (places.phone) {
        itemStr += '    <span class="tel">&nbsp;&nbsp;' + places.phone  + '</span>';
    }
    itemStr += '</div>';
    
    el.innerHTML = itemStr;
    el.className = 'places_result_item';
    return el;
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(places) {

    var el = document.createElement('li'),
    itemStr = '<span class="markerbg marker"></span>' +
                '<div class="info">' +
                '   <h5 class="place_name">' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span class="road_address_name">&nbsp;&nbsp;' + places.road_address_name + '</span><br>' +
                    '   <span class="jibun">&nbsp;&nbsp;' +  places.address_name  + '</span><br>';
    } else {
        itemStr += '    <span>&nbsp;&nbsp;' +  places.address_name  + '</span><br>'; 
    }
    if (places.phone) {
        itemStr += '    <span class="tel">&nbsp;&nbsp;' + places.phone  + '</span>';
    }
    itemStr += '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}


// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position) { 
	marker = new kakao.maps.Marker({
        position: position // 마커의 위치
    });
    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
}


// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i; 

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild (paginationEl.lastChild);
    }

    for (i=1; i<=pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i===pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}


// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
}

 // 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {   
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}