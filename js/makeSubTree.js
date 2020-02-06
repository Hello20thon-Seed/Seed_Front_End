//  수정중**
function postGoal(contents, level, parents){
    console.log("param Parents : "+parents);
    $.ajax({
		url:url+'/goal/create',
		type: 'POST',
		data:{
			contents: contents,
            level: String(level),
            parent: parents
		},
		dataType:'json',
		success: function(data){
            getParentsId(contents, level, data.id);
		},
		error: function(a,b,error){
			console.log("Error : "+error);
		}
    });
}