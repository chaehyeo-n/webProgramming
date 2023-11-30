/**
 * 
 */
var place_result_hashmap = new Map();

document.addEventListener('change', function(e) {
    if(e.target.type === 'date') {
        if(e.target.value) {
            e.target.classList.add('not-empty');
        } else {
            e.target.classList.remove('not-empty');
        }
    }
});

$(document).on('blur', '.insert_date', function() {
	const start = new Date($('#date_range #start').val());
	const end = new Date($('#date_range #end').val());
	
	if ($('#date_range #start').val() > $('#date_range #end').val()) {
		$("#what_day").html('<option value="error">범위가 잘못되었습니다.</option>');
		return;
	}
	
	let diff = Math.abs(end.getTime() - start.getTime());
	diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
	
	var str = "";
	for (let i = 1; i <= diff + 1; i++) {
		str += '<option value="';
		str += i;
		str += '">';
		str += i;
		str += '일차'; 
		str += '</option>';
	}
	$("#what_day").html(str);
})

$(document).on('change', '#what_day', function() {
	var el = document.getElementById("places_list_result");
	while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
    
    var p_list;
	var day = $("#what_day").val();
    if (place_result_hashmap.has(day)) {
		p_list = place_result_hashmap.get(day);
	}
	else p_list = [];
	
	console.log(p_list);
	
	
	var listElResult = document.getElementById("places_list_result");
	for (var i = 0; i < p_list.length; i++) {
		var li = addPlaceListResult(p_list[i][0]);
		if (p_list[i][1]) {
			var aside = li.firstElementChild.firstElementChild;
			aside.classList.replace("unselected", "selected");
			aside.firstElementChild.setAttribute("checked" ,"checked");
			
			var div_time_select = aside.firstElementChild.nextElementSibling;
			
			if (p_list[i][2] < p_list[i][3]) 
				div_time_select.firstElementChild.innerHTML = p_list[i][2] + "~" + p_list[i][3];
			else 
				div_time_select.firstElementChild.innerHTML = p_list[i][2] + "~" + p_list[i][3] + "!!!";
			
		
			var start_time = div_time_select.firstElementChild.nextElementSibling.firstElementChild;
			var end_time = start_time.nextElementSibling;
			
			start_time.setAttribute("value", p_list[i][2]);
			end_time.setAttribute("value", p_list[i][3]);
		}
		listElResult.appendChild(li);
	}
})
