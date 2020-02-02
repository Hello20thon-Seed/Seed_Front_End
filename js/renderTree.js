var oc
var oc2

function renderTree_toDataSource(datasource){
    console.log("finally render Tree to ID : ")
    console.log(datasource)

    oc = $('#chart-container').orgchart({
      'data' : datasource,
      'nodeContent': 'title',
      'pan':true,
      'zoom':true
    });

    oc2 = $('#chart-container2').orgchart({
        'data' : datasource,
        'nodeContent': 'title',
        'verticalLevel': 2
      });
      
    oc.$chartContainer.on('touchmove', function(event) {
        event.preventDefault();
    });
};

async function changeTree(datasource){  
  oc.init({'data' : datasource});
  oc2.init({'data' : datasource});
	
  showOverMenu();
	
  setTimeout(()=>{
	  Contextmenu();
  }, 100)
}