var tb = document.querySelector('.table');

function doneGoal(forkId, email) {
	var goalBlock = document.querySelectorAll(`#id${forkId} .title`);
	$.ajax({
		url: `${url}/done/${forkId}`,
		type: 'PUT',
		async: false,
		data:{
            email
		},
		dataType:'json',
		success: (data) => {
			if(!data.success) {
				if(data.code === 502) {
					alert('하위 목표가 있으면 완료 할 수 없습니다.');	
				}
			}
			
			alert('목표 달성 완료!');

			goalBlock[0].style.backgroundColor = "#f39c12";
			goalBlock[1].style.backgroundColor = "#f39c12";
		},
		error: (xhr, status, err) => {
			console.log('done.js::doneGoal() Error - ' + err);
		}
	});
}

function cancelDoneGoal(forkId = curContextMenu.id, email = user.email) {
	$.ajax({
		url: `${url}/done/${forkId}`,
		type: 'DELETE',
		async: false,
		data:{
            email
		},
		dataType:'json',
		success: (data) => {
			if(!data.success) {
				if(data.code === 503) {
					alert('하위 목표가 있으면 완료 해제 할 수 없습니다.');
				}
				return;
			}
			
			alert('목표 달성 취소');
		},
		error: (xhr, status, err) => {
			console.log('done.js::cancelDoneGoal() Error - ' + err);
		}
	});
}