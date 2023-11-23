/**
 * 
 */
var place_result_hashmap = new Map();

$(document).on('click', 'input:checkbox', function() {
	if ( $(this).prop('checked') ) {
    	$(this).parent().addClass("selected");
    	$(this).parent().removeClass("unselected");
	} else {
    	$(this).parent().addClass("unselected");
    	$(this).parent().removeClass("selected");
	}
})

$(document).on('click', '.place_result #delete', function() {
	this.parentElement.parentElement.parentElement.remove();
})

$(document).on('blur', '.place_result .time_button', function() {
	var parent = $(this).parent();
	var start = parent.children("#start").val();
	var end = parent.children("#end").val();
	var text = parent.prev();
	
	if (start < end) text.text(start + "~" + end);
	else text.text(start + "~" + end + "!!!");
})