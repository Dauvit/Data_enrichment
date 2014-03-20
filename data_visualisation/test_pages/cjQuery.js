$(document).ready(function(){
    $("#pressme").click(function() {
        var d =  new Date();
        $( "#runme" )
        .remove()
        $( "#result" )
        .after( "<script id=\"runme\" src=\"http://localhost/amati/data.js?"+d.getTime()+"\"></script>" )
        .click();
        console.log(test_data);
        $( "#result" )
        .text( test_data );
        console.log(test_data);
    });
});
