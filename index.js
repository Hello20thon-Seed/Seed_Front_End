var tableLayout = document.querySelector("#tableLayout")
var tables = document.querySelectorAll(".tableBox")
var tableLayoutWidth = parseInt(window.getComputedStyle(tableLayout).width) - 45
var tableWidth = 385 + 20 * 2
var column = parseInt(tableLayoutWidth/tableWidth)


createTempNode(column - tables.length%column)

window.addEventListener("resize", ()=>{
	tableLayoutWidth = parseInt(window.getComputedStyle(tableLayout).width) - 45

	if(column != parseInt(tableLayoutWidth/tableWidth)){
		column = parseInt(tableLayoutWidth/tableWidth)
		createTempNode(column - tables.length%column)
	};
	console.log(column)
});


function createTempNode(n){
	var temps = document.querySelectorAll(".temp")
	console.log(temps+": 삭제해야 할 갯수")
	console.log(n+": 만들어야 할 갯수")
	console.log(tables.length+":  테이블 갯수")
	console.log(column+": 열 갯수")
	$(temps).remove()

	if(n == column) return;

	for(var i=0; n > i ; i++){
		var temp = document.createElement("a")
		temp.setAttribute("class", "temp")
		tableLayout.appendChild(temp)

		console.log(i+"번째 노드")
	}
}