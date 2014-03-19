$.ajax({
    url: "http://vbrant.ipd.uka.de/RefBank/rbk/name",
    dataType: "jsonp",
    success: function( response ) {
        alert('good stuff'); // server response
    }
});
