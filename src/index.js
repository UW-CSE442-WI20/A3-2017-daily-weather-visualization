
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
//var dateArray = getDateArray(new Date('2019-01-01'),new Date('2020-01-01'))
var dateSelect;
var dataset = [];
var headerNames;
var correctDate = [];

var index;

var fileName;

var countryID; 




var startDate = new Date("2019-01-02"); //YYYY-MM-DD
var endDate = new Date("2020-01-01"); //YYYY-MM-DD

var getDateArray = function(start, end) {
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
      var date = new Date(dt);
        //arr.push(new Date(dt));
        
        var dateString = date.getFullYear()  + "-";
        if (date.getMonth() < 9) {
          dateString = dateString + "0";
        } 
        dateString = dateString + (date.getMonth() + 1) + "-";
        if (date.getDate() < 10) {
          dateString = dateString + "0";
        } 
        dateString = dateString + date.getDate();
        arr.push(dateString);
        dt.setDate(dt.getDate() + 1);
    }
    return arr;
}

var dateArr = getDateArray(startDate, endDate);

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
      //console.log(dateSelect);
        
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
            
            console.log(data);
          });
          setTimeout(function(){
           
            },200);


      });


      

      var dateDropdown = d3.select("#vis-container-date")
      .insert("select", "svg")
      .on("change", function(){
       dateSelect = d3.select(this).property('value');
    //   dateSelect = d3.select("#vis-container-date").property('text');

     //   console.log(dateSelect);
        var filtered = dataset.filter(function(d) {
          for (var i = 0; i < dataset.length; i++) {
           // var dateString = dateSelect.getFullYear()  + "-" + (dateSelect.getMonth() + 1) + "-" + dateSelect.getDate()
            //console.log(dateSelect);
           // console.log(dateString);
          return d['date'] === dateSelect;
          }
        })

        console.log(filtered);
       
        for (var i = 0; i < filtered.length; i++) {
          barDataset.push(filtered[i].Streams)
         }
       
       console.log(barDataset);
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
.data(dateArr)
.enter().append("option")
.attr("value", function (d) { return d; })
.text(function (d) {
return d;
   
    //return (d.getMonth() + 1)+ '/' + (d.getDate() ) + '/' + d.getFullYear() ; // capitalize 1st letter

    
});
 
/*

var getDateString = function(d) {
  
  return ( d.getFullYear()  + "-" + (d.getMonth() + 1) + "-" + d.getDate());
}


*/

/*

for (var i = 0; i < dataset.length; i++) {
  if (dataset[i].date == dateSelect) {
      console.log(dataset[i].Streams);
  }
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
      var filtered = dataset.filter(function(d) {
        for (var i = 0; i < dataset.length; i++) {
        return d['date'] === "2019-12-30";
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

 //Width and height
 var w = 500;
 var h = 100;
 var barPadding = 1;
 
 var barDataset = [];
 
 //Create SVG element
 var svg = d3.select("body")
       .append("svg")
       .attr("width", w)
       .attr("height", h);

 svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return i * (w / barDataset.length);
    })
    .attr("y", function(d) {
        return h - (d * 4);
    })
    .attr("width", w / barDataset.length - barPadding)
    .attr("height", function(d) {
        return d * 4;
    })
    .attr("fill", function(d) {
     return "rgb(0, 0, " + Math.round(d * 10) + ")";
    });

 svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
        return d;
    })
    .attr("text-anchor", "middle")
    .attr("x", function(d, i) {
        return i * (w / barDataset.length) + (w / barDataset.length - barPadding) / 2;
    })
    .attr("y", function(d) {
        return h - (d * 4) + 14;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");