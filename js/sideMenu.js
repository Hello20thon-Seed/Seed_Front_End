// var mTable = document.querySelector(".myTable");
// var mTree = document.querySelector(".myTree");
// var gTable = document.querySelector(".grouppTable");

// ??? 너 하고있냐 디코 ㄱ ㄱ

var sideMenu = document.querySelectorAll(".sideBar > div");
var bottomMenu = document.querySelectorAll(".bottomMenu > div");
var curMenu = 0;

var user = login().data;


console.log("user ")
console.log(user)


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

$.ajax({
	url: url+"/fork/all/"+user.email,
	type:"GET",
	async:false,
	success:function(data){
		console.log("alsjdnakjsdnlj")
		console.log(data.data)
		let bigTitle;
		bigTitle = data.data;
		
		for(var i = 0; i<bigTitle.length; i++){
			if(bigTitle[i].goal.level == 0){
				createTitleList(bigTitle[i].goal);
			}
		}
		getProgress();
	},
	error: function(a,b,error){
		console.log(error);
	}
	
});

function createTitleList(data){
	console.log("dataasasd : ")
	console.log(data)
	var temp = document.createElement("div");
	temp.setAttribute("class", "sideMenuList tableListEl");
	temp.id = data._id;
	
	temp.innerHTML = `
		<span>${data.contents}</span>
		<div class="progressBar">
			<div class="ingBar" id="${temp.id}"></div>
		</div>
	`;

	temp.addEventListener("click", (e)=>{
		console.log(e)
		nowId = temp.id
		renderNewTree(temp.id);
	});

	sideMenu[0].appendChild(temp);
}

function renderNewTree(id){
	console.log("Render Tree : "+id);
	renderTree(id);
}