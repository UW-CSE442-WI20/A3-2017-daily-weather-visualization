d3.csv("../SpotifyDaily.csv", function(data) {
  for (var i = 0; i < 10; i++) {
      console.log(data[i]);
  }
});

d3.csv("../SpotifyDaily.csv", function(data) 
  for (var i = 0; i < data.length; i++) {
    if (data[i].Country == "United States") {
      console.log(data[i]);
    }
      
  }
});