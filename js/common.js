var user;
var url = "https://seed-api.run.goorm.io";
var nowUrl = window.location.href;

var nowId = nowUrl.substring(nowUrl.indexOf('?')+1, nowUrl.length);

function getProgress(){
    var ingBar = document.querySelectorAll(".ingBar")
	
    ingBar.forEach((eachIngBar) => {
        progress = getGoalPercent(eachIngBar.id);
		if(progress === 0) {
			eachIngBar.style.width = '0%';
		} else {
			eachIngBar.style.width = `${progress}%`;			
		}
    });
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