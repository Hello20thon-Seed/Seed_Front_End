//var url = "https://seed-api.run.goorm.io";
var url = "http://127.0.0.1:8080";
var nowUrl = window.location.href;
var nowId = nowUrl.substring(nowUrl.indexOf('?')+1, nowUrl.length);

function getProgress(forkId, email) {
		let result = 0;
		$.ajax({
			url: `${url}/done/${forkId}/${email}`,	
			type: 'GET',
			async: false,
			dataType:'json',
			success: (data) => {
				result = (data.data * 100); // 백분율 변환
			},
			error: (xhr, status, err) => {
				console.log('done.js::doneGoal() Error - ' + err);
			}
		});
		
		console.log(`${forkId} : ${result}%`)
		return result.toString();
}


function login(){
	let user = []
	$.ajax({
		url: url+"/auth/profile",
		type:"GET",
		async:false,
		xhrFields: {
			withCredentials: true
		},
		success:function(data){
			if(data.code != '0'){
				console.log("classes.js::login() - Error : " + data.code)
				user = [false, data.code]
			}
			else{
				user = [true, data.data]
			}
		},
		error: function(a,b,error){
			console.log("classes.js::login() - Error : " + error);
			user = [false, error]
		}
		
	});
	return user
};

function checkLogin(){
	let user = login()
	if(user[0]){
		console.log("UserData:")
		console.log(user)
	}
	else{
		alert("로그인 오류입니다.")
	}

	return user
}