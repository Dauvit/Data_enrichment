var ajaxGetData = function(url) {
    var ret = null;
    jQuery.ajax({
        async: false,
        url: url,
        dataType: "json",
        success: function(data) {
            ret = data;
        }
    });
    return ret;
};

jQuery(document).ready(function(){

    jQuery.jqplot.config.enablePlugins = true;

    var drawPlots = function(data) {
        // Plot Institutions
        var plot2 = $('#insitutions').jqplot(data.institutions,
            {
                //title: 'Institutions',
                seriesDefaults: {
                    shadow: true,
                    renderer: jQuery.jqplot.PieRenderer,
                    rendererOptions: {
                        showDataLabels: true
                    }
                },
                legend: {
                    show:true
                }
            }
        );

        // Plot Species
        var plot3 = $('#species').jqplot(data.species,
            {
                //title: 'Species',
                seriesDefaults: {
                    shadow: true,
                    renderer: jQuery.jqplot.PieRenderer,
                    rendererOptions: {
                        showDataLabels: true
                    }
                },
                legend: {
                    show:true
                }
            }
        );

        // Plot Specimens Distribution
        var plot4 = $('#specimens_distribution').jqplot(data.specimens_distribution.data, {
            //title: 'Specimens Distribution',
            seriesDefaults: {
                renderer: $.jqplot.BarRenderer,
                pointLabels: { show: true }
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: data.specimens_distribution.ticks
                }
            },
            highlighter: { show: false }
        });

        // Plot Materials Citations Records by Journal
        var plot5 = $('#citations').jqplot(data.citations.data, {
            //title: "Materials Citations Records by Journal",
            stackSeries: true,
            seriesDefaults: {
                renderer: $.jqplot.BarRenderer,
                rendererOptions: {
                    barMargin: 30
                },
                pointLabels: {show: true}
            },
            series: data.citations.labels,
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer
                },
                yaxis: {
                    // Don't pad out the bottom of the data range.  By default,
                    // axes scaled as if data extended 10% above and below the
                    // actual range to prevent data points right on grid boundaries.
                    // Don't want to do that here.
                    padMin: 0
                }
            },
            legend: {
                show: true,
                location: 'ne',
                //placement: 'outside'
            }
        });

        // Plot map
        $(function(){
            $('#map1').vectorMap({
                map: 'world_merc_en',
                regionsSelectable: true,
                markersSelectable: true,
                markers: data.georeferenced,
                markerStyle: {
                    initial: {
                        fill: '#4DAC26'
                    },
                    selected: {
                        fill: '#CA0020'
                    }
                },
                regionStyle: {
                    initial: {
                        fill: '#B8E186'
                    },
                    selected: {
                        fill: '#F4A582'
                    }
                },
                series: {
                    markers: [{
                        attribute: 'r'
                    }]
                }
            });
        });
    };

    // Get JSON data from a URL.
    var url = "data.json";
    var data = ajaxGetData(url);

    // Draw plots.
    if (data) {
        drawPlots(data);
    }

});
