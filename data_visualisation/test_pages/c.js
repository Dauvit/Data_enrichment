$(document).ready(function(){
    /* $('#result').load('http://vbrant.ipd.uka.de/RefBank/rbk/name'); */
    $.get('vbrant.ipd.uka.de/RefBank/rbk/name', 'jsonp'), function(data) {
        $('#result').html(data);
        $.print('Load was performed.');
        $.print(data);
    };
    $('#result').html('<em>some stuff</em>');
});
