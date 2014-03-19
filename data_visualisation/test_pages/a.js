$(document).ready(function(){
  $.jqplot('chartdiva',  [[[1, 2],[3,5.12],[5,13.1],[7,33.6],[9,85.9],[11,219.9]]],
  { title:'Exponential Line with renderer',
    axes:{yaxis:{renderer: $.jqplot.LogAxisRenderer}},
    series:[{color:'#5FAB78'}]
  });
  $.jqplot('chartdivb',  [[[1, 2],[3,5.12],[5,13.1],[7,33.6],[9,85.9],[11,219.9]]],
  { title:'Exponential Line hard coded',
    axes:{xaxis:{min:0, max:12}, yaxis:{min:-10, max:240}},
    series:[{color:'#5FAB78'}]
  });
});
