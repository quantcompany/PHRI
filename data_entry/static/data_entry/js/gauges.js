var gaugeOptions = {
    exporting: {
        enabled: false
    },

    chart: {
        type: 'solidgauge',
        backgroundColor: 'transparent',
        spacing: [5, 5, 5, 5]
    },

    title: null,

    pane: {
        center: ['50%', '85%'],
        size: '160%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

    tooltip: {
        enabled: false
    },

    // the value axis
    yAxis: {
        lineWidth: 3,
        title: {
            y: 60
        },
        labels: {
            y: -1
        }
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    }
};


//////////////// INITIALIZING ALL CHARTS //////////////////////

// Chads2 score gauge
$('#chads2-score-gauge').highcharts(Highcharts.merge(gaugeOptions, {
    yAxis: {
        min: 0,
        max: 6,
        title: {text: 'Score'},
        tickInterval: 1,
        minorTickInterval: null,
        stops: [
            [0.2, '#55BF3B'], // green
            [0.4, '#DDDF0D'], // yellow
            [0.5, '#ff9999'], // red
            [1, '#FF4D4D']
        ]
    },

    credits: {
        enabled: false
    },

    series: [{
        name: 'Score',
        data: [scores.chads2],
        dataLabels: {
            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/></div>'
        }
    }]
}));


// Chads2 risk percentage gauge
$('#chads2-percentage-gauge').highcharts(Highcharts.merge(gaugeOptions, {
    yAxis: {
        min: 1.9,
        max: 18.2,
        title: {text: 'Risk'},
        tickInterval: 2,
        minorTickInterval: null,
        stops: [
            [0.2, '#55BF3B'], // green
            [0.4, '#DDDF0D'], // yellow
            [0.5, '#ff9999'], // red
            [1, '#FF4D4D']
        ]
    },
    series: [{
        name: 'Percentage',
        data: [risks.stroke.chads2Score(scores.chads2).percentage],
        dataLabels: {
            formatter: function(){
                return '<div style="text-align:center"><span style="font-size:15px;color:' + 
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">' + this.y + ' %</span><br/>' +
                '<span style="font-size:12px;color:black">' + risks.stroke.chads2Score(scores.chads2).ci + '</span></div>'
            }
        }
    }]
}));


// Cha2 score gauge
$('#cha2-score-gauge').highcharts(Highcharts.merge(gaugeOptions, {
    yAxis: {
        min: 0,
        max: 9,
        title: {text: 'Score'},
        tickInterval: 1,
        minorTickInterval: null,
        stops: [
            [0, '#55BF3B'], // green
            [0.5, '#DDDF0D'], // yellow
            [1, '#FF4D4D'] // red
        ]
    },

    credits: {
        enabled: false
    },

    series: [{
        name: 'Score',
        data: [scores.cha2],
        dataLabels: {
            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/></div>'
        }
    }]
}));


// Cha2 risk percentage gauge
$('#cha2-percentage-gauge').highcharts(Highcharts.merge(gaugeOptions, {
    yAxis: {
        min: 0,
        max: 15.2,
        title: {text: 'Risk'},
        tickInterval: 2,
        minorTickInterval: null,
        stops: [
            [0, '#55BF3B'], // green
            [0.5, '#DDDF0D'], // yellow
            [1, '#FF4D4D'] // red
        ]
    },
    series: [{
        name: 'Percentage',
        data: [risks.stroke.cha2Score(scores.cha2).percentage],
        dataLabels: {
            formatter: function(){
                return '<div style="text-align:center"><span style="font-size:25px;color:' + 
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">' + this.y + ' %</span><br/></div>'
            }
        }
    }]
}));


// Hasbled score gauge
$('#hasbled-score-gauge').highcharts(Highcharts.merge(gaugeOptions, {
    yAxis: {
        min: 0,
        max: 9,
        title: {text: 'Score'},
        tickInterval: 1,
        minorTickInterval: null,
        stops: [
            [0, '#55BF3B'], // green
            [0.5, '#DDDF0D'], // yellow
            [1, '#FF4D4D'] // red
        ]
    },

    credits: {
        enabled: false
    },

    series: [{
        name: 'Score',
        data: [scores.hasbled],
        dataLabels: {
            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/></div>'
        }
    }]
}));


// Hasbled risk percentage gauge
$('#hasbled-percentage-gauge').highcharts(Highcharts.merge(gaugeOptions, {
    yAxis: {
        min: 1.13,
        max: 12.5,
        title: {text: 'Risk'},
        tickInterval: 2,
        minorTickInterval: null,
        stops: [
            [0, '#55BF3B'], // green
            [0.5, '#DDDF0D'], // yellow
            [1, '#FF4D4D'] // red
        ]
    },
    series: [{
        name: 'Percentage',
        data: [risks.bleeding.hasbledScore(scores.hasbled).percentage],
        dataLabels: {
            formatter: function(){
                return '<div style="text-align:center"><span style="font-size:25px;color:' + 
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">' + this.y + ' %</span><br/></div>'
            }
        }
    }]
}));


function updateChads2Gauges(){
    $('#chads2-score-gauge').highcharts().series[0].points[0].update(scores.chads2);
    $('#chads2-percentage-gauge').highcharts().series[0].points[0].update(risks.stroke.chads2Score(scores.chads2).percentage);
}


function updateCha2Gauges(){
    $('#cha2-score-gauge').highcharts().series[0].points[0].update(scores.cha2);
    $('#cha2-percentage-gauge').highcharts().series[0].points[0].update(risks.stroke.cha2Score(scores.cha2).percentage);
}


function updateHasbledGauges(){
    $('#hasbled-score-gauge').highcharts().series[0].points[0].update(scores.hasbled);
    $('#hasbled-percentage-gauge').highcharts().series[0].points[0].update(risks.bleeding.hasbledScore(scores.hasbled).percentage);
}


    // Bring life to the dials
    // setTimeout(function () {
    //     // Speed
    //     var chart = $('#container-speed').highcharts(),
    //         point,
    //         newVal,
    //         inc;

    //     if (chart) {
    //         point = chart.series[0].points[0];
    //         inc = Math.round((Math.random() - 0.5) * 100);
    //         newVal = point.y + inc;

    //         if (newVal < 0 || newVal > 200) {
    //             newVal = point.y - inc;
    //         }

    //         point.update(newVal);
    //     }

    //     // RPM
    //     chart = $('#container-rpm').highcharts();
    //     if (chart) {
    //         point = chart.series[0].points[0];
    //         inc = Math.random() - 0.5;
    //         newVal = point.y + inc;

    //         if (newVal < 0 || newVal > 5) {
    //             newVal = point.y - inc;
    //         }

    //         point.update(newVal);
    //     }
    // }, 2000);
