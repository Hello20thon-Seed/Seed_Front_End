var plusBtn = document.querySelector("#plusBtn");
var submitBtn = document.querySelector("#submitBtn");
var deleteInput = document.querySelectorAll(".deleteInput");
var inputCount = 2;
var parentsId = 0;
var user = login().data;
var selectForkId = null;

console.log("user ")
console.log(user)

deleteInput[0].addEventListener("click", (e)=>{
    deleteInputFuc(e);
});
deleteInput[1].addEventListener("click", (e)=>{
    deleteInputFuc(e);
});

submitBtn.addEventListener("click", function submit(){
    var bigTitle = document.querySelector("#bigTitle").value.trim();
    var semiTitle = document.querySelectorAll(".semiTitleInput");
    console.log(bigTitle);
    if(bigTitle == ''){
        alert("빈칸을 모두 채워주세요!");
    }
    else{
        for(var i=0; i<semiTitle.length; i++){
            if(semiTitle[i].value.trim() == ''){
                alert("빈칸을 모두 채워주세요!");
                return;
            }   
        }
        
		postGoal(bigTitle, 0, undefined);
		setTimeout(async()=>{
			semiTitle.forEach(async(eachSemiTitle) => {
				await postGoal(eachSemiTitle.value, 1, parentsId);
            });

            forkTable(parentsId, user.email);
            
            setTimeout(()=>{
                location.href = "../index.html";
            }, 300)
        }, 300);
    }
});


function forkTable(tableId, userEmail){
    $.ajax({
		url: url+'/fork/create',
		type: 'POST',
		data:{
            id : tableId,
            owner : userEmail
		},
		dataType:'json',
		success: function(data){
            console.log(`Fork ${tableId} to ${userEmail}`)
			selectForkId = data.id;
		},
		error: function(a,b,error){
			console.log("Error : "+error);
		}
    });
}


plusBtn.addEventListener("click", ()=>{
    inputCount += 1;
    var temp = document.createElement("div");
    temp.setAttribute("class", "semiTitle");

    var temp2 = document.createElement("input");
    temp2.setAttribute("type", "text");
    temp2.setAttribute("class", "semiTitleInput");
    temp.appendChild(temp2);

    temp2 = document.createElement("div");
    temp2.setAttribute("class", "deleteInput");
    temp2.innerHTML = '<img src="../images/delete_icon.png" alt="" height="20px">';
    temp.appendChild(temp2);
    
    temp2.addEventListener("click", (e)=>{
        deleteInputFuc(e);
    });

    document.querySelector("form").appendChild(temp);
});

function deleteInputFuc(e){
    $(e.toElement).parentsUntil("div.semiTitle").parent().remove();
    var semiTitle = e.toElement.parentElement;
    semiTitle.parentElement.removeChild(semiTitle);
}