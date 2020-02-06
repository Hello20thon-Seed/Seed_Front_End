
function postGoal(contents, level, parents, where){
    console.log("PostGoal :");
    console.log(`Contents : ${contents}, level : ${level}, parents : ${parents}`)
    $.ajax({
		url: url+'/goal/create',
		type: 'POST',
		data:{
			contents: contents,
            level: level,
            parent: parents
		},
		async: false,
		dataType:'json',
		success: function(data){
            if(data.code == 0){
                console.log("level :"+level)
                if (level == 0){
                    getParentsId(level, data.id)
                }
            }
            else{
                alert("목표를 추가하지못했습니다. 에러코드 : "+data.code)
            }
			
		},
		error: function(a,b,error){
            alert("서버 오류입니다. "+error)
			console.log("Error : "+error);
		}
    });
}

//replaceAll prototype 선언
String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}

function editGoal(contents, level, id){
	// 사용자 특이 입력 방지
	contents = contents.replaceAll("<", "&lt;").replaceAll(">", "&gt;").trim();
	if(contents == "") return;
	
    $.ajax({
		url: url+'/fork/'+id,
		type: 'PUT',
		data:{
			contents: contents,
            level: String(level),
		},
		dataType:'json',
		success: function(data){
            if(data.code == 0){
                alert("목표를 수정했습니다!")
				window.location.reload();
            }
            else{
                alert("목표를 수정하지못했습니다. 에러코드 : "+data.code)
            }
		},
		error: function(a,b,error){
            alert("서버 오류입니다. "+error)
			console.log("Error : "+error)
    	}
	});
}

function delGoal(id){
    $.ajax({
		url: url+'/fork/'+id,
		type: 'DELETE',
		dataType:'json',
		success: function(data){
            if(data.code == '0'){
				window.location.reload();
                alert("목표를 제거했습니다!")
            }
            else if(data.code == 204){
                if(confirm("자식 노드가 있습니다. 한꺼번에 삭제하시겠습니까?")){
                    $.ajax({
                        url: url+'/fork/all/'+id,
                        type: 'DELETE',
                        dataType:'json',
                        success: function(data){
                            if(data.code == 0){
								window.location.reload();
                                alert("목표를 제거했습니다!")
                            }
                            else{
                                alert("목표를 제거하지못했습니다. 에러코드 : "+data.code)
                            }
                        },
                        error: function(a,b,error){
                            alert("서버 오류입니다. "+error)
                            console.log("Error : "+error);
                        }
                    })
                }
                else return
            }
            else{
                alert("목표를 제거하지못했습니다. 에러코드 : "+data.code)
            }
		},
		error: function(a,b,error){
            alert("서버 오류입니다. "+error)
			console.log("Error : "+error);
		}
    });
}


function delGoal2(id){
    $.ajax({
		url: url+'/fork/all/'+id,
		type: 'DELETE',
		dataType:'json',
		success: function(data){
            if(data.code == 0){
                renderTree(nowId);
                alert("목표를 제거했습니다!");
				window.location.reload();
            }
            else{
                alert("목표를 제거하지못했습니다. 에러코드 : "+data.code)
            }
		},
		error: function(a,b,error){
            alert("서버 오류입니다. "+error)
			console.log("Error : "+error);
		}
    });
}

function getParentsId(level, id){
    if(level == 0){
        console.log(`${id}`);
        parentsId = id;
    }
    else{
        console.log(`${id}`);
    }
}