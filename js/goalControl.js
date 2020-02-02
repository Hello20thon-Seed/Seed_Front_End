
function postGoal(contents, level, parents, where = true){
    $.ajax({
		url: url+'/goal/create',
		type: 'POST',
		data:{
			contents: contents,
            level: String(level),
            parent: parents
		},
		dataType:'json',
		success: function(data){
            if(where){
                if(data.code == 0){
                    getParentsId(contents, level, data.id);
                    alert("목표를 추가했습니다!")
                }
                else{
                    alert("목표를 추가하지못했습니다. 에러코드 : "+data.code)
                }
            }
		},
		error: function(a,b,error){
			console.log("Error : "+error);
		}
    });
}

function editGoal(contents, level, id){
    $.ajax({
		url: url+'/goal/'+id,
		type: 'PUT',
		data:{
			contents: contents,
            level: String(level)
		},
		dataType:'json',
		success: function(data){
            if(data.code == 0){
                getParentsId(contents, level, data.id);
                alert("목표를 수정했습니다!")
            }
            else{
                alert("목표를 수정하지못했습니다. 에러코드 : "+data.code)
            }
		},
		error: function(a,b,error){
			console.log("Error : "+error);
		}
    });
}

function delGoal(id){
    $.ajax({
		url: url+'/goal/'+id,
		type: 'DELETE',
		dataType:'json',
		success: function(data){
            if(data.code == 0){
                getParentsId(contents, level, data.id);
                alert("목표를 제거했습니다!")
            }
            else{
                alert("목표를 제거하지못했습니다. 에러코드 : "+data.code)
            }
		},
		error: function(a,b,error){
			console.log("Error : "+error);
		}
    });
}