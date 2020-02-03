var user;
var url = "https://seed-api.run.goorm.io";
var nowUrl = window.location.href;

var nowId = nowUrl.substring(nowUrl.indexOf('?')+1, nowUrl.length);

function getProgress(){
    var ingBar = document.querySelectorAll(".ingBar")
    ingBar.forEach((eachIngBar) => {
        progress = getGoalPercent(eachIngBar.id, eachIngBar.id);
		if(progress === 0) {
			eachIngBar.style.width = '0%';
		} else {
			eachIngBar.style.width = `${progress}%`;			
		}

    });
}

function login(){
	$.ajax({
		url: url+"/auth/profile",
        type:"GET",
        async:false,
		xhrFields: {
			withCredentials: true
		},
		success:function(data){
            user = data;
		},
		error: function(a,b,error){
            console.log("common.js::login() - Error : "+error);
            user = error
		}
		
    });
    
    return user
};