var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'CHADS2 vs. HASBLED'
        },
        tooltip: {
            enabled: false
        },
        subtitle: {
            text: 'Stroke / Bleeding Risk'
        },
        xAxis: {
            title: {
                enabled: true,
                text: '<b>LOW</b> ---- <i>CHADS2</i> ---- <b>HIGH</b>',
                style: {
                    fontWeight: 'normal',
                    fontSize: 25,
                }
            },
            plotLines: [{
                color: '#FF0000', // Red
                dashStyle: 'LongDash',
                width: 2,
                value: 3.5
            }],
            tickPositions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            tickInterval:1,
            tickmarkPlacement: 'on',
            gridLineWidth: 1
        },
        yAxis: {
            title: {
                text: 'HASBLED'
            },
            plotLines: [{
                color: '#FF0000', // Red
                dashStyle: 'LongDash',
                width: 2,
                value: 2.5
            }],
            tickPositions: [0, 1, 2, 3, 4, 5],
        },
        legend: {enabled: false},
        plotOptions: {
            scatter: {
                marker: {
                    radius: 20,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(0,0,0)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    enabled: false
                }
            }
        },
        series: [{
            name: 'Result',
            color: 'rgba(220, 20, 60, .75)',
            data: [[2,3]]

        }]
    });
