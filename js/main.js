//declare map variable globally so all functions have access
var map;


//function to instantiate the Leaflet map
function createMap(){

    //create the map
    map = L.map('map', {
        center: [30.5, -99.5],
        zoom: 7
    });

    //add OSM base tilelayer
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    //call getData function
    getData(map);
};

function getColor(m) {
    return m > 3  ? '#800026' :
        m > 2  ? '#BD0026' :
        m > 1  ? '#E31A1C' :
        m > 0  ? '#FC4E2A' :
        m < 0   ? '#FD8D3C' : '#FD8D3C';
}

//function to retrieve the data and place it on the map
function getData(map){
    fetch("data/TxTorn.geojson")
		.then(function(response){
			return response.json();
		})
		.then(function(json){
            var geojsonMarkerOptions = {
                radius: 10,
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5
            };            
            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(json, {
                pointToLayer: function (feature, latlng){
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                },
                style: function(feature) {
                    return {
                        fillColor: getColor(feature.properties.mag),
                        fillOpacity: .7,
                        weight: 1
                    };
                },
                onEachFeature: function(feature, layer){
                    layer.bindPopup("Date: " + feature.properties.date + "<br>Magnitude: " + feature.properties.mag + "<br>Injury: " + feature.properties.inj + "<br>Deaths: " + feature.properties.fat);
                }
            }).addTo(map);
        })

};
// I want to add the Tx Regions to the map. No time to adjust w/o breaking again.



document.addEventListener('DOMContentLoaded',createMap)