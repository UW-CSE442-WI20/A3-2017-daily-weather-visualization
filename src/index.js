
var countriesList = ['ca','dk',	'gr',	'is',	'mx',	'ph',	'sv',
'ar',	'ch',	'do',	'gt',	'it',	'my',	'pl',	'th',
'at',	'cl',	'ec',	'hk',	'jp',	'pt',	'tr',
'au',	'co',	'hn',	'nl',	'py',	'tw',
'be',	'cr',	'es',	'hu',	'no',	'ro',	'us',
'fi',	'id',	'nz',	'se',	'uy',
'bo',	'cz',	'fr',	'ie',	'pa',	'sg',	'vn',
'br',	'de',	'gb',	'il',	'pe',   'sk',	'global'];


var countriesName = [	'Canada',	'Denmark',	'Greece',	'Iceland',	'Mexico',	'Philippines',	'El Salvador',
'Argentina',	'Switzerland',	'Dominican Republic',	'Guatemala',	'Italy',	'Malaysia',	'Poland',	'Thailand',
'Austria',	'Chile',	'Ecuador',	'Hong Kong',	'Japan',	'Portugal',	'Turkey',
'Australia',	'Columbia',	'Honduras',	'Netherlands',	'Paraguay',	'Taiwan',
'Belgium',	'Costa Rica',	'Spain',	'Hungary',	'Norway',	'Romania',	'United States',
'Finland',	'Indonesia',	'New Zealand',	'Sweden',	'Uruguay',
'Bolivia',	'Czech Republic',	'France',	'Ireland',	'Panama',	'Singapore',	'Vietnam',
'Brazil',	'Germany',	'United Kingdom',	'Israel',	'Peru',	'Slovakia',	'global'];

var dataset;
var headerNames;
d3.csv("../top10perCountry2019/streamsglobal10.csv", function(error, data) {
  if (error && error.target.status === 404) {
    console.log("File not found")
  }
  if(data.length === 0){
  console.log("File empty")
  }
  var i;
  headerNames = d3.keys(data[0]);

  for (i = 0; i < data.length; i++) {
     // console.log(data[i]);

  }
  dataset = data;
});
setTimeout(function(){
  //console.log(dataset);
  },200);

//console.log(dataset.length);


/*
var filtered;
function filter_data(selection) {
  d3.csv("../top10perCountry2019/streamsus10.csv", function(error, data) {

      var filtered_data = data.filter(function(d) {
          return d[6] == selection;
      })
      filtered = filter_data;
  });
  setTimeout(function(){
    console.log(filtered);
    },200);
}
*/


//On click, update with new data			
d3.selectAll("p")
  .on("click", function() {

    //See which p was clicked
    var paragraphID = d3.select(this).attr("id");
    
    //Decide what to do next
    if (paragraphID == "us") {
      //filtered_data(paragraphID);
    
     //console.log(filtered.length);
     for (var i = 0; i < dataset.length; i++) {
     // data.filter(function(d){ return d.da == "toto" })
     console.log(dataset[i]);
     }
     console.log(headerNames);
      
    } else {
      console.log("global")
    }
  });


 
  /*

//Width and height
var w = 500;
var h = 100;
var barPadding = 1;


//Create SVG element
var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
      return i * (w / data.length);
    })
    .attr("y", function(d) {
      return h - (d * 4);
    })
    .attr("width", w / data.length - barPadding)
    .attr("height", function(d) {
      return d * 4;
    })
    .attr("fill", function(d) {
    return "rgb(0, 0, " + Math.round(d * 10) + ")";
    });

svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(function(d) {
      return d;
    })
    .attr("text-anchor", "middle")
    .attr("x", function(d, i) {
      return i * (w / data.length) + (w / data.length - barPadding) / 2;
    })
    .attr("y", function(d) {
      return h - (d * 4) + 14;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");



*/


//var fileName = "../top10perCountry2019/streams" + countriesList[i] + "10.csv";
/*
var fileName = "./top10perCountry2019/streamsus10.csv";
var i;
d3.csv(fileName, function(data) {
  for (i = 0; i < 10; i++) {
    if (data[i].Country == "United States") {
      console.log(data[i]);
    }
      
  }
});



var fileName = "../streamsus10.csv";
var i;
d3.csv(fileName, function(data) {
  for (i = 0; i < 10; i++) {
    if (data[i].Country == "United States") {
      console.log(data[i]);
    }
      
  }
});
*/