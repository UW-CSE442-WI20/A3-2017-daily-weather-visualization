var sliderDate = "";

"use strict";
(function() {

    // MODULE GLOBAL VARIABLES AND HELPER FUNCTIONS CAN BE PLACED
    // HERE
    var weeks2019;
    var sliderTime;
    var gTime;



    /**
     *  Make to document your window.onload set up
     */
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
            .tickFormat(d3.timeFormat('%Y-%m-%d'))
            .tickValues(weeks2019)
            .displayValue(false)
            .on('onchange', val => {
              d3.select('p#value').text(d3.timeFormat('%Y-%m-%d')(val));
              window[sliderDate ] =  d3.timeFormat('%Y-%m-%d')(val);
            });
    
          gTime = d3
            .select('div#slider')
            .append('svg')
            .attr('width', 1800)
            .attr('height', 100)
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

