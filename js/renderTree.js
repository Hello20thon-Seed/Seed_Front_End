function renderTree(datasource) {

    var oc = $('#chart-container').orgchart({
      'data' : datasource,
      'nodeContent': 'title',
      'pan':true,
      'zoom':true
    });

    var oc2 = $('#chart-container2').orgchart({
        'data' : datasource,
        'nodeContent': 'title',
      });

    oc.$chartContainer.on('touchmove', function(event) {
        event.preventDefault();
    });

    oc2.init({'verticalLevel': 2});
};