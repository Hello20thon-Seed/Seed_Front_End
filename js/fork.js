//curTable.originId랑 user.email 이용

function forkTable(tableId, userEmail){
    $.ajax({
		url: url+'/fork/create',
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
		data:{
            id : tableId,
            owner : userEmail
		},
		dataType:'json',
		success: function(data){
            if(data.code != 0){
				console.log("addTable.js::forkTable - Error : " + data.code);
				return
            }
            
            
            console.log(`Fork ${tableId} to ${userEmail}`)
			selectForkId = data.id;
		},
		error: function(a,b,error){
			console.log("addTable.js::forkTable - Error : " + error);
		}
    });
}

function addForkNode(tableId, contents, level, parent, isDone, owner) {
    $.ajax({
		url: url+'/fork/add',
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
		data:{
            originId: tableId,
			contents,
			level,
			parent,
			isDone,
			owner
		},
		dataType:'json',
		success: function(data){
            if(data.code != 0){
				console.log("addTable.js::addForkNode - Error : " + data.code);
				return;
            }

			console.log('Fork 노드 추가');
		},
		error: function(a,b,error){
			console.log("addTable.js::addForkNode - Error : " + error);
		}
    });
}