// var mTable = document.querySelector(".myTable");
// var mTree = document.querySelector(".myTree");
// var gTable = document.querySelector(".grouppTable");

// ??? 너 하고있냐 디코 ㄱ ㄱ

var sideMenu = document.querySelectorAll(".sideBar > div");
var bottomMenu = document.querySelectorAll(".bottomMenu > div");

var curMenu = 0;

console.log(sideMenu);

bottomMenu[0].addEventListener("click", (e)=>{
    changeMenu(curMenu, 0);
	console.log(curId);
});

bottomMenu[1].addEventListener("click", (e)=>{
    changeMenu(curMenu, 1);
	console.log(curId);
});

bottomMenu[2].addEventListener("click", (e)=>{
    changeMenu(curMenu, 2);
	console.log(curId);
});

function changeMenu(toHide, toShow){
    sideMenu[toHide].style.display = "none";
    sideMenu[toShow].style.display = "block";
    curMenu = toShow;
	bottomMenu[toShow].style.backgroundColor='lightgray';
	bottomMenu[toHide].style.backgroundColor='white';
}
var authUrl = 'https://seed-api.run.goorm.io/auth';
var url = 'https://seed-api.run.goorm.io';
$(".post").click(function(){	//  /goal/create 목표 생성
	$.ajax({
		url:url+'/goal/create',
		type: 'POST',
		data:{
			contents:"공부",
			level:"0",
		},
		dataType:'json',
		success: function(data){
			console.log(data);
		},
		error: function(a,b,error){
			alert(error);
		}
	});
});

// $(".get").click(function(){		//  /goal/:id 목표가져오기
// 	$.ajax({
// 		url: url+'/goal/5e341f6b0b19adb5a862a28d',
// 		type: 'GET',
// 		dataType:'json',
// 		success:function(data){
// 			console.log(data);
// 		},
// 		error: function(a,b,error){
// 			console.log(error);
// 		}
// 	});
// });

$('.get').click(function(){
	$.ajax({	//목표의 자식 가져오기
		url:url+'/goal/children/:id',
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