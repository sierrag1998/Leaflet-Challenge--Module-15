function TotalFunction(info) {

    // MARKER : CONDITIONAL
    function markercolor(feature){
        depth = feature.geometry.coordinates[2]
        magnitude = feature.properties.mag
        var color = "";

        if (depth > 90) {color = 'green';
        }
        else if (depth > 70) {color = 'yellow';
        }
        else if (depth > 50) {color = '#FF9900';
        }
        else if (depth > 30) {color = '#FFCC00';
        }
        else if (depth > 10) {color = 'red';
        }
        else {color = '#00FF00';
        }

        // MARKER STYLE
        var style = {
            radius: magnitude*5,
            fillColor: color,
            color: color,
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };

        // PLACE MARKERS
        var coordinates = L.latLng([feature.geometry.coordinates[1],feature.geometry.coordinates[0]])
        return L.circleMarker(coordinates, style);
    }

     // POPUP
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }

    // create GeoJSON layer
    var earthquakes = L.geoJSON(info, {
        onEachFeature: onEachFeature,
        pointToLayer: markercolor
    });

    // STREET LAYER
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

    // MY MAP
  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [street, earthquakes]
  });

    //LEGEND
    var legend = L.control({ position: "bottomright" });

    // LEGEND COMPONENTS
    legend.onAdd = function(myMap) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += '<i style="background: green"></i><span>>10</span><br>';
        div.innerHTML += '<i style="background: yellow"></i><span>10-30</span><br>';
        div.innerHTML += '<i style="background: #FFCC00"></i><span>30-50</span><br>';
        div.innerHTML += '<i style="background: #FF9900"></i><span>50-70</span><br>';
        div.innerHTML += '<i style="background: #FF6600"></i><span>70-90</span><br>';
        div.innerHTML += '<i style="background: red"></i><span>90+</span><br>';
        return div;
        };

        legend.addTo(myMap);
}

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// read in the earthquake data
d3.json(url, function(response) {
    // call the displayMap function, passing the data set
    TotalFunction(response.features);
});