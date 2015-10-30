$(function () {
    arrDateTime = ["10/26/2015", "10/26/2015", "10/26/2015", "10/26/2015"];
    arrNoOfVisters = [100,29,49,70];
    DrawLineGraph("siteMetrcis", arrDateTime, arrNoOfVisters,"Site Metrics","Visits")
});

function DrawBarGraph(htmlId, arrNonProductiveData, arrProductiveData, arrCategories, headerText, arrProductiveInSec, arrNonProductiveInSec) {
    var chart;
    var selected = null;
    chart = new Highcharts.Chart({

        chart: {
            renderTo: htmlId,
            type: 'column'
        },
        title: {
            text: headerText,
            style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || '#333333',
                fontFamily: '\'Lato\', sans-serif', lineHeight: '18px', fontSize: '18px', fontWeghit: 'bold'
            }
        },
        xAxis: {
            categories: arrCategories,
            labels: {
                style: {
                    color: '#606060',
                    fontSize: '14px',
                    cursor: 'pointer'
                },
                events: {

                    click: function (e) {
                        var index = arrCategories.indexOf(this.value);
                     




                    },

                }

            },

        },
        yAxis: {
            min: 0,
            title: {
                text: 'Time in %',
                style: {
                    color: '#606060',
                    fontSize: '15px',

                }

            },
            labels: {
                style: {
                    color: '#606060',
                    fontSize: '14px',
                }
            }
        },
        tooltip: {
            //  pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}%</b> (' + '{point.y}' + '%)<br/>',
            shared: true,
            formatter: function () {
                var s = '' + this.x + ' (Total: ';
                var ind = arrCategories.indexOf(this.x);
                if (ind > -1) {
                    s += Math.round((arrProductiveInSec[ind] + arrNonProductiveInSec[ind]), 2) + ' Mins)'
                }
                $.each(this.points, function (i, point) {
                    s += '<br/><span style="color:' + point.series.color + '">' + point.series.name + '</span>: <b>' + point.y + '%</b>';

                    if (ind > -1) {
                        s += ' (' + point.series.options.composition[ind] + ' Mins)';
                    }
                });

                return s;
            }
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            },
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function (e) {
                            
                        },
                        mouseOver: function () {
                            if (this != selected)
                                this.update({ borderColor: '#ffffff', borderWidth: 1 }, true, false);
                        },
                        legendItemClick: function () {
                            return false;
                        }


                    }
                },
                events: {
                    legendItemClick: function () {
                        return false; // <== returning false will cancel the default action
                    }
                }



            },

        },

        series: [{
            name: 'Non-Productive',
            data: arrNonProductiveData,
            composition: arrNonProductiveInSec,
            color: '#db143c'

        }, {
            name: 'Productive',
            data: arrProductiveData,
            composition: arrProductiveInSec,
            color: '#4681b3'

        }],
        navigation: {
            buttonOptions: {
                theme: {

                    style: {
                        color: 'White',
                        fontSize: '14px',
                        align: 'center',
                        cursor: 'pointer'
                    }
                }
            }
        },
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false


                },

            },
        },


    });
    if ($("#" + htmlId).highcharts() && $("#" + htmlId).highcharts().series) {
        var series = $("#" + htmlId).highcharts().series[0];
        $(series.chart.xAxis[0].labelGroup.element.childNodes[0]).css('fill', 'red');
        $(series.chart.xAxis[0].labelGroup.element.childNodes[0]).css('fontSize', '16px');
        $(series.chart.xAxis[0].labelGroup.element.childNodes[0]).css('font-weight', 'bold');
    }

}

function ChartRedraw(htmlId) {
    var NewChart = $("#" + htmlId).highcharts();
    NewChart.redraw();
}
function DrawInlineBarGraph(htmlId, arrNonProductiveData, arrProductiveData, arrCategories, headerText, arrProductiveInfo, arrNonProductiveInfo) {
    var chart3 = "";

    chart3 = new Highcharts.Chart({

        chart: {
            renderTo: htmlId,
            type: 'column'
        },
        title: {
            text: headerText,
            style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || '#333333',
                fontFamily: '\'Lato\', sans-serif', lineHeight: '18px', fontSize: '16px', fontWeghit: 'bold'
            }
        },

        xAxis: {
            categories: arrCategories,
            labels: {
                style: {
                    color: '#606060',
                    fontSize: '13px',
                    cursor: 'pointer'
                },
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Time in %',
                style: {
                    color: '#606060',
                    fontSize: '14px',
                },

            },
            style: {
                color: '#606060',
                fontSize: '13px',
            },

        },
        tooltip: {
            //pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            //shared: true
            shared: true,
            formatter: function () {
                var ind = arrCategories.indexOf(this.x);
                var s = '<b>Agent Name:' + arrNonProductiveInfo[ind].AgentName + '</b><br/>' + this.x + ' (Total: ';
                if (ind > -1) {
                    s += (arrProductiveInfo[ind].inSec + arrNonProductiveInfo[ind].inSec) + ' Mins)'
                }
                $.each(this.points, function (i, point) {
                    s += '<br/><span style="color:' + point.series.color + '">' + point.series.name + '</span>: <b>' + point.y + '%</b>';

                    if (ind > -1) {
                        s += ' (' + point.series.options.composition[ind].inSec + ' Mins)';
                    }
                });

                return s;
            }
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            },
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function (e) {
                            var DesktopAnalyticsScope = angular.element($('#DesktopAnalytics-container')).scope();
                            var avayaUCID = "";
                            var AgentId = "";
                            if (DesktopAnalyticsScope) {
                                avayaUCID = DesktopAnalyticsScope.getCallID(this.category);
                            }
                            if (!avayaUCID) {
                                avayaUCID = "";
                            }
                            if (this.series.options.composition[this.x].AgentId) {
                                AgentId = this.series.options.composition[this.x].AgentId;
                            }
                            $.ajax({
                                type: "POST",
                                url: UsageDataForCallIdUrl,
                                async: false,
                                data: "{ 'AvayaUCID':'" + avayaUCID + "','AgentID':'" + AgentId + "'}",
                                contentType: 'application/json; charset=utf-8',
                                dataType: "json",
                                success: function (Res) {

                                    if (DesktopAnalyticsScope) {
                                        DesktopAnalyticsScope.BindCallIdUsageData(Res);
                                    }
                                },
                                error: function (jqXHR, textStatus, errorThrown) {

                                }
                            });
                        },

                    }
                },
                events: {
                    legendItemClick: function () {
                        return false; // <== returning false will cancel the default action
                    }
                }
            }
        },

        series: [{
            name: 'Non-Productive',
            data: arrNonProductiveData,
            composition: arrNonProductiveInfo,
            color: '#db143c'
        }, {
            name: 'Productive',
            data: arrProductiveData,
            composition: arrProductiveInfo,
            color: '#4681b3'
        }],
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                },

            }
        },


    });


}



function DrawLineGraph(htmlId, arrDateTime, NoOfVisters, HeaderText,yaxisTitle) {
    var chart4 = "";
    var selected = "";
    chart4 = new Highcharts.Chart({
        chart: {
            renderTo: htmlId,
            type: 'areaspline'
        },

        title: {
            text: HeaderText,
            x: -20, //center,
            style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || '#333333',
                fontFamily: '\'Lato\', sans-serif', lineHeight: '14px', fontSize: '18px', fontWeghit: 'bold'
            }
        },
        xAxis: {
            categories: arrDateTime
        },
        yAxis: {
            title: {
                text: yaxisTitle
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '',
            shared: true,
            formatter: function () {
                var s = '' + this.x;
                var ind = arrDateTime.indexOf(this.x);

                $.each(this.points, function (i, point) {
                    if (ind > -1) {
                     //   s += '<br/>App Name: <b>' + point.series.options.composition[ind].AppName + '</b>';
                    }
                   // s += '<br/><span style="color:' + point.series.color + '">' + point.series.name + '</span>: <b>' + point.y + '</b>';
                });

                return s;
            }
        },
        legend: {
            //enabled: false
        },
        series: [{
            name: 'Visits',
            data: NoOfVisters,
          //  composition: arrAppUsageInfo
        }],
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                },

                //customButton: {
                //    text: 'Back',
                //    style: {
                //        color: 'red',
                //        cursor: 'pointer'
                //    },
                //    onclick: function () {
                //        var DesktopAnalyticsScope = angular.element($('#DesktopAnalytics-container')).scope();
                //        if (htmlId == "piechart2") {
                //            //  DesktopAnalyticsScope.BindCallDetailsData(DesktopAnalyticsScope.CallDetails);
                //            DesktopAnalyticsScope.backFromCallUsageDetails();
                //            DesktopAnalyticsScope.ShowAllWeekData(null, DesktopAnalyticsScope.ActiveAppUsageDetails, DesktopAnalyticsScope.CallDetails);
                //        }
                //    }
                //},

            }
        }
    });
}
