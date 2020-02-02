var tableLayout = document.querySelector("#tableLayout");
var bigTitle = [];
var tables = 0;
var userData={
	_id:'',
	email:'',
	nickname:'',
	profile:'',
	__v:''
}

user = login();
console.log("UserData:")
console.log(user)
if(user == 'Unauthorized'){
	userData={
		_id:'',
		email:'',
		nickname:'',
		profile:'',
		__v:''
	}
}
else userData = user.data;

function getAllTables(){
	let allTables
	$.ajax({
		url: url+"/goal/all",
		type:"GET",
		success:function(data){
			bigTitle = data.data;
			console.log("All Data : " + JSON.stringify(data.data));
			console.log(data)
			//console.log("bigTitle cnt : " + bigTitle.length);
			
			allTables = data.data
			
			for(var i = 0; i<bigTitle.length; i++){
				if(bigTitle[i].level == 0){
					createTableBox(bigTitle[i]);
				}
			}
			createPlusBtn();
		},
		error: function(a,b,error){
			createPlusBtn();
			console.log("Error : "+error);
		}
	});

	return allTables
}//getAllTables();

function getUserTables(userEmail){
	let userTables
	$.ajax({
		url: url+"/fork/all/"+userEmail,
		type:"GET",
		success:function(data){
			console.log(data)
			userTables = data.data
			
			//console.log("User Table : " + JSON.stringify(userTables));
			//console.log("UserData cnt : " + userTables.length);
			
			
			for(var i = 0; i<userTables.length; i++){
				if(userTables[i].goal.level == 0){
					console.log(userTables[i].goal.level)
					createTableBox(userTables[i].goal);
				}
			}
			createPlusBtn();
		},
		error: function(a,b,error){
			createPlusBtn();
			console.log("Error : "+error);
		}
	});
	return userTables;
}getUserTables(userData.email);

async function checkValid(){
	let plusBox = document.querySelector("#plus-table");
	let loginBtn = document.querySelector("#loginBtn");

	if(userData.email == ''){
		console.log("Yet login")
		loginBtn.style.display="block"
		
		plusBox.addEventListener("click", ()=>{
			alert("로그인을 해 주세요!")
		})
	}
	else{
		plusBox.setAttribute("href", "./pages/addTable.html");
		loginBtn.style.display="block"
		loginBtn.innerHTML=`<span>반갑습니다, <span class="highlight">${userData.nickname}</span>님.</span><a id="logout" href="${url}/auth/logout">logout</a>`;
	}
}

var tableWidth = 385 + 20 * 2;
var tableLayoutWidth = parseInt(window.getComputedStyle(tableLayout).width) - 45;
var column = parseInt(tableLayoutWidth/tableWidth);

window.addEventListener("resize", ()=>{
	tables = document.querySelectorAll(".tableBox").length;
	tableLayoutWidth = parseInt(window.getComputedStyle(tableLayout).width) - 45;

	if(column != parseInt(tableLayoutWidth/tableWidth)){
		column = parseInt(tableLayoutWidth/tableWidth);
		createTempNode(column - tables%column);
	}
});

function createTempNode(n){
	var temps = document.querySelectorAll(".temp");
	$(temps).remove();

	if(n == column) return;

	for(var i=0; n > i ; i++){
		var temp = document.createElement("a");
		temp.setAttribute("class", "temp");
		tableLayout.appendChild(temp);

		
	}
}

function createTableBox(table){
	var tableBox = document.createElement("a");

	tableBox.setAttribute("class", "tableBox");
	tableBox.setAttribute("href", `./pages/sideMenu.html?${table._id}`);

	tableBox.innerHTML = `<div class="tableName">${table.contents}</div> \
	<div class="progressBar"> \
		<div class="ingBar" id="${table._id}"></div> \
	</div> \
	<div class="share"> \
		<img src="images/people_icon.png" a~lt="그룹원" height="30px"> \
		<span class="people_count">명</span> \
	</div>`;
	tableLayout.appendChild(tableBox);
}

function createPlusBtn(){
	var plusBox = document.createElement("a");		
	plusBox.id = "plus-table";
	plusBox.setAttribute("class", "tableBox");
	//plusBox.setAttribute("href", "./pages/addTable.html");
	plusBox.innerHTML = '<img src="./images/plus.png" alt="목표추가"/>';

	tableLayout.appendChild(plusBox);	


	var tables = document.querySelectorAll(".tableBox").length;

	createTempNode(column - tables%column);
	getProgress();
	checkValid();
}

