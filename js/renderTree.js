var oc
var oc2

function renderTree_toDataSource(datasource){

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
  await oc.init({'data' : datasource});
  await oc2.init({'data' : datasource});
  Contextmenu()
}