var myMap = L.map("map", {
    center: [40.057347,  -74.414532],
    zoom: 9,
    scrollWheelZoom: false
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 10,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  var geojson;
  var link = "mergeOffencesCounty1.geojson";
  // var link = "CrimeCity.geojson"
  

// Grabbing our GeoJSON data..
d3.json(link, function(data) {

  
  
  console.log(data)    
  
   // Create a new choropleth layer
   geojson = L.choropleth(data, {

    // Define what  property in the features to use
    valueProperty: "Offenses",

    // Set color scale
    scale: ["#ffffb2", "#b10026"],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#0aa80d",
      weight: 1,
      
      fillOpacity: 0.5
    },
    filter: function(feature, layer) {
              return feature.properties.STATE == 34;
          },
    

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup(`County:  ${feature.properties.NAME} <br> <hr>
                        CRIME RATE:  ${feature.properties.Crime_rate} <br> <hr>
                        SUMMARY:  ${feature.properties.Status} <br>
                        Offences:  ${feature.properties.Offenses} <br>`);
    }
  }).addTo(myMap);  


   // Set up the legend
   var legend = L.control({ position: "bottomright" });
   legend.onAdd = function() {
     var div = L.DomUtil.create("div", "info legend");
     var limits = geojson.options.limits;
     var colors = geojson.options.colors;
     var labels = [];

      // Add min & max
    var legendInfo = "<h1>Offence Total</h1>" +
    "<div class=\"labels\">" +
      "<div class=\"min\">MINIMUM: " + limits[0] + "</div>" +
      "<div class=\"max\">MAXIMUM: " + limits[limits.length - 1] + "</div>" +
    "</div>";

  div.innerHTML = legendInfo;

  limits.forEach(function(limit, index) {
    labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
  });

  div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  return div;
};

// Adding legend to the map
legend.addTo(myMap);
  

});








 
  
  
  
  
 