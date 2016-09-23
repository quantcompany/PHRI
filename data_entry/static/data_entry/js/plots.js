var chads2_hasbled_plot = new Highcharts.Chart({
    chart: {
        renderTo: 'chads2_hasbled_plot_container',
        type: 'scatter',
        zoomType: 'xy'
    },
    credits: {
        enabled: false
    },
    title: {
        text: 'CHADS2 vs. HAS-BLED'
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
            text: 'HAS-BLED Score',
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
            text: 'CHADS2 Score',
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


var cha2ds2vasc_hasbled_plot = new Highcharts.Chart({
    chart: {
        renderTo: 'cha2ds2vasc_hasbled_plot_container',
        type: 'scatter',
        zoomType: 'xy'
    },
    credits: {
        enabled: false
    },
    title: {
        text: 'CHA2DS2-VASc vs. HAS-BLED'
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
            text: 'HAS-BLED Score',
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
            text: 'CHA2DS2-VASc Score',
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
            to: 9,
            label: {text: 'HIGH', rotation:-90, textAlign: 'center', style: {fontSize: 25}}
         }],
        tickPositions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
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

function updatePlots(){
    chads2_hasbled_plot.series[0].setData([[scores.hasbled, scores.chads2]], true);
    cha2ds2vasc_hasbled_plot.series[0].setData([[scores.hasbled, scores.cha2]], true);
}