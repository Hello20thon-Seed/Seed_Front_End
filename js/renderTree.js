function renderTree() {
    var datasource = {
      'name': 'Lao Lao',
      'title': 'general manager',
      'children': [
        { 'name': 'Bo Miao', 'title': 'department manager' },
        { 'name': 'Su Miao', 'title': 'department manager',
          'children': [
            { 'name': 'Tie Hua', 'title': 'senior engineer' },
            { 'name': 'Hei Hei', 'title': 'senior engineer',
              'children': [
                { 'name': 'Dan Dan', 'title': 'engineer' }
              ]
            },
            { 'name': 'Pang Pang', 'title': 'senior engineer' }
          ]
        },
        { 'name': 'Hong Miao', 'title': 'department manager' }
      ]
    };

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

renderTree();
