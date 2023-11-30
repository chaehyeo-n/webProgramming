/**
 * 
 */

$(document).on('click', 'input:checkbox', function() {
	var li = $(this).parent().parent().parent();
	var index = li.index();
	if ( $(this).prop('checked') ) {
    	$(this).parent().addClass("selected");
    	$(this).parent().removeClass("unselected");
    	place_result_hashmap.get($("#what_day").val())[index][1] = true;
	} else {
    	$(this).parent().addClass("unselected");
    	$(this).parent().removeClass("selected");
    	place_result_hashmap.get($("#what_day").val())[index][1] = false;
	}
})

$(document).on('click', '.place_result #delete', function() {
	var li = $(this).parent().parent().parent();
	var index = li.index();
	place_result_hashmap.get($("#what_day").val()).splice(index, 1);
	
	this.parentElement.parentElement.parentElement.remove();
})

$(document).on('blur', '.place_result .time_button', function() {
	var parent = $(this).parent();
	var start = parent.children("#start").val();
	var end = parent.children("#end").val();
	var text = parent.prev();
	
	if (start < end) text.text(start + "~" + end);
	else text.text(start + "~" + end + "!!!");
	
	var li = $(this).parent().parent().parent().parent().parent();
	var index = li.index();
    place_result_hashmap.get($("#what_day").val())[index][2] = start;
    place_result_hashmap.get($("#what_day").val())[index][3] = end;
})