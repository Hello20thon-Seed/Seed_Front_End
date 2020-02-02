var user;
var url = "https://seed-api.run.goorm.io";

function getProgress(){
    var ingBar = document.querySelectorAll(".ingBar")
    ingBar.forEach((eachIngBar) => {
        //여기서 달성률 가져와서
        progress = Math.random()*100;
        eachIngBar.style.width = `${progress}%`;
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
			console.log(data.success)
            console.log(data.data)
            
            user = data;
		},
		error: function(a,b,error){
            console.log("Error : "+error);
            user = error
		}
		
    });
    
    return user
};
