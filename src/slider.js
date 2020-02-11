"use strict";
(function() {

    // MODULE GLOBAL VARIABLES AND HELPER FUNCTIONS CAN BE PLACED
    // HERE

  
    window.onload = function() {
        initSlider();
        document.getElementById("play").onclick(function() {
            d3.sliderBottom.value = new Date(2019, 0, 1 + 7);
        });
    };

    
    function playSlider() {
        
    }

    function initSlider() {
        var weeks2019 = d3.range(0, 53).map(function(d) {
            return new Date(2019, 0, 1 + 7*d);
          });
    
          var sliderTime = d3
            .sliderBottom()
            .min(d3.min(weeks2019))
            .max(d3.max(weeks2019))
            .step(7)
            .width(1700)
            .tickFormat(d3.timeFormat('%Y-%m-%d'))
            .tickValues(weeks2019)
            .on('onchange', val => {
              d3.select('p#value').text(d3.timeFormat('%Y-%m-%d')(val));
            });
    
          var gTime = d3
            .select('div#slider')
            .append('svg')
            .attr('width', 1800)
            .attr('height', 100)
            .append('g')
            .attr('transform', 'translate(30,30)');
    
          gTime.call(sliderTime);
    
          //initializes date shown on screen
          d3.select('p#value').text(d3.timeFormat('%Y-%m-%d')(sliderTime.value()));
    }

    
    function exampleFunction2(someVariable) {
     
    }

})();