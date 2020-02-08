
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


var dates = [	'1/1/19', '12/31/19'];

var dateSelect;
var dataset = [];
var headerNames;
var correctDate = [];

var index;

var fileName;

var countryID; 


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
      console.log(data[i]);

  }
  dataset = data;
});
setTimeout(function(){
  //console.log(dataset);
  },200);
  
/*

//On click, update with new data			
d3.selectAll("p")
  .on("click", function() {

    //See which p was clicked
    var paragraphID = d3.select(this).attr("id");
    
    //Decide what to do next
    //if (paragraphID == "us") {
      fileName = "../top10perCountry2019/streams" + paragraphID + "10.csv";

      d3.csv(fileName, function(error, data) {
        if (error && error.target.status === 404) {
          console.log("File not found")
        }
        if(data.length === 0){
        console.log("File empty")
        }
        var i;
        headerNames = d3.keys(data[0]);
      
        for (i = 0; i < data.length; i++) {
           console.log(data[i]);
      
        }
        dataset = data;
      });
      setTimeout(function(){
        //console.log(dataset);
        },200);


  });

  */
  
  var Countries = (countriesName).slice(0);
  Countries = Countries.sort();
  

  var dropdown = d3.select("#vis-container")
      .insert("select", "svg")
      .on("change", function(){

       // var dateS = d3.select("#vis-container-date").property('value');
        var country = d3.select(this).property('value');
        index = countriesName.indexOf(country);
      console.log(dateSelect);
        
          fileName = "../top10perCountry2019/streams" + countriesList[index] + "10.csv";
      
          d3.csv(fileName, function(error, data) {
            if (error && error.target.status === 404) {
              console.log("File not found")
            }
            if(data.length === 0){
            console.log("File empty")
            }
            var i;
            headerNames = d3.keys(data[0]);
          
           
            dataset = data;
/*
            var filtered = dataset.filter(function(d) {
              for (var i = 0; i < dataset.length; i++) {
                
              return d['date'] === '12/31/19';
              }
            })
*/
          //  console.log(filtered);
           
          });
          setTimeout(function(){
            //console.log(dataset);
            },200);
            console.log(typeof(dateSelect));
            for (var i = 0; i < dataset.length; i++) {
              if (dataset[i].date === dateSelect.toString()) {
                  console.log(dataset[i]);
              }
            }
            console.log(headerNames);

      });


      

      var dateDropdown = d3.select("#vis-container-date")
      .insert("select", "svg")
      .on("change", function(){
        dateSelect = d3.select(this).property('value');
        console.log(dateSelect);

      });

      
   



dropdown.selectAll("option")
.data(Countries)
.enter().append("option")
.attr("value", function (d) { return d; })
.attr("selected", function(d){
  return d === "Global";
})
.text(function (d) {
    return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter

    
});



dateDropdown.selectAll("option")
.data(dates)
.enter().append("option")
.attr("value", function (d) { return d; })
.text(function (d) {
    return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter

    
});
 





for (var i = 0; i < dataset.length; i++) {
  if (dataset[i].date == dateSelect) {
      console.log(dataset[i]);
  }
}


//On click, update with new data			
d3.selectAll("p")
  .on("click", function() {

    //See which p was clicked
    var paragraphID = d3.select(this).attr("id");
    
    //Decide what to do next
    if (paragraphID == "us") {
      //filtered_data(paragraphID);
      var filtered = dataset.filter(function(d) {
        for (var i = 0; i < dataset.length; i++) {
        return d['date'] === dateSelect;
        }
      })
      
     //console.log(filtered.length);
     //for (var i = 0; i < dataset.length; i++) {
     
    // console.log(dataset[i]);
     //}
     console.log(headerNames);
     console.log(filtered);
      
    } else {
      console.log("global")
    }
  });

 