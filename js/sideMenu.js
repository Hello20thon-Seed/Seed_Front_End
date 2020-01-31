var sideMenu = document.querySelectorAll(".sideBar > div")
var bottomMenu = document.querySelectorAll(".bottomMenu > div")

var curMenu = 0

console.log(sideMenu)

bottomMenu[0].addEventListener("click", (e)=>{
    changeMenu(curMenu, 0)
})

bottomMenu[1].addEventListener("click", (e)=>{
    changeMenu(curMenu, 1)
})

bottomMenu[2].addEventListener("click", (e)=>{
    changeMenu(curMenu, 2)
})

function changeMenu(toHide, toShow){
    sideMenu[toHide].style.display = "none";
    sideMenu[toShow].style.display = "block";
    curMenu = toShow;
}