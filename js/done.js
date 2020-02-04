var url = 'https://seed-api.run.goorm.io';
var user = login().data;
var tb = document.querySelector('.table');

function getGoalPercent(targetId = nowId, forkId = nowId, email = user.email) {
	let result = 0;
	$.ajax({
		url: `${url}/done/${forkId}/${targetId}/${email}`,
		type: 'GET',
		async: false,
		dataType:'json',
		success: (data) => {
			if(data.count === 0 && data.node === 0) {
				result = 0;
			} else result = ((data.count / data.node) * 100);
		},
		error: (xhr, status, err) => {
			console.log('done.js::doneGoal() Error - ' + err);
		}
	});
	
	return result;
}

function doneGoal(targetId = curTable.originId , forkId = curContextMenu.id, email = user.email) {
	// let selectId = `#chart-container .node #${forkId}`;
	// var goalBlock = document.querySelector(selectId);
	var goalBlock2 = document.getElementById(`${forkId}`);  
	// var goalBlock3 = document.querySelectorAll(`${forkId}`);
	var goalBlock4 = $(`#${forkId}`);
	// console.log(selectId)
	// console.log(goalBlock);
	console.log(goalBlock2);
	// console.log(goalBlock3);	//야 니 소스코드 안들어오는데
	console.log(goalBlock4)
	$.ajax({
		url: `${url}/done/${forkId}/${targetId}`,
		type: 'PUT',
		async: false,
		data:{
            email
		},
		dataType:'json',
		success: (data) => {
			if(!data.success) {
				if(data.code === 502) {
					alert('하위 목표가 완료되지 않았습니다.');	
				} else if(data.code === 501) {
					alert('목표가 이미 달성되어 있습니다.');	
				}
				return;
			}
			
			alert('목표 달성 완료!');
			goalBlock2.style.backgroundColor = "#37844f";
			// getProgress();
		},
		error: (xhr, status, err) => {
			console.log('done.js::doneGoal() Error - ' + err);
		}
	});
}

function cancelDoneGoal(targetId = curTable.originId, forkId = curContextMenu.id, email = user.email) {
	$.ajax({
		url: `${url}/done/${forkId}/${targetId}`,
		type: 'DELETE',
		async: false,
		data:{
            email
		},
		dataType:'json',
		success: (data) => {
			alert('목표 달성 취소');
			// getProgress();
		},
		error: (xhr, status, err) => {
			console.log('done.js::cancelDoneGoal() Error - ' + err);
		} 
	});
}
// $.ajax({
// 	url: url+'/done/'+,
// 	type:'PUT',
	
// })