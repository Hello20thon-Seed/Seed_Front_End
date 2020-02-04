class TableList{
	constructor(data){
		this.table = new Table();
		this.table.setTable(data);
		this.members = this.table.getOriginTable().members;
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
			<span class="people_count">${this.members.length}</span> \
		</div>`;

		tableBox.addEventListener("contextmenu", (e)=>{
			e.preventDefault(); //전체 혹은 부분? <--- 고민 해보자
			contextMenu(this.table.id) // 이 아이디를 기준으로 컨텍스트 메뉴 작동
		})

		tableLayout.appendChild(tableBox);
		
	}

	createTitleList(){
		var temp = document.createElement("div");
		temp.setAttribute("class", "sideMenuList tableListEl");
		temp.id = this.table.id;
		
		temp.innerHTML = `
			<span>${this.table.contents}</span>
			<div class="progressBar">
				<div class="ingBar" id="${this.table.id}" style="width:50%;"></div>
			</div>
		`;

		temp.addEventListener("click", (e)=>{
			console.log(e)
			location.href = `./sideMenu.html?${this.table.id}`;
			//renderNewTree(temp.id);
		});
		
		temp.addEventListener("contextmenu", (e)=>{
			curContextMenu2.id = this.table.id
			contextMenu2(e)
		});

		sideMenu[0].appendChild(temp);
	}

	createPeopleList(){
		for(let i; i<this.members.length;i++){
			var temp = document.createElement("div");
			temp.setAttribute("class", "sideMenuList people");
			
			temp.innerHTML = `
				<span>${this.members[i].nickname}</span>
				<div class="progressBar">
					<div class="ingBar" style="width:20%;"></div>/*getProgress(this.members[i].email, this.originId)*/
				</div>
			`;
			
			sideMenu[2].appendChild(temp);

			temp.addEventListener("click", ()=>{
				renderTree_email(this.table.originId, this.members[i].email)
			})

		}
	}
}
