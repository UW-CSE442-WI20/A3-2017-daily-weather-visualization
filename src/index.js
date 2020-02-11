
// globals
var countriesList = ['ca', 'dk', 'gr', 'is', 'mx', 'ph', 'sv',
    'ar', 'ch', 'do', 'gt', 'it', 'my', 'pl', 'th',
    'at', 'cl', 'ec', 'hk', 'jp', 'pt', 'tr',
    'au', 'co', 'hn', 'nl', 'py', 'tw',
    'be', 'cr', 'es', 'hu', 'no', 'ro', 'us',
    'fi', 'id', 'nz', 'se', 'uy',
    'bo', 'cz', 'fr', 'ie', 'pa', 'sg', 'vn',
    'br', 'de', 'gb', 'il', 'pe', 'sk', 'global'];

var countriesName = ['Canada', 'Denmark', 'Greece', 'Iceland', 'Mexico', 'Philippines', 'El Salvador',
    'Argentina', 'Switzerland', 'Dominican Republic', 'Guatemala', 'Italy', 'Malaysia', 'Poland', 'Thailand',
    'Austria', 'Chile', 'Ecuador', 'Hong Kong', 'Japan', 'Portugal', 'Turkey',
    'Australia', 'Columbia', 'Honduras', 'Netherlands', 'Paraguay', 'Taiwan',
    'Belgium', 'Costa Rica', 'Spain', 'Hungary', 'Norway', 'Romania', 'United States',
    'Finland', 'Indonesia', 'New Zealand', 'Sweden', 'Uruguay',
    'Bolivia', 'Czech Republic', 'France', 'Ireland', 'Panama', 'Singapore', 'Vietnam',
    'Brazil', 'Germany', 'United Kingdom', 'Israel', 'Peru', 'Slovakia', 'global'];
var Countries = (countriesName).slice(0).sort();

var dateSelect;
var dataset = [];

var barPadding = 1;
var margin = {
    top: 15,
    right: 25,
    bottom: 30,
    left: 60
};
var w = 960 - margin.left - margin.right;
var h = 500 - margin.top - margin.bottom;

//set x and y ranges
var y = d3.scaleBand()
    .range([h, 0])
    .padding(0.1);

var x = d3.scaleLinear()
    .range([0, w]);

// initial -- hardcoded data
var barDataset;
var songNames;


//--------------------------------// end globals

function loadInitialData() {
    // TODO -- Not hardcode this!!
    songNames = ["Sunflower - Spider-Man: Into the Spider-Verse", "thank u, next", "Wow.", "Without Me", "Taki Taki (with Selena Gomez, Ozuna & Cardi B)", "Calma - Remix", "Sweet but Psycho", "MIA (feat. Drake)", "High Hopes", "Happier"];
    barDataset = [
        [parseInt("4323160"), '1'],
        [parseInt("4275439"), '2'],
        [parseInt("3947420"), '3'],
        [parseInt("3307383"), '4'],
        [parseInt("3188386"), '5'],
        [parseInt("2896056"), '6'],
        [parseInt("2642425"), '7'],
        [parseInt("2598097"), '8'],
        [parseInt("2512089"), '9'],
        [parseInt("2419735"), '10']];

    // load globl data
    d3.csv("streamsglobal10.csv").then(function (data) {
        dataset = data;
    });
}
loadInitialData();

function updateGraph(barDataset, songNames) {
    //set the ranges
    var y = d3.scaleBand()
        .range([h, 0])
        .padding(0.1);

    var x = d3.scaleLinear()
        .range([0, w]);

    // Scale the range of the data in the domains
    x.domain([0, d3.max(barDataset, function (d) { return d[0]; })])
    y.domain(d3.range(1, barDataset.length + 1));

    var bars = svg.selectAll("rect")
        .data(barDataset);

    bars.enter().append("rect")
        .attr("class", "bar")
        .attr("width", function (d) { return x(d[0]); })
        .attr("y", function (d) {
            return y(d[1]);
        })
        .attr("fill", function (d) {
            return "rgb(0, 0, " + (d[0] * 10) + ")";
        })
        .attr("height", y.bandwidth())
        .merge(bars)	//Update…
        .transition()
        .duration(500)
        .attr("x", function (d) {
            return x(d[1]);
        })
        .attr("y", function (d) {
            return y(d[1]);
        })
        .attr("width", function (d) { return x(d[0]); })
        .attr("height", y.bandwidth());

    svg.selectAll("text").remove();

    // update and add the x Axis
    svg.selectAll("g").remove();
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
        .text(function (d) {
            return songNames[parseInt(d[1]) - 1];
        })
        .attr("text-anchor", "end")
        .attr("y", function (d, i) {
            return (9 - i) * (h / barDataset.length) + 27;
        })
        .attr("x", function (d) {
            return x(d[0]) - 8;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "14px")
        .attr("font-weight", 550)
        .attr("fill", "black")
}

var getDateArray = function (start, end) {
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
        var date = new Date(dt);
        
        var dateString = date.getFullYear() + "-";
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
var dateArr = getDateArray(new Date("2019-01-02"), new Date("2020-01-01"));
dateSelect = dateArr[0];


var countryDropdown = d3.select("#vis-container-country")
    .insert("select", "svg")
    .on("change", function () {

        var country = d3.select(this).property('value');
        

        var index = countriesName.indexOf(country);
        var fileName = "streams" + countriesList[index] + "10.csv";

        // load new csv, and update graph
        d3.csv(fileName).then(function (data) {
            var filtered = data.filter(function (d) {
                return d['date'] === dateSelect;
            })

            // fetch the tracks and populate barDataset
            var barDataset = [[]];
            var songNames = [''];
            for (var i = 0; i < filtered.length; i++) {
                var arrayObj = [parseInt(filtered[i].Streams), (i + 1) + ""];
                songNames[i] = filtered[i]['Track Name'];
                barDataset[i] = arrayObj;
            }
            dataset = data;
            updateGraph(barDataset, songNames);
        });
    });


var dateDropdown = d3.select("#vis-container-date")
    .insert("select", "svg")
    .on("change", function () {
        dateSelect = d3.select(this).property('value');

        var filtered = dataset.filter(function (d) {
            for (var i = 0; i < dataset.length; i++) {
                return d['date'] === dateSelect;
            }
        })
        var barDataset = [[]];
        var songNames = [''];

        for (var i = 0; i < filtered.length; i++) {
            var arrayObj = [parseInt(filtered[i].Streams), (i + 1) + ""];
            songNames[i] = filtered[i]['Track Name'];
            barDataset[i] = arrayObj;
        }
        updateGraph(barDataset, songNames);
    });


// populate the country dropdown
countryDropdown.selectAll("option")
    .data(Countries)
    .enter().append("option")
    .attr("value", function (d) { return d; })
    .attr("selected", function (d) {
        return d === "Global";
    })
    .text(function (d) {
        return d[0].toUpperCase() + d.slice(1, d.length); // capitalize 1st letter


    });

// populate the date dropdown
dateDropdown.selectAll("option")
    .data(dateArr)
    .enter().append("option")
    .attr("value", function (d) { return d; })
    .text(function (d) {
        return d;
    });


var svg = d3.select("body").append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


// Scale the range of the data in the domains
x.domain([0, d3.max(barDataset, function (d) { return d[0]; })])
y.domain(d3.range(1, barDataset.length + 1));


//Select…
var bars = svg.selectAll("rect")
    .data(barDataset);


bars.enter().append("rect")
    .attr("class", "bar")
    .attr("width", function (d) { return x(d[0]); })
    .attr("y", function (d) {
        return y(d[1]);
    })
    .attr("fill", function (d) {
        return "rgb(30, 215, 96)";
    })
    .attr("height", y.bandwidth());



// add the x Axis
svg.append("g")
    .attr("transform", "translate(0," + h + ")")
    .call(d3.axisBottom(x)
        .ticks(10));

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
        return (9 - i) * (h / barDataset.length) + 27;
    })
    .attr("x", function (d) {
        return x(d[0]) - 8;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "14px")
    .attr("font-weight", 550)
    .attr("fill", "black");
"use strict";
(function() {

    // MODULE GLOBAL VARIABLES AND HELPER FUNCTIONS CAN BE PLACED
    // HERE
    var weeks2019;
    var sliderTime;
    var gTime;



  
    window.onload = function() {
        initSlider();

        /* Trying to reposition axis labels for slider
        var elements = document.body.getElementsByClassName('tick');
        for(var i = 0; i < elements.length; i++) {
          
        }*/
    };



    function playSlider() {
        
    }

    // Code inspired/provided by https://github.com/johnwalley/d3-simple-slider v1.5.4 Copyright 2019 John Walley
    function initSlider() {
          weeks2019 = d3.range(0, 53).map(function(d) {
            return new Date(2019, 0, 1 + 7*d);
          });
    
          sliderTime = d3
            .sliderBottom()
            .min(d3.min(weeks2019))
            .max(d3.max(weeks2019))
            .step(7)
            .width(1700)
           // .tickFormat(d3.timeFormat('%Y-%m-%d'))
           // .tickValues(weeks2019)
            .displayValue(false)
            .on('onchange', val => {
              d3.select('p#value').text(d3.timeFormat('%Y-%m-%d')(val));
              window[sliderDate] =  d3.timeFormat('%Y-%m-%d')(val);

              dateSelect = d3.timeFormat('%Y-%m-%d')(val);
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
       

              console.log(window[sliderDate]);
              //localStorage.setItem('currDate', window[sliderDate]);
            });
         
          gTime = d3
            .select('div#slider')
            .append('svg')
            .attr('width', 960 - margin.left - margin.right)
            .attr('height', 500 - margin.top - margin.bottom)
            .append('g')
            .attr('transform', 'translate(30,30)');
    
          gTime.call(sliderTime);
    
          //initializes date shown on screen
          d3.select('p#value').text(d3.timeFormat('%Y-%m-%d')(sliderTime.value()));
         // module.exports.sliderDate = d3.timeFormat('%Y-%m-%d')(sliderTime.value());
         sliderDate = d3.timeFormat('%Y-%m-%d')(sliderTime.value());
   
         //window[sliderDate ] = variables[varName ];
       //  window[sliderDate ] = sliderDate;
          
    }
})();
//window[sliderDate ] = variables[varName ];


