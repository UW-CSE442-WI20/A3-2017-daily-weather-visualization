
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
//const data1 = await d3.csv("../top10perCountry2019/streamsglobal10.csv");


d3.csv("../top10perCountry2019/streamsglobal10.csv").then(function(data) {
  /*
  if (error && error.target.status === 404) {
    console.log("File not found")
  }
  if(data.length === 0){
  console.log("File empty")
  }
  */
  var i;
  headerNames = d3.keys(data[0]);

  for (i = 0; i < data.length; i++) {
      console.log(data[i]);
      //console.log(date)

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
      
          d3.csv(fileName).then(function(data) {
  
            var i;
            headerNames = d3.keys(data[0]);
          
           
            dataset = data;
            
            console.log(data);
          });
          setTimeout(function(){
           
            },200);


      });


      var songNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      //var songNames = ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1'];


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
        //var barDataset = [parseInt("4323160")/1000000.0, parseInt("4275439")/1000000.0, parseInt("3947420")/1000000.0, parseInt("3307383")/1000000.0, parseInt("3188386")/1000000.0, parseInt("2896056")/1000000.0, parseInt("2642425")/1000000.0, parseInt("2598097")/1000000.0, parseInt("2512089")/1000000.0, parseInt("2419735")/1000000.0];
var barDataset = [[]];
var songNames = [''];
        console.log(filtered);
        for (var i = 0; i < filtered.length; i++) {
          var arrayObj = [parseInt(filtered[i].Streams)/1000000.0, filtered[i]['Track Name']]
         // barDataset.push(parseInt(filtered[i].Streams)/1000000.0)
          //songNames.push(filtered[i]['Track Name'])
         // barDataset.remove()
          barDataset[i] = arrayObj;
        
         }


         var barPadding = 1;

  var margin = {
    top: 15,
    right: 25,
    bottom: 15,
    left: 60
};

w= 960 - margin.left - margin.right;
    h = 500 - margin.top - margin.bottom;

    //set the ranges
    var y = d3.scaleBand()
              .range([h, 0])
              .padding(0.1);
    
    var x = d3.scaleLinear()
              .range([0, w]);
    
//Create SVG element

var svg = d3.select("body").append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
          //barDataset = [parseInt("4323160")/1000000.0, parseInt("4275439")/1000000.0, parseInt("3947420")/1000000.0, parseInt("3307383")/1000000.0, parseInt("3188386")/1000000.0, parseInt("2896056")/1000000.0, parseInt("2642425")/1000000.0, parseInt("2598097")/1000000.0, parseInt("2512089")/1000000.0, parseInt("2419735")/1000000.0];
          //barDataset.sort();
/*
          barDataset = [
            [parseInt("4323160")/1000000.0,'1'], 
            [ parseInt("4275439")/1000000.0, '2'],
            [ parseInt("3947420")/1000000.0, '3'], 
            [ parseInt("3307383")/1000000.0, '4'], 
            [ parseInt("3188386")/1000000.0, '5'], 
            [ parseInt("2896056")/1000000.0, '6'], 
            [ parseInt("2642425")/1000000.0, '7'], 
            
          [parseInt("2598097")/1000000.0, '8'], 
          [ parseInt("2512089")/1000000.0, '9'], 
          [ parseInt("2419735")/1000000.0, '10']];
*/
          /*
var svg = d3.select("body")
.append("svg")
.attr("width", w)
.attr("height", h);
*/

//
/*
var yScale = d3.scaleBand()
.domain(d3.range(barDataset.length))
.rangeRound([0, w])
.paddingInner(0.05);

var xScale = d3.scaleLinear()
.domain([0, d3.max(barDataset, function(d) { return d.value; })])
.range([0, h]);

*/
 //Select…
 var bars = svg.selectAll("rect")
 .data(barDataset);
 
var barDataset = [[]];
var songNames = [''];
        console.log(filtered);
        for (var i = 0; i < filtered.length; i++) {
          var arrayObj = [parseInt(filtered[i].Streams)/1000000.0, filtered[i]['Track Name']]
         // barDataset.push(parseInt(filtered[i].Streams)/1000000.0)
          //songNames.push(filtered[i]['Track Name'])
         // barDataset.remove()
          barDataset[i] = arrayObj;
        
         }


// Scale the range of the data in the domains
x.domain([0, d3.max(barDataset, function(d){ return d[0]; })])
y.domain(d3.range(1, barDataset.length + 1));
//y.domain([0, d3.max(data, function(d) { return d.sales; })]);


    
     
    
     
 
 bars.enter().append("rect")
   .attr("class", "bar")
  // .attr("x", function(d) { return x(d[1]); })
   .attr("width", function(d) {return x(d[0]); } )
   .attr("y", function(d) { 
    return y(d[1]); 
  
  })
  .attr("fill", function(d) {
    return "rgb(0, 0, " + (d[0] * 10) + ")";
  })
   .attr("height", y.bandwidth())
   .merge(bars)	//Update…
           .transition()
           .duration(500)
           .attr("y", function(d) {
            return y(d[1]);
           })
           .attr("width", function(d) {return x(d[0]); } )
           .attr("height", y.bandwidth());
   

    // add the x Axis
  svg.append("g")
  .attr("transform", "translate(0," + h + ")")
  .call(d3.axisBottom(x));

// add the y Axis
svg.append("g")
  .call(d3.axisLeft(y).tickFormat(""));


  svg.selectAll("text.value")
  .data(barDataset)
  .enter()
  .append("text")
  .text(function(d) {
      return d[1];
  })
  .attr("text-anchor", "start")
  .attr("y", function(d, i) {
      return i * (h / barDataset.length ) + 27;
  })
  .attr("x", function(d) {
      return -20;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "10px")
  .attr("fill", "black");
/*




/*
         console.log(songNames);
         var w = 500;
         var h = 300;
         var barPadding = 1;
         console.log(headerNames);
         console.log(filtered);
         //Update scale domains
        // barDataset = [parseInt("4323160")/1000000.0, parseInt("4275439")/1000000.0, parseInt("3947420")/1000000.0, parseInt("3307383")/1000000.0, parseInt("3188386")/1000000.0, parseInt("2896056")/1000000.0, parseInt("2642425")/1000000.0, parseInt("2598097")/1000000.0, parseInt("2512089")/1000000.0, parseInt("2419735")/1000000.0];
    
         xScale.domain(d3.range(barDataset.length));
         yScale.domain([0, d3.max(barDataset, function(d) { return d.value * 50; })]);

         	//Define X axis
			var xAxis = d3.axisBottom()
      .scale(xScale)
      .ticks(5);

//Define Y axis
var yAxis = d3.axisLeft()
      .scale(yScale)
      .ticks(5);

      
      var padding = 10;
     
    
         //Select…
         var bars = svg.selectAll("rect")
           .data(barDataset);
         
         //Enter…
         bars.enter()
           .append("rect")
           .attr("x", w)
           .attr("y", function(d) {
             return h - d * 50;
           })
           .attr("width", xScale.bandwidth())
           .attr("height", function(d) {
             return d * 50;
           })
           .attr("fill", function(d) {
             return "rgb(0, 0, " + (d.value * 10) + ")";
           })
           .merge(bars)	//Update…
           .transition()
           .duration(500)
           .attr("x", function(d, i) {
             return xScale(i);
           })
           .attr("y", function(d) {
             return h - d *50 ;
           })
           .attr("width", xScale.bandwidth())
           .attr("height", function(d) {
             return d*50;
           });

            //Create X axis
			svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (h + 5) + ")")
      .call(xAxis);
    
    //Create Y axis
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" - 5 + ",0)")
      .call(yAxis);
           
	

  svg.selectAll("text").remove();
          //Select…
          
          svg.selectAll("text.title")
          .data(barDataset)
          .enter()
          .append("text")
          .text(function(d) {
              return Math.round(d*1000000);
          })
          .attr("text-anchor", "middle")
          .attr("x", function(d, i) {
              return i * (w / barDataset.length) + (w / barDataset.length - barPadding) / 2;
          })
          .attr("y", function(d) {
              return h - (d * 50) + 14;
          })
          .attr("font-family", "sans-serif")
          .attr("font-size", "10px")
          .attr("fill", "white");

          svg.selectAll("text.value")
          .data(songNames)
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
              return h - (( 10 - songNames.indexOf(d )) * 30) + 14;
          })
          .attr("font-family", "sans-serif")
          .attr("font-size", "10px")
          .attr("fill", "red");

*/

             

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



 
 var barDataset = [parseInt("4323160")/1000000.0, parseInt("4275439")/1000000.0, parseInt("3947420")/1000000.0, parseInt("3307383")/1000000.0, parseInt("3188386")/1000000.0, parseInt("2896056")/1000000.0, parseInt("2642425")/1000000.0, parseInt("2598097"), parseInt("2512089"), parseInt("2419735")];


 /*
			//Width and height
			var w = 500;
			var h = 300;
			var barPadding = 1;
		

//Create SVG element
var svg = d3.select("body")
.append("svg")
.attr("width", w)
.attr("height", h);
var xScale = d3.scaleBand()
.domain(d3.range(dataset.length))
.rangeRound([0, w])
.paddingInner(0.05);

var yScale = d3.scaleLinear()
.domain([0, d3.max(dataset, function(d) { return d.value; })])
.range([0, h]);


         barDataset = [parseInt("4323160")/1000000.0, parseInt("4275439")/1000000.0, parseInt("3947420")/1000000.0, parseInt("3307383")/1000000.0, parseInt("3188386")/1000000.0, parseInt("2896056")/1000000.0, parseInt("2642425")/1000000.0, parseInt("2598097")/1000000.0, parseInt("2512089")/1000000.0, parseInt("2419735")/1000000.0];
         var margin = {
          top: 15,
          right: 25,
          bottom: 15,
          left: 60
      };

      var width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;
         
         xScale.domain(d3.range(barDataset.length));
         yScale.domain([0, d3.max(barDataset, function(d) { return d.value; })]);
    
         //Select…
         var bars = svg.selectAll("rect")
           .data(barDataset);
         
         //Enter…
         bars.enter()
           .append("rect")
           .attr("y", w)
           .attr("x", function(d) {
             return h - d * 50;
           })
           .attr("height", xScale.bandwidth())
           .attr("width", function(d) {
             return d * 50;
           })
           .attr("fill", function(d) {
             return "rgb(0, 0, " + (d.value * 10) + ")";
           })
           .merge(bars)	//Update…
           .transition()
           .duration(500)
           .attr("x", function(d, i) {
             return xScale(i);
           })
           .attr("y", function(d) {
             return h - d *50 ;
           })
           .attr("width", xScale.bandwidth())
           .attr("height", function(d) {
             return d*50;
           });
           
           svg.selectAll("text.title")
           .data(barDataset)
           .enter()
           .append("text")
           .text(function(d) {
               return Math.round(d*1000000);
           })
           .attr("text-anchor", "middle")
           .attr("x", function(d, i) {
               return i * (w / barDataset.length) + (w / barDataset.length - barPadding) / 2;
           })
           .attr("y", function(d) {
               return h - (d * 50) + 14;
           })
           .attr("font-family", "sans-serif")
           .attr("font-size", "10px")
           .attr("fill", "white");



          svg.selectAll("text.value")
          .data(songNames)
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
              return h - (( 10 - songNames.indexOf(d )) * 30) + 14;
          })
          .attr("font-family", "sans-serif")
          .attr("font-size", "10px")
          .attr("fill", "black");
*/

	//Width and height
 // var w = 300;
 // var h = 500;
  var barPadding = 1;

  var margin = {
    top: 15,
    right: 25,
    bottom: 15,
    left: 60
};

w= 960 - margin.left - margin.right;
    h = 500 - margin.top - margin.bottom;

    //set the ranges
    var y = d3.scaleBand()
              .range([h, 0])
              .padding(0.1);
    
    var x = d3.scaleLinear()
              .range([0, w]);
    
//Create SVG element

var svg = d3.select("body").append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
          //barDataset = [parseInt("4323160")/1000000.0, parseInt("4275439")/1000000.0, parseInt("3947420")/1000000.0, parseInt("3307383")/1000000.0, parseInt("3188386")/1000000.0, parseInt("2896056")/1000000.0, parseInt("2642425")/1000000.0, parseInt("2598097")/1000000.0, parseInt("2512089")/1000000.0, parseInt("2419735")/1000000.0];
          //barDataset.sort();

          barDataset = [
            [parseInt("4323160")/1000000.0,'1'], 
            [ parseInt("4275439")/1000000.0, '2'],
            [ parseInt("3947420")/1000000.0, '3'], 
            [ parseInt("3307383")/1000000.0, '4'], 
            [ parseInt("3188386")/1000000.0, '5'], 
            [ parseInt("2896056")/1000000.0, '6'], 
            [ parseInt("2642425")/1000000.0, '7'], 
            
          [parseInt("2598097")/1000000.0, '8'], 
          [ parseInt("2512089")/1000000.0, '9'], 
          [ parseInt("2419735")/1000000.0, '10']];

          /*
var svg = d3.select("body")
.append("svg")
.attr("width", w)
.attr("height", h);
*/

//
/*
var yScale = d3.scaleBand()
.domain(d3.range(barDataset.length))
.rangeRound([0, w])
.paddingInner(0.05);

var xScale = d3.scaleLinear()
.domain([0, d3.max(barDataset, function(d) { return d.value; })])
.range([0, h]);

*/
// Scale the range of the data in the domains
x.domain([0, d3.max(barDataset, function(d){ return d[0]; })])
y.domain(d3.range(1, barDataset.length + 1));
//y.domain([0, d3.max(data, function(d) { return d.sales; })]);


    
     
     //Select…
     var bars = svg.selectAll("rect")
       .data(barDataset);
     
 
 bars.enter().append("rect")
   .attr("class", "bar")
   //.attr("x", function(d) { return x(d.sales); })
   .attr("width", function(d) {return x(d[0]); } )
   .attr("y", function(d) { 
    return y(d[1]); 
  
  })
  .attr("fill", function(d) {
    return "rgb(0, 0, " + (d[0] * 10) + ")";
  })
   .attr("height", y.bandwidth());

    // add the x Axis
  svg.append("g")
  .attr("transform", "translate(0," + h + ")")
  .call(d3.axisBottom(x));

// add the y Axis
svg.append("g")
  .call(d3.axisLeft(y).tickFormat(""));


  svg.selectAll("text.value")
  .data(barDataset)
  .enter()
  .append("text")
  .text(function(d) {
      return d[1];
  })
  .attr("text-anchor", "start")
  .attr("y", function(d, i) {
      return i * (h / barDataset.length ) + 27;
  })
  .attr("x", function(d) {
      return -20;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "10px")
  .attr("fill", "black");
/*

     //Enter…
     bars.enter()
       .append("rect")
       .attr("y", w)
       .attr("x", function(d) {
         return d * 50;
       })
       .attr("height", yScale.bandwidth())
       .attr("width", function(d) {
         return d * 50;
       })
       .attr("fill", function(d) {
         return "rgb(0, 0, " + (d.value * 10) + ")";
       })
       .merge(bars)	//Update…
       .transition()
       .duration(500)
       .attr("y", function(d, i) {
         return yScale(i);
       })
       .attr("x", function(d) {
         return d *50 ;
       })
       .attr("height", yScale.bandwidth())
       .attr("width", function(d) {
         return d * 50;
       });
       */
       /*
       svg.selectAll("text.title")
       .data(barDataset)
       .enter()
       .append("text")
       .text(function(d) {
           return Math.round(d*1000000);
       })
       .attr("text-anchor", "middle")
       .attr("x", function(d, i) {
           return i * (w / barDataset.length) + (w / barDataset.length - barPadding) / 2;
       })
       .attr("y", function(d) {
           return h - (d * 50) + 14;
       })
       .attr("font-family", "sans-serif")
       .attr("font-size", "10px")
       .attr("fill", "white");



      svg.selectAll("text.value")
      .data(songNames)
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
          return h - (( 10 - songNames.indexOf(d )) * 30) + 14;
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "10px")
      .attr("fill", "black");

      */