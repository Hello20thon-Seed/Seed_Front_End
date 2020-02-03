var sideMenu = document.querySelectorAll(".sideBar > div");
var bottomMenu = document.querySelectorAll(".bottomMenu > div");
var curMenu = 0;

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
// 이 위로는 고정 

$.ajax({
	url: url+"/fork/all/"+user.email,
	type:"GET",
	async:false,
	success:function(data){
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
		alert("서버 오류입니다. "+error)
	}
	
});

function createTitleList(data){
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
		location.href = `./sideMenu.html?${nowId}`;
		//renderNewTree(temp.id);
	});
	
	temp.addEventListener("contextmenu", (e)=>{
		console.log("BigTitleCOntextMenu");
		curContextMenu2.id = temp.id
		contextMenu2(e)
	});

	sideMenu[0].appendChild(temp);
}

function renderNewTree(id){
	console.log("Render Tree : "+id);
	renderTree(id);
}


$.ajax({
	url: url+"/fork/user/"+nowId,
	type:"GET",
	async:false,
	success:function(data){
		console.log("People : ")
		console.log(data)
		
		let people;
		people = data.data;

		for(var i = 0; i<people.length; i++){
			createPeopleList(people[i]);
		}
		
	},
	error: function(a,b,error){
		alert("서버 오류입니다. "+error)
		console.log(error);
	}

});

function createPeopleList(email){
	var temp = document.createElement("div");
	temp.setAttribute("class", "sideMenuList people");
	
	temp.innerHTML = `
		<span>${email}</span>
		<div class="progressBar">
			<div class="ingBar" id="${email}"></div>
		</div>
	`;
	
	sideMenu[2].appendChild(temp);
}