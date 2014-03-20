window.onload = function(){
    document.getElementById("pressme").addEventListener("click", getData, false);
};
function getData() {
    /*var elem = document.getElementById('runme');
    var elemParent = elem.parentNode;
    elemParent.removeChild(elem);

    var d =  new Date();
    var GM_JQ = document.createElement('script'); 
    GM_JQ.setAttribute('id','runme');
    //GM_JQ.src = 'http://plazi.cs.umb.edu/GgServer/srsStats/stats?outputFields=bib.author+bib.year+matCit.specimenCount&FP-bib.year=2004-2010&groupingFields=bib.author+bib.year&orderingFields=bib.year&format=json?timestamp='+d.getTime();
    GM_JQ.src = '/stats.json?timestamp='+d.getTime();
    // GM_JQ.src = 'http://localhost/amati/data.js?timestamp='+d.getTime();
    GM_JQ.type = 'text/javascript'; 
    //document.getElementById('result').parentNode.appendChild(GM_JQ); 
    theData = null;
    elemParent.appendChild(GM_JQ);
    window.setTimeout('renderData()',100);*/
    var d =  new Date();
    $.getJSON(('./stats.json?timestamp='+d.getTime()), function(data) {
        console.log(data.labels.BibAuthor);
        console.log(data.data[0].BibAuthor);
        console.log(data.data[1].BibAuthor);
    });
};
function renderData() {
    if (theData == null) {
        window.setTimeout('renderData()',100);
        return;
    }
    console.log(theData);
    $( "#result" ).text(theData);
    console.log(theData);
}
var theData = null;