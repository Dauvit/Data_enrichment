jQuery.jqplot.config.enablePlugins = true;

jQuery(document).ready(function($){

    var data_url_base = "data.php?f=json&";

    function ajaxGetData(url) {
        var ret = null;
        $.ajax({
            async: false,
            url: url,
            dataType: "json",
            success: function(data) {
                ret = data;
            }
        });
        return ret;
    };

    function drawPlots(data) {

        // Plot Institutions
        if (data.institutions) {
            $('#insitutions').parent().parent().show();

            if (typeof plot_institutions == 'object') {
                plot_institutions.destroy();
            }

            plot_institutions = $.jqplot('insitutions', data.institutions,
                {
                    //title: 'Institutions',
                    seriesDefaults: {
                        shadow: true,
                        renderer: $.jqplot.PieRenderer,
                        rendererOptions: {
                            showDataLabels: true
                        }
                    },
                    legend: {
                        show:true
                    }
                }
            );
        }

        // Plot Species
        if (data.species) {
            $('#species').parent().parent().show();

            if (typeof plot_species == 'object') {
                plot_species.destroy();
            }

            plot_species = $.jqplot('species', data.species,
                {
                    //title: 'Species',
                    seriesDefaults: {
                        shadow: true,
                        renderer: $.jqplot.PieRenderer,
                        rendererOptions: {
                            showDataLabels: true
                        }
                    },
                    legend: {
                        show:true
                    }
                }
            );
        }

        // Plot Specimens Distribution
        if (data.specimens) {
            $('#specimens').parent().parent().show();

            if (typeof plot_specimens == 'object') {
                plot_specimens.destroy();
            }

            plot_specimens = $.jqplot('specimens', data.specimens.data, {
                //title: 'Specimens Distribution',
                seriesDefaults: {
                    renderer: $.jqplot.BarRenderer,
                    pointLabels: { show: true }
                },
                axes: {
                    xaxis: {
                        renderer: $.jqplot.CategoryAxisRenderer,
                        ticks: data.specimens.ticks
                    }
                },
                highlighter: { show: false }
            });
        }

        // Plot Materials Citations Records by Journal
        if (data.citations) {
            $('#citations').parent().parent().show();

            if (typeof plot_citations == 'object') {
                plot_citations.destroy();
            }

            plot_citations = $.jqplot('citations', data.citations.data, {
                //title: "Materials Citations Records by Journal",
                stackSeries: true,
                seriesDefaults: {
                    renderer: $.jqplot.BarRenderer,
                    rendererOptions: {
                        barMargin: 30
                    },
                    pointLabels: {show: false}
                },
                series: data.citations.series,
                axes: {
                    xaxis: {
                        renderer: $.jqplot.CategoryAxisRenderer,
                        ticks: data.citations.xlabels,
                        tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                        tickOptions: {
                            formatString: "%Y",
                            angle: -30
                        },
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
                    show: false,
                    //renderer: $.jqplot.EnhancedLegendRenderer,
                    location: 'ne',
                    placement: 'outside',
                    rendererOptions: {
                        numberRows: 30
                    }
                },
                highlighter: {
                    tooltipAxes: 'y',
                    // Display the series labels on mouseover.
                    tooltipContentEditor: function(str, seriesIndex, pointIndex, plot){
                        return data.citations.series[seriesIndex].label + ': ' + str;
                    },
                }
            });
        }

        // Plot map
        if (data.georef) {
            $('#georef').parent().parent().show();

            map_georef = $('#georef').vectorMap({
                map: 'world_merc_en',
                regionsSelectable: true,
                markersSelectable: true,
                markers: data.georef,
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
        }
    };

    // Make the buttons pretty.
    $( "input[type='submit'], button" )
        .button()
        .click(function( event ) {
            event.preventDefault();
        });

    // Hide all widgets by default.
    $("#widgets-container .ui-widget").hide();

    // Set Refresh button callback.
    $( "input[name='refresh']" ).click(function() {
        var data = null;
        var form_get = $("form[name='search']").serialize();

        // Hide all widgets.
        $("#widgets-container .ui-widget").hide();

        // Get JSON data from a URL.
        data = ajaxGetData(data_url_base + form_get);

        // Update plots.
        if (data) {
            drawPlots(data);
        }
    });
});
