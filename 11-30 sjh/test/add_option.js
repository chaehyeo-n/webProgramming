/**
 * 
 */
$(document).on('click', '#member_btn', function() { // member+
	var name = $('#member').val();
	var option = document.createElement('option');
	var li = document.createElement('li');
	
	var option_str = name;
	option.innerHTML = option_str;
	option.setAttribute('value', name);
	document.getElementById('select_people').appendChild(option);
	
	var li_str = name;
	li.innerHTML = li_str;
	li.setAttribute('value', name);
	document.getElementById('people').appendChild(li);
	
	hashmap.set(name, []);
})

$(document).on('click', '#item_btn', function() { // item+
	var name = $('#item').val();
	var li = document.createElement('li');
	
	var li_str = name;
	li_str += "<input type='checkbox'></input>"
	li.innerHTML = li_str;
	li.setAttribute('value', name);
	document.getElementById('print_things').appendChild(li);
	
	var item_list = hashmap.get($('#select_people').val());
	item_list.push({
		item_name : name, 
		is_checked : false
	});
})

$(document).on('change', '#select_people', function() { // 현재 포커싱된 사람이 바뀐다면
	var el = document.getElementById("print_things");
	while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
    
    var p_list;
	var people = $("#select_people").val();
    if (hashmap.has(people)) {
		p_list = hashmap.get(people);
	}
	else p_list = [];
	
	for (var i = 0; i < p_list.length; i++) {
		var li = document.createElement('li');
		var li_str = p_list[i].item_name;
		if (p_list[i].is_checked) li_str += "<input type='checkbox' checked='checked'></input>";
		else li_str += "<input type='checkbox'></input>";
		li.innerHTML = li_str;
		li.setAttribute('value', p_list[i].item_name);
		
		document.getElementById('print_things').appendChild(li);
	}
})

$(document).on('click', 'input:checkbox', function() { // checkbox에 변화가 생긴다면
	var li = $(this).parent(); // checkbox가 속한 li를 가져와서 저장
	var index = li.index();
	
	if ($(this).prop('checked')) {
    	hashmap.get($("#select_people").val())[index].is_checked = true;
	}
	else {
    	hashmap.get($("#select_people").val())[index].is_checked = false;
	}
})