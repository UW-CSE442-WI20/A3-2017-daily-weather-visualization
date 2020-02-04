d3.csv("SpotifyDaily.csv").then(function(data) {
    data.forEach(function(d) {
      d.population = +d.population;
      d["land area"] = +d["land area"];
    });
    console.log(data[0]);
  });

console.log('hello world');