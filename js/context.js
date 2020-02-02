var id = 'contextMenu';
    {
        var div = document.createElement('div');
        div.id = id;
        div.innerHTML = `<div id="addGoal_cm">추가</div><div id="delGoal_cm">삭제</div><div id="editGoal_cm">수정</div><div id="doneGoal_cm">완료</div>`;

        document.body.appendChild(div);
    }

var context = document.getElementById(id);

var curContextMenu = {
    id:'',
    level:''
};

function Contextmenu(){
    
    var overMenu = document.querySelectorAll('.mainTree .node .overMenu');//메인트리에 있는 타이틀을 클릭하면 컨텍스트 메뉴 생성. 추후에 ...모양 클릭하면 나오게 할 것.
	
	overMenu.forEach((eachOverMenu)=>{
		eachOverMenu.addEventListener("click", (e)=>{
			e.preventDefault();
			var x = e.pageX + 'px';
			var y = e.pageY + 'px';
			context.style.display = 'block';
			context.style.left = x;
			context.style.top = y;
            curContextMenu.id = e.path[1].id;
            curContextMenu.level = e.path[1].className[5];+
            console.log("Current ContextMenu : ")
            console.log(curContextMenu)
		});
	})
	

    document.addEventListener("click",(e)=>{ //contextMenu가 아닌 부분을 클릭하면 컨텍스트 메뉴 숨김
        e.stopPropagation();

        //여기서 ID 기준으로 context메뉴 조작
        console.log(curContextMenu)
        console.log(e.toElement.id)
        switch(e.toElement.id){
            case "addGoal_cm":
                postGoal(prompt("추가할 목표를 입력하세요."), curContextMenu.level, curContextMenu.id)
                break;
            case "delGoal_cm":
                delGoal(curContextMenu.id)
                break;
            case "editGoal_cm":        
                editGoal(prompt("수정할 내용을 입력하세요."), curContextMenu.level, curContextMenu.id)
                break;
            case "doneGoal_cm":
                doneGoal(curContextMenu);
				break;

        }

        if(e.toElement.id != id && e.toElement.className != "overMenu") context.style.display = 'none';
    });

    //.orgchart의 style transform 속성이 변한다면, 컨텍스트 메뉴도 따라가게.
    //document.querySelector(".orgchart").addEventListener("")

    document.addEventListener("contextmenu", function(e) {e.preventDefault();});
}


var target = document.querySelector('#chart-container .orgchart');

target.style="cursor: default;";

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        //console.log(mutation.oldValue);
        //트리 드래그 할 때 감시.
    });
});

var config = {
    attributeFilter:['style'],
    attributeOldValue: true
};

observer.observe(target, config);