function updateChart(){
    chart.series[0].setData([[scores.hasbled, scores.chads2]], true);
}

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
            text: 'HAS-BLED',
            style: {
                fontWeight: 'normal',
                fontSize: 25,
            }
          },
        labels: {style: {fontSize: 15}},
        plotLines: [{
            color: '#FF0000', // Red
            dashStyle: 'LongDash',
            width: 2,
            value: 3.5
        }],
        plotBands: [
        { // Low
            color: 'rgba(220, 20, 60, 0)',
            from: 0,
            to: 3.5,
            label: {text: 'LOW', y: -2.5, verticalAlign:'bottom', style: {fontSize: 25}}
         },
         { // high
            color: 'rgba(220, 20, 60, 0.07)',
            from: 3.5,
            to: 9,
            label: {text: 'HIGH', y: -2.5, verticalAlign:'bottom', style: {fontSize: 25}}
            }
         ],
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
            text: 'CHADS2',
            style: {
                fontWeight: 'normal',
                fontSize: 25,
            }
        },
        labels: {style: {fontSize: 15}},
        plotLines: [{
            color: '#FF0000', // Red
            dashStyle: 'LongDash',
            width: 2,
            value: 2.5
        }],
        plotBands: [
        { // Low
            color: 'rgba(220, 20, 60, 0)',
            from: 0,
            to: 2.5,
            label: {text: 'LOW', rotation:-90, textAlign: 'center', style: {fontSize: 25}}
         },
         { // high
            color: 'rgba(220, 20, 60, 0.07)',
            from: 2.5,
            to: 6,
            label: {text: 'HIGH', rotation:-90, textAlign: 'center', style: {fontSize: 25}}
         }],
        tickPositions: [0, 1, 2, 3, 4, 5, 6],
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
        data: [[0, 0]]

    }]
});
