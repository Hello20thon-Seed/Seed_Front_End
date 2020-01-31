var tableLayout = document.querySelector("#tableLayout");
var bigTitle = [];
var tables = 0;

url = "https://seed-api.run.goorm.io/goal/all";

$.ajax({
	url: url,
	type:"GET",
	success:function(data){
		bigTitle = data.data;
		
		console.log("Data : " + JSON.stringify(data.data));
		console.log("bigTitle cnt : " + bigTitle.length);
		
		
		for(var i = 0; i<bigTitle.length; i++){
			if(bigTitle[i].level == 0) createTableBox(bigTitle[i]);
		}
		createPlusBtn();
	},
	error: function(a,b,error){
		createPlusBtn();
		console.log(error);
	}
	
});

var tableWidth = 385 + 20 * 2;
var tableLayoutWidth = parseInt(window.getComputedStyle(tableLayout).width) - 45;
var column = parseInt(tableLayoutWidth/tableWidth);

window.addEventListener("resize", ()=>{
	tableLayoutWidth = parseInt(window.getComputedStyle(tableLayout).width) - 45;

	if(column != parseInt(tableLayoutWidth/tableWidth)){
		column = parseInt(tableLayoutWidth/tableWidth);
		createTempNode(column - tables%column);
	}
	console.log(column);
});

function createTempNode(n){
	var temps = document.querySelectorAll(".temp");/*
	console.log(temps+": 삭제해야 할 갯수")
	console.log(n+": 만들어야 할 갯수")
	console.log(tables.length+":  테이블 갯수")
	console.log(column+": 열 갯수")*/
	$(temps).remove();

	if(n == column) return;

	for(var i=0; n > i ; i++){
		var temp = document.createElement("a");
		temp.setAttribute("class", "temp");
		tableLayout.appendChild(temp);

		/*console.log(i+"번째 노드")*/
	}
}

function createTableBox(table){
	var tableBox = document.createElement("a");

	tableBox.setAttribute("class", "tableBox");
	tableBox.setAttribute("href", "./pages/sideMenu.html");
	tableBox.addEventListener("click", () => {
	});

	tableBox.innerHTML = `<div class="tableName">${table.contents}</div> \
	<div class="progressBar"> \
		<div class="ingBar"></div> \
	</div> \
	<div class="share"> \
		<img src="images/people_icon.png" alt="그룹원" height="30px"> \
		<span class="people_count">명</span> \
	</div>`;
	tableLayout.appendChild(tableBox);
}

function createPlusBtn(){
	var plusBox = document.createElement("a");		
	plusBox.id = "plus-table";
	plusBox.setAttribute("class", "tableBox");
	plusBox.setAttribute("href", "./pages/addTable.html");
	plusBox.innerHTML = '<img src="./images/plus.png" alt="목표추가"/>';

	tableLayout.appendChild(plusBox);


	var tables = document.querySelectorAll(".tableBox").length;

	createTempNode(column - tables%column);
}