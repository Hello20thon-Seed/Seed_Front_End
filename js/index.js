var user
var tables = [];

var tableLayout = document.querySelector("#tableLayout");

const tableWidth = 385 + 20 * 2;
var tableLayoutWidth = parseInt(window.getComputedStyle(tableLayout).width) - 45;
var column = parseInt(tableLayoutWidth/tableWidth);

function checkValid(){
	
	var loginBtn = document.querySelector("#loginBtn");

	user = login()
	if(user[0]){
		user = new User(user[1])
		console.log("UserData:")
		console.log(user)
		
		getUserTables(user.email)
		setTimeout(()=>{
			var plusBox = document.querySelector("#plus-table");
			plusBox.setAttribute("href", "./pages/addTable.html");
		}, 300)
		loginBtn.style.display="block"
		loginBtn.innerHTML=`<span>반갑습니다, <span class="highlight">${user.nickname}</span>님.</span><a id="logout" href="${url}/auth/logout">logout</a>`;
		
		
	}
	else{
		createPlusBtn();
		var plusBox = document.querySelector("#plus-table");
		console.log("Yet login")

		loginBtn.style.display="block"

		setTimeout(()=>{
			plusBox.addEventListener("click", ()=>{
				alert("로그인을 해 주세요!")
			})
		});
	}
}checkValid();

function getUserTables(userEmail){
	$.ajax({
		url: url+"/fork/all/"+userEmail,
		type:"GET",
		success:function(data){
			if(data.code != 0){
				console.log("index.js::getUserTables - Error : " + data.code)
				return
			}
			
			for(let i=0; i<data.data.length; i++){
				tables[i] = new TableList(data.data[i])
				tables[i].createTableBox()
			}
			createPlusBtn();
		},
		error: function(a,b,error){
			createPlusBtn();
			console.log("index.js::getUserTables - Error : " + error);
		}
	});
};

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

function createPlusBtn(){
	var plusBox = document.createElement("a");		
	plusBox.id = "plus-table";
	plusBox.setAttribute("class", "tableBox");
	//plusBox.setAttribute("href", "./pages/addTable.html");
	plusBox.innerHTML = '<img src="./images/plus.png" alt="목표추가"/>';

	tableLayout.appendChild(plusBox);	

	var tables = document.querySelectorAll(".tableBox").length;

	createTempNode(column - tables%column);
}