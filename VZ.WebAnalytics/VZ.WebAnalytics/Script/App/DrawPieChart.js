function DrawPieChart(htmlId, headerText, jsonData) {
    var chart1 = "";
    chart1 = new Highcharts.Chart({
        chart: {
            renderTo: htmlId,

            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: headerText,
            style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || '#333333',
                fontFamily: '\'Lato\', sans-serif', lineHeight: '18px', fontSize: '15px', fontWeghit: 'bold'
            }
        },
        
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    format: '<b>{point.name}</b>: {point.y}',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                        fontFamily: '\'Lato\', sans-serif', lineHeight: '18px', fontSize: '11px'
                    },
                    
                },
                showInLegend: true
            }
        },
        series: [{

            name: "Applications",
            colorByPoint: true,
            data: jsonData
        }],
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }
            }
        }
    });
}
