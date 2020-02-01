// var mTable = document.querySelector(".myTable");
// var mTree = document.querySelector(".myTree");
// var gTable = document.querySelector(".grouppTable");

// ??? 너 하고있냐 디코 ㄱ ㄱ

var sideMenu = document.querySelectorAll(".sideBar > div");
var bottomMenu = document.querySelectorAll(".bottomMenu > div");
var nowUrl = window.location.href;
var id = nowUrl.substring(nowUrl.indexOf('?')+1, nowUrl.length);
var curMenu = 0;

console.log(sideMenu);
changeMenu(0, 0);

bottomMenu[0].addEventListener("click", (e)=>{
    changeMenu(curMenu, 0);
});

bottomMenu[1].addEventListener("click", (e)=>{
    changeMenu(curMenu, 1);
});

bottomMenu[2].addEventListener("click", (e)=>{
    changeMenu(curMenu, 2);
});

function changeMenu(toHide, toShow){
    sideMenu[toHide].style.display = "none";
    sideMenu[toShow].style.display = "flex";
    curMenu = toShow;
	bottomMenu[toHide].style.backgroundColor='lightgray';
	bottomMenu[toShow].style.backgroundColor='white';

	bottomMenu[toHide].style.borderTop='solid 2px gray';
	bottomMenu[toShow].style.borderTop='none';
}
var authUrl = 'https://seed-api.run.goorm.io/auth';
var url = 'https://seed-api.run.goorm.io';

var id;
var bigTitle;

$.ajax({
	url: url+"/goal/all",
	type:"GET",
	success:function(data){
		bigTitle = data.data;
		
		console.log("Data : " + JSON.stringify(data.data));
		console.log("bigTitle cnt : " + bigTitle.length);
		
		
		for(var i = 0; i<bigTitle.length; i++){
			if(bigTitle[i].level == 0){
				createSideMenuList(bigTitle[i]);
			}
		}
		//createPlusBtn();
	},
	error: function(a,b,error){
		//createPlusBtn();
		console.log(error);
	}
	
});

function createSideMenuList(data){
	var temp = document.createElement("div");
	temp.setAttribute("class", "sideMenuList tableListEl");
	temp.id = data._id;
	
	temp.innerHTML = `
		<span>${data.contents}</span>
		<div class="progressBar">
			<div class="ingBar"></div>
		</div>
	`;

	temp.addEventListener("click", (e)=>{
		renderNewTree(temp.id);
	})

	sideMenu[0].appendChild(temp)
}

function renderNewTree(id){
	console.log("Render Tree : "+id);
	//여기다가 id 이용해서 메인화면에 트리 그리면 됨.
}


$(".goal-post").click(function(){		//  /goal/:id 목표가져오기
	$.ajax({
		url: url+'/goal/' + id,
		type: 'GET',
		dataType:'json',
		success:function(data){
			console.log(data);
		},
		error: function(error){
			console.log(error);
		}
	});
});

$('.sub-get').click(function(){
	console.log(id);
	$.ajax({	//목표의 자식 가져오기
		url:url+'/goal/children/'+id,
		type:'GET',
		dataType:'json',
		success: function(data){
			console.log(data.data);
		},
		error: function(error){
			console.log(error);
		}
	});
});

$('.par-get').click(function(){
	$.ajax({	//목표의 부모 가져오기
		url:url+'/goal/parent/'+id,
		type:'GET',
		dataType:'json',
		success: function(data){
			console.log(data.data);
		},
		error: function(error){
			console.log(error);
		}
	});
});

$('.goal-del').click(function(){
	$.ajax({
		url:url+'/goal/'+id,
		type:'DELETE',
		dataType:'json',
		success: function(data){
			console.log(data.success);
		},
		error:function(error){
			console.log(error)
		}
	})
})