var titleEl = document.querySelectorAll('.mainTree .title');

for(let i=0;i<titleEl.length;i++){
	titleEl[i].addEventListener("click", (el)=>{
		console.log(el)
		titleEl[i].style.backgroundColor="black"
	})
}