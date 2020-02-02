var url = 'https://seed-api.run.goorm.io';
var user = login().data;
var tb = document.querySelector('.table');
console.log('done.js::tb - ' + tb);

function getGoalPercent(targetId, forkId = nowId, email = user.email) {
	$.ajax({
		url: `${url}/done/${forkId}/${targetId}/${email}`,
		type: 'GET',
		async: false,
		dataType:'json',
		success: (data) => {
			console.log('달성률:' + (data.count / data.node) * 100);
		},
		error: (xhr, status, err) => {
			console.log('done.js::doneGoal() Error - ' + err);
		}
	});
}

function doneGoal(targetId, forkId = nowId, email = user.email) {
	$.ajax({
		url: `${url}/done/${forkId}/${targetId}`,
		type: 'PUT',
		async: false,
		data:{
            email
		},
		dataType:'json',
		success: (data) => {
			console.log('목표 달성');
			getGoalPercent();
		},
		error: (xhr, status, err) => {
			console.log('done.js::doneGoal() Error - ' + err);
		}
	});
}

function cancelDoneGoal() {
	
}
// $.ajax({
// 	url: url+'/done/'+,
// 	type:'PUT',
	
// })