var plusBtn = document.querySelector("#plusBtn");
var deleteInput = document.querySelectorAll(".deleteInput");
var inputCount = 2;

deleteInput[0].addEventListener("click", (e)=>{
    deleteInputFuc(e)
});
deleteInput[1].addEventListener("click", (e)=>{
    deleteInputFuc(e)
});

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
    console.log(e)
    var semiTitle = e.toElement.parentElement
    console.log(semiTitle)
    semiTitle.parentElement.removeChild(semiTitle)
}
