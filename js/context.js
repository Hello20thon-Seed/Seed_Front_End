var id = 'contextMenu';
    {
        var div = document.createElement('div');
        div.id = id;
        div.innerHTML = `<div id="addGoal_cm">추가</div><div id="delGoal_cm">삭제</div><div id="editGoal_cm">수정</div>`

        document.body.appendChild(div);
    }
var context = document.getElementById(id);

var curContextMenu;

function Contextmenu(){
    
    document.querySelectorAll('.mainTree .title').forEach((each)=>{ //메인트리에 있는 타이틀을 클릭하면 컨텍스트 메뉴 생성. 추후에 ...모양 클릭하면 나오게 할 것.
        each.addEventListener("contextmenu", function(e) {
            e.preventDefault();
            var x = e.pageX + 'px';
            var y = e.pageY + 'px';
            context.style.display = 'block';
            context.style.left = x;
            context.style.top = y;
            curContextMenu = each
        })
    })

    document.addEventListener("click",(e)=>{ //contextMenu가 아닌 부분을 클릭하면 컨텍스트 메뉴 숨김
        e.stopPropagation(); 
        console.log(e.toElement.id)

        //여기서 ID 기준으로 context메뉴 조작

        if(e.toElement.id != id) context.style.display = 'none'
    });

    //.orgchart의 style transform 속성이 변한다면, 컨텍스트 메뉴도 따라가게.
    //document.querySelector(".orgchart").addEventListener("")

    document.addEventListener("contextmenu", function(e) {e.preventDefault();})
}Contextmenu();


var target = document.querySelector('#chart-container .orgchart');

target.style="cursor: default;"

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