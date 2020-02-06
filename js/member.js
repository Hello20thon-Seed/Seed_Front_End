const shareButton = document.querySelector("#share");

shareButton.addEventListener("click", () => {
	const value = prompt("공유할 사용자 이메일을 입력해주세요.");
	if(value === null) return;
	
	addMember(value, user.email);
});


function addMember(email, owner) {
    $.ajax({
		url: url+'/member/' + originId,
        type: 'PUT',
		data:{
			email/*,
			owner*/
		},
		dataType:'json',
		success: function(data){
            if(data.code != 0){
				console.log("member.js::addMember - Error : " + data.code);
				return;
            }
			
			alert(`이제 ${email} 사용자와 공유합니다!`);
		},
		error: function(a,b,error){
			console.log("addTable.js::forkTable - Error : " + error);
		}
    });
}