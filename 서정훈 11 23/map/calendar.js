/**
 * 
 */
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