var nowUrl = window.location.href;
var nowId = nowUrl.substring(nowUrl.indexOf('?')+1, nowUrl.length);
var url = 'https://seed-api.run.goorm.io';

function table(){ 
    this.id
    this.name;
    this.className;
    this.children = [];
}

$.ajax({
    url:url+'/fork/'+nowId,
    type:'GET',
    async: false,
    success:function(data){
        if(data.code != 0){
            console.log("jsonTree.js:: - Error : " + data.code)
            return
        }
        console.log(data)
        renderTree_toDataSource(makeDataSource(data));
    },
    error:function(error){
		alert("서버 오류입니다. "+error)
        console.log(error);
    }
});

function renderTree(id){
    console.log("rendering Tree to ID :"+id);
    $.ajax({
        url:url+'/fork/'+id,
        type:'GET',
        async: false,
        success:function(data){
			console.log(data)
            changeTree(makeDataSource(data));
        },
        error:function(error){
			alert("서버 오류입니다. "+error)
            console.log(error);
        }
    });
}

function renderTree_email(id, email){
    console.log("rendering Tree to ID :"+id+"EMAIL : " +email);
    $.ajax({
        url:url+'/fork/filter/'+id+"/"+email,
        type:'GET',
        async: false,
        success:function(data){
			console.log(data)
            changeTree(makeDataSource(data));
        },
        error:function(error){
			alert("서버 오류입니다. "+error)
            console.log(error);
        }
    });
}

function makeDataSource(data){
    let bigTable = new table();    
    console.log("making datasource to Data :"+ JSON.stringify(data.data));
    bigTable.id = `${data.data._id}`;
    bigTable.className =`${data.data.level}`;
    bigTable.name = data.data.contents;
    bigTable.children = loadTree(data.data._id);
    
    return bigTable
}

function loadTree(id){
    let children = loadChildren(id);

    for(let i=0; i<children.length;i++){
        let child = new table();
        child.id = `${children[i]._id}`;
        child.name = children[i].contents;
        child.className = `${children[i].level}`;
        child.children = loadTree(children[i]._id);
        children[i] = child;
    }

    return children;
}

function loadChildren(id){
    let arr = [];
	$.ajax({
		url:url+" /fork/children/" + id,
		type:'GET',
        dataType:'JSON',
        async: false,
		success: function(data){
            if(data.code != '0'){
                console.log("jsonTree.js::loadChildren() - Error : " + data.code)
            }
            else{
                console.log("jsonTree.js::loadChildren() - data : ");
                console.log(data.data)
                arr = data.data
            }
		},
		error:function(error){
			alert("서버 오류입니다. "+error)
			console.log(error);
		}
    });
    return arr;
}


$('.subNode').click(()=>{
	loadTree(id);
});