var nowUrl = window.location.href;
var nowId = nowUrl.substring(nowUrl.indexOf('?')+1, nowUrl.length);
var url = 'https://seed-api.run.goorm.io';
var ajaxURLs = {
	'children': url+'/goal/children/',
	'parent': url+'/goal/parent/',
};

function table(){ 
    this.name;
    this.className;
    this.children = [];
}

$.ajax({
    url:url+'/goal/'+nowId,
    type:'GET',
    async: false,
    success:function(data){
        renderTree_toDataSource(makeDataSource(data));
    },
    error:function(error){
        console.log(error);
    }
});

function renderTree(id){
    console.log("rendering Tree to ID :"+id);
    $.ajax({
        url:url+'/goal/'+id,
        type:'GET',
        async: false,
        success:function(data){
            changeTree(makeDataSource(data));
        },
        error:function(error){
            console.log(error);
        }
    });
}

function makeDataSource(data){
    let bigTable = new table();
    console.log("making datasource to Data :"+ JSON.stringify(data.data));

    bigTable.className =`${data.data._id} level${data.data.level}`;
    bigTable.name = data.data.contents;
    bigTable.children = loadTree(data.data._id);
    
    return bigTable
}

function loadTree(id){
    let children = loadChildren(id);

    for(let i=0; i<children.length;i++){
        let child = new table();
        child.name = children[i].contents;
        child.className =`${children[i]._id} ${children[i].level}`;
        child.children = loadTree(children[i]._id);
        children[i] = child;
    }

    return children;
}

function loadChildren(id){
    let arr = [];
	$.ajax({
		url:ajaxURLs.children + id,
		type:'GET',
        dataType:'JSON',
        async: false,
		success: function(data){
            arr = data.data;
		},
		error:function(error){
			console.log(error);
		}
    });
    return arr;
}


$('.subNode').click(()=>{
	loadTree(id);
});