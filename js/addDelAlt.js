function showOverMenu(){
	var nodeEl = document.querySelectorAll('.node');
	for(let i=0;i<nodeEl.length;i++){
		createOverMenu(nodeEl[i]);

	}
	Contextmenu();
}
showOverMenu();  


function createOverMenu(node){
	var overMenu = document.createElement('img');
	overMenu.style.display = "none"
	overMenu.setAttribute("class", "overMenu")
	//overMenu.id="overMenu"
	overMenu.setAttribute("src", "../images/more.png")
	node.appendChild(overMenu);
	
	node.addEventListener("mouseenter", (el)=>{	// 마우스 올렸을때 overMenu 생성
		overMenu.style.display = "block"
	})
	node.addEventListener("mouseleave", (el)=>{	//마우스 내렸을때 overMenu 삭제
		overMenu.style.display = "none"
	})
}
