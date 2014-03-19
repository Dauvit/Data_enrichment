$(document).ready(function(){
    $("#pressme").click(function() {
        var d =  new Date();
        $( "#runme" )
        .replaceWith( "<script id=\"runme\" src=\"http://localhost/amati/data.js?"+d.getTime()+"\"></script>" )
        .ready(function() {
            $( "#result" ).replaceWith( "<p id=\"result\">"+d.getTime()+"</p>" )
            .ready(function() {
                $( "#result" )
                .text( test_data );
            });
        });
    });

});
