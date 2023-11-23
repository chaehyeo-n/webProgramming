function sendData(kakaoAuth, Account, url) {
 
	const form = document.createElement('form'); // form 태그 생성
	form.setAttribute('method', 'post'); // 전송 방식 결정 (get or post)
	form.setAttribute('action', url); // 전송할 url 지정
	
	const data_1 = document.createElement('input'); // input 태그 생성
	data_1.setAttribute('type', 'hidden'); // type = hidden
	data_1.setAttribute('name', 'kakaoAuth'); // 데이터의 key
	data_1.setAttribute('value', kakaoAuth); // 데이터의 value (여기서는 data1)
	
	const data_2 = document.createElement('input');
	data_2.setAttribute('type', 'hidden');
	data_2.setAttribute('name', 'Account');
	data_2.setAttribute('value', Account);
	
	// form 태그에 input 태그 넣고 summit 가능하게 처리
	form.appendChild(data_1);
	form.appendChild(data_2);
	
	document.body.appendChild(form);
	
	form.submit();      
}
