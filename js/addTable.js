var plusBtn = document.querySelector("#plusBtn");
var submitBtn = document.querySelector("#submitBtn");
var deleteInput = document.querySelectorAll(".deleteInput");
var inputCount = 2;

deleteInput[0].addEventListener("click", (e)=>{
    deleteInputFuc(e)
});
deleteInput[1].addEventListener("click", (e)=>{
    deleteInputFuc(e)
});

submitBtn.addEventListener("click", ()=>{
    var bigTitle = document.querySelector("#bigTitle").value;
    var semiTitle = document.querySelectorAll(".semiTitleInput");
    console.log(bigTitle);
    
    parentsId = postGoal(bigTitle, 0, null);
    console.log("Parent ID : "+ parentsId)
    for(var i=0; i<semiTitle.length; i++){
        console.log(`${i}번째 세미 타이틀 : ${semiTitle[i].value}`);
        postGoal(semiTitle[i].value, 1, parentsId);

    }

})

plusBtn.addEventListener("click", ()=>{
    inputCount += 1
    var temp = document.createElement("div")
    temp.setAttribute("class", "semiTitle")

    var temp2 = document.createElement("input")
    temp2.setAttribute("type", "text")
    temp2.setAttribute("class", "semiTitleInput")
    temp.appendChild(temp2)

    temp2 = document.createElement("div")
    temp2.setAttribute("class", "deleteInput")
    temp.appendChild(temp2)
    temp2.addEventListener("click", (e)=>{
        deleteInputFuc(e)
    });


    document.querySelector("form").appendChild(temp)
});

function deleteInputFuc(e){
    var semiTitle = e.toElement.parentElement
    semiTitle.parentElement.removeChild(semiTitle)
}


function postGoal(contents, level, parents){
    $.ajax({
		url:'https://seed-api.run.goorm.io/goal/create',
		type: 'POST',
		data:{
			contents: contents,
            level: String(level),
            parent: parents
		},
		dataType:'json',
		success: function(data){
			id = data.id;
            console.log(data.id);
            return data.id;
		},
		error: function(a,b,error){
			alert(error);
		}
	});
}