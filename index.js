var plus = document.getElementById('plus-goal')
plus.addEventListener("click", function() {
  plus.innerHTML = "목표추가";
});

var prev = document.getElementById('prev')

var wrap = document.getElementByClassName('wrap')
var how = document.getElementByClassName('how')
var next = document.getElementById('next')
next.addEventListener('click', function(){
	wrap.innerHTML('how')	
})