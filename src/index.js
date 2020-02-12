
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


      //var songNames = ['fdmsklfmdklsafds', 'djnskfsd', 'fdsk', '4cdnsksd cdjnk', '5', '6', '7', '8', '9', '10'];
      //var songNames = ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1'];


      var dateDropdown = d3.select("#vis-container-date")
      .insert("select", "svg")
      .on("change", function(){
       dateSelect = d3.select(this).property('value');
       console.log(localStorage.getItem('currDate'));
    //   dateSelect = d3.select("#vis-container-date").property('text');

     //   console.log(dateSelect);
        var filtered = dataset.filter(function(d) {
          for (var i = 0; i < dataset.length; i++) {
      
          return d['date'] === dateSelect;
          }
        })
        
        //var barDataset = [parseInt("4323160")/1000000.0, parseInt("4275439")/1000000.0, parseInt("3947420")/1000000.0, parseInt("3307383")/1000000.0, parseInt("3188386")/1000000.0, parseInt("2896056")/1000000.0, parseInt("2642425")/1000000.0, parseInt("2598097")/1000000.0, parseInt("2512089")/1000000.0, parseInt("2419735")/1000000.0];
var barDataset = [[]];
var songNames = [''];
       // console.log(filtered);
        for (var i = 0; i < filtered.length; i++) {
          var arrayObj = [parseInt(filtered[i].Streams), ( 10 - i )+""];
          var name = filtered[i]['Track Name'];
          if (filtered[i]['Track Name'].length > 30) {
            name = name.substring(0,31) + "...";
          }

       songNames[i] = name; //filtered[i]['Track Name'];
          barDataset[i] = arrayObj;
        
         }
         console.log(songNames);
         var barPadding = 1;

         var margin = {
           top: 15,
           right: 25,
           bottom: 30,
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
           

                     //don't create new SVG each time. 
       //Create SVG element
       /*
       var svg = d3.select("body").append("svg")
           .attr("width", w + margin.left + margin.right)
           .attr("height", h + margin.top + margin.bottom)
         .append("g")
           .attr("transform", 
                 "translate(" + margin.left + "," + margin.top + ")");
       
       */
    
       // Scale the range of the data in the domains
       x.domain([0, d3.max(barDataset, function(d){ return d[0]; })])
       y.domain(d3.range(1, barDataset.length + 1));
       
            
          
              var bars = svg.selectAll("rect")
              .data(barDataset);
        
        bars.enter().append("rect")
          .attr("class", "bar")
          .attr("width", function(d) {return x(d[0]); } )
          .attr("y", function(d) { 
           return y(d[1]); 
         })
         .attr("fill", function(d) {
          return "rgb(30, 215, 96)";
         })
          .attr("height", y.bandwidth())
          .merge(bars)	//Update…
           .transition()
           .duration(500)
           .attr("x", function(d, i) {
            return x(d[1]);
          })
           .attr("y", function(d) {
            return y(d[1]);
           })
           .attr("width", function(d) { return x(d[0]); } )
           .attr("height", y.bandwidth());
   

           svg.selectAll("text").remove();
    

  svg.selectAll("g").remove();
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
      return songNames[parseInt(d[1]) - 1];
      
      //d[1];
  })
  .attr("text-anchor", "end")
  .attr("y", function(d, i) {
      return (9 - i) * (h / barDataset.length ) + 27;
  })
  .attr("x", function(d) {
    var index = d[1];
    var streams = barDataset[index - 1][0];
    return x(streams) - 8 ;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "14px")
  .attr("font-weight", 550)
  .attr("fill", "black");

             

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
 


 var barDataset = [parseInt("4323160")/1000000.0, parseInt("4275439")/1000000.0, parseInt("3947420")/1000000.0, parseInt("3307383")/1000000.0, parseInt("3188386")/1000000.0, parseInt("2896056")/1000000.0, parseInt("2642425")/1000000.0, parseInt("2598097"), parseInt("2512089"), parseInt("2419735")];


 

	//Width and height
 // var w = 300;
 // var h = 500;
  var barPadding = 1;

  var margin = {
    top: 15,
    right: 25,
    bottom: 30,
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
          var songNames = ["Sunflower - Spider-Man: Into the Spider-Verse", "thank u, next", "Wow.", "Without Me", "Taki Taki (with Selena Gomez, Ozuna & Cardi B)", "Calma - Remix", "Sweet but Psycho", "MIA (feat. Drake)", "High Hopes", "Happier"];
/*
          for (var i = 0; i < songNames.length; i++) {
            var name = songNames[i];
            if (songNames[i].length > 30) {
              name = name.substring(0,31) + "...";
            }
  
         songNames[i] = name; //filtered[i]['Track Name'];
          }
          */
          barDataset = [
            [parseInt("4323160"),'10'], 
            [ parseInt("4275439"), '9'],
            [ parseInt("3947420"), '8'], 
            [ parseInt("3307383"), '7'], 
            [ parseInt("3188386"), '6'], 
            [ parseInt("2896056"), '5'], 
            [ parseInt("2642425"), '4'], 
            
          [parseInt("2598097"), '3'], 
          [ parseInt("2512089"), '2'], 
          [ parseInt("2419735"), '1']];




// Scale the range of the data in the domains
x.domain([0, d3.max(barDataset, function(d){ return d[0]; })])
y.domain(d3.range(1, barDataset.length + 1));

     
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
    return "rgb(30, 215, 96)";
  })
   .attr("height", y.bandwidth());

 

    // add the x Axis
  svg.append("g")
  .attr("transform", "translate(0," + h + ")")
  .call(d3.axisBottom(x)
        .ticks(10));
       // .tickFormat(d3.format("s")));
  //.call(d3.axisBottom(x).ticks(10, "K"));


// add the y Axis
svg.append("g")
    .call(d3.axisLeft(y).tickFormat(""));


svg.selectAll("text.value")
    .data(barDataset)
    .enter()
    .append("text")
    .text(function (d) {
        return songNames[parseInt(d[1]) - 1];
    })
    .attr("text-anchor", "end")
    .attr("y", function (d, i) {
        return  (9 - i) * (h / barDataset.length) + 27;
    })
    .attr("x", function (d) {
        var index = d[1];
        var streams = barDataset[index - 1][0];
        return x(streams) - 8;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "14px")
    .attr("font-weight", 550)
    .attr("fill", "black");


// SLIDER STUFF !!
"use strict";
(function () {

    // MODULE GLOBAL VARIABLES AND HELPER FUNCTIONS CAN BE PLACED
    // HERE
    var weeks2019;
    var sliderTime;
    var gTime;

    window.onload = function () {
        initSlider();
    };

    function playSlider() {

    }

    // Code inspired/provided by https://github.com/johnwalley/d3-simple-slider v1.5.4 Copyright 2019 John Walley
    function initSlider() {
        weeks2019 = d3.range(0, 53).map(function (d) {
            return new Date(2019, 0, 1 + 7 * d);
        });

        sliderTime = d3
            .sliderBottom()
            .min(d3.min(weeks2019))
            .max(d3.max(weeks2019))
            .step(28)
            .width(1020 - margin.left - margin.right)
            .tickFormat(d3.timeFormat('%m-%d'))
            .tickValues(weeks2019)
            .displayValue(false)
            .on('onchange', val => {
                d3.select('p#value').text(d3.timeFormat('%Y-%m-%d')(val));
                window[sliderDate] = d3.timeFormat('%Y-%m-%d')(val);

                dateSelect = d3.timeFormat('%Y-%m-%d')(val);
                console.log(localStorage.getItem('currDate'));

                var filtered = dataset.filter(function (d) {
                    for (var i = 0; i < dataset.length; i++) {
                        return d['date'] === dateSelect;
                    }
                })

                var barDataset = [[]];
                var songNames = [''];
                for (var i = 0; i < filtered.length; i++) {
                    var arrayObj = [parseInt(filtered[i].Streams), (10 - i) + ""];
                    var name = filtered[i]['Track Name'];
                    if (filtered[i]['Track Name'].length > 30) {
                        name = name.substring(0, 31) + "...";
                    }
                    songNames[i] = name;
                    barDataset[i] = arrayObj;
                }

                updateGraph(barDataset, songNames)
            });

        gTime = d3
            .select('div#slider')
            .append('svg') 
            .attr('width', 1100 - margin.left - margin.right)
            .attr('height', 132 - margin.top - margin.bottom)
            .append('g')
            .attr('transform', 'translate(30,30)');

        gTime.call(sliderTime);

        gTime.selectAll("text").attr("dx", "-10px").attr("dy", "-16px");

        //initializes date shown on screen
        d3.select('p#value').text(d3.timeFormat('%Y-%m-%d')(sliderTime.value()));
        sliderDate = d3.timeFormat('%Y-%m-%d')(sliderTime.value());

    }
})();



