
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


var dateSelect;
var dataset = [];
var headerNames;
var correctDate = [];

var index;

var fileName;

var countryID;




var startDate = new Date("2019-01-02"); //YYYY-MM-DD
var endDate = new Date("2020-01-01"); //YYYY-MM-DD

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
var dateArr = getDateArray(startDate, endDate);

d3.csv("streamsglobal10.csv").then(function (data) {
    headerNames = d3.keys(data[0]);
    dataset = data;
});
setTimeout(function () {}, 200);



var Countries = (countriesName).slice(0);
Countries = Countries.sort();


var dropdown = d3.select("#vis-container")
    .insert("select", "svg")
    .on("change", function () {

        // console.log(dateSelect);
        var country = d3.select(this).property('value');
        index = countriesName.indexOf(country);

        fileName = "streams" + countriesList[index] + "10.csv";
        d3.csv(fileName).then(function (data) {
            headerNames = d3.keys(data[0]);
            dataset = data;
        });
        setTimeout(function () {}, 200);

        var filtered = dataset.filter(function (d) {
            for (var i = 0; i < dataset.length; i++) {
                if (d['date'] === dateSelect) {}
                console.log(d);
                return d['date'] === dateSelect;
            }
        })
        // console.log(filtered);
        var barDataset = [[]];
        var songNames = [''];
        for (var i = 0; i < filtered.length; i++) {
            var arrayObj = [parseInt(filtered[i].Streams), (i + 1) + ""];
            songNames[i] = filtered[i]['Track Name'];
            barDataset[i] = arrayObj;
        }
        console.log(songNames);
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

        var margin = {
            top: 15,
            right: 25,
            bottom: 30,
            left: 60
        };

        w = 960 - margin.left - margin.right;
        h = 500 - margin.top - margin.bottom;

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
            .attr("x", function (d, i) {
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

                //d[1];
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
        });





dropdown.selectAll("option")
    .data(Countries)
    .enter().append("option")
    .attr("value", function (d) { return d; })
    .attr("selected", function (d) {
        return d === "Global";
    })
    .text(function (d) {
        return d[0].toUpperCase() + d.slice(1, d.length); // capitalize 1st letter


    });



dateDropdown.selectAll("option")
    .data(dateArr)
    .enter().append("option")
    .attr("value", function (d) { return d; })
    .text(function (d) {
        return d;

        //return (d.getMonth() + 1)+ '/' + (d.getDate() ) + '/' + d.getFullYear() ; // capitalize 1st letter


    });



var barDataset = [parseInt("4323160") / 1000000.0, parseInt("4275439") / 1000000.0, parseInt("3947420") / 1000000.0, parseInt("3307383") / 1000000.0, parseInt("3188386") / 1000000.0, parseInt("2896056") / 1000000.0, parseInt("2642425") / 1000000.0, parseInt("2598097"), parseInt("2512089"), parseInt("2419735")];




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

w = 960 - margin.left - margin.right;
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
        return (9 - i) * (h / barDataset.length) + 27;
    })
    .attr("x", function (d) {
        return x(d[0]) - 8;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "14px")
    .attr("font-weight", 550)
    .attr("fill", "black");


