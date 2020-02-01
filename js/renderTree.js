$(function() {
    $.mockjax({
        url: '/orgchart/initdata',
        responseTime: 1000,
        contentType: 'application/json',
        responseText: {
            'name': 'Lao Lao',
            'title': 'general manager',
            'children': [
                { 'name': 'Bo Miao', 'title': 'department manager' },
                { 'name': 'Su Miao', 'title': 'department manager',
                'children': [
                    { 'name': 'Tie Hua', 'title': 'senior engineer',
                    'children': [
                    { 'name': 'Pang Pang', 'title': 'engineer' }
                    ] },
                    { 'name': 'Hei Hei', 'title': 'senior engineer',
                    'children': [
                        { 'name': 'Pang Pang', 'title': 'engineer' },
                        { 'name': 'Xiang Xiang', 'title': 'UE engineer' }
                    ]
                    }
                ]
                },
                { 'name': 'Yu Jie', 'title': 'department manager' }
            ]
        }
    });

    $('#chart-container').orgchart({
        'data' : '/orgchart/initdata',
        'nodeContent': 'title',
        'pan': true,
        'zoom': true
    });

    oc.$chartContainer.on('touchmove', function(event) {
        event.preventDefault();
    });

});