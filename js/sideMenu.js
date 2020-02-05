var sideMenu = document.querySelectorAll(".sideBar > div");
var bottomMenu = document.querySelectorAll(".bottomMenu > div");
var curMenu = 0;
var tables = [];

var user = login()
user = new User(user[1])

var curTable = new Table();
curTable.id = nowId;
curTable.updateGoal();

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

// 이 위로는 고정 

function getUserTables(userEmail){
	$.ajax({
		url: url+"/fork/all/"+userEmail,
		type:"GET",
		async: false,
		success:function(data){
			if(data.code != 0){
				console.log("index.js::getUserTables - Error : " + data.code)
				return
			}
			let a;
			let i;
			for(i=0; i<data.data.length; i++){
				tables[i] = new TableList(data.data[i])
				tables[i].createTitleList()
				tables[i].createPeopleList()
			}
			
			a = i;
			
			$.ajax({
				url: url+"/auth/profile",
				type:"GET",        
				xhrFields: {
					withCredentials: true
				},
				success:function(data){
					if(data.code != 0){
						console.log("index.js::getUserTables - Error : " + data.code);
						return;
					}

					let b = 0;
					for(let j=a; j<data.data.goal.length; j++){
						console.log('a ->>');
						tables[j] = new TableList(data.data.goal[b]);
						tables[j].createTitleList();
						tables[j].createPeopleList();
						b++;
					}
				}
			});
			
			getProgress();
		},
		error: function(a,b,error){
			console.log("index.js::getUserTables - Error : " + error);
		}
	});
	
}getUserTables(user.email);

function renderNewTree(id){
	console.log("Render Tree : "+id);
	renderTree(id);
}