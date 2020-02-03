class TableList{
	constructor(data){
		this.table = new Table(data);
		this.share = this.table.getGoal()//.members.length;
	}
	
	createTableBox(){
		let tableBox = document.createElement("a");

		tableBox.setAttribute("class", "tableBox");
		tableBox.setAttribute("href", `./pages/sideMenu.html?${this.table.id}`);

		tableBox.innerHTML = `<div class="tableName">${this.table.contents}</div> \
		<div class="progressBar"> \
        <div class="ingBar" width="${"80"/*getProgress(this.table.id) 이 ID 주면 해당 진척도(달성률) 반환(int형)*/}%"></div> \ 
		</div> \
		<div class="share"> \
			<img src="images/people_icon.png" a~lt="그룹원" height="30px"> \
			<span class="people_count">${this.share}</span> \
		</div>`;

		tableBox.addEventListener("contextmenu", (e)=>{
			e.preventDefault(); //전체 혹은 부분? <--- 고민 해보자
			contextMenu(this.table.id) // 이 아이디를 기준으로 컨텍스트 메뉴 작동
		})

		tableLayout.appendChild(tableBox);
		
	}
}
