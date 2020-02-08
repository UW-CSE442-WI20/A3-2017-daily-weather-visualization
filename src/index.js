
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



d3.csv("../SpotifyDaily.csv", function(error, data) {
  if (error && error.target.status === 404) {
    console.log("File not found")
  }
  if(data.length === 0){
  console.log("File empty")
  }
  var i;
  for (i = 0; i < 10; i++) {
      console.log(data[i]);
  }
});




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