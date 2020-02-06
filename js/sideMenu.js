var sideMenu = document.querySelectorAll(".sideBar > div");
var bottomMenu = document.querySelectorAll(".bottomMenu > div");
var curMenu = 0;
var tables = [];

var user = login()
user = new User(user[1])

var curTable = new Table();
curTable.id = nowId;
curTable.updateGoal();

user.getUserTables("side")

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
function renderNewTree(id){
	console.log("Render Tree : "+id);
	renderTree(id);
}