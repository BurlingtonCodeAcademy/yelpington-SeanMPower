// Variable Declarations ////////////////////////////////////////////////////////////////////////
let myMap = (mapboxgl.accessToken =
  "pk.eyJ1Ijoic2Vhbm1wMjIiLCJhIjoiY2tjM3M0bGlwMDB4ejJxbXNmbndvdjNxbyJ9.vwuXpXD9aoHqCUtonVTF0A");
let map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
  center: [-73.2150, 44.4810], // starting position [lng, lat]
  zoom: 15, // starting zoom
});
let restoNameArray = [];
let restoCoords = [];
let restaurantList = document.getElementById('restoList')

// Function Declarations ////////////////////////////////////
function placeMarker(coords) {  // Place marker on map
       let lngLatArr = [coords[1], coords[0]];
       new mapboxgl.Marker().setLngLat(lngLatArr).addTo(map);
    };


async function restaurantsOnMap() {  // Fetch API data and push relavent data to arrays for later use
    let restaurantList = await fetch('https://yelpingtonapi.herokuapp.com/api/restaurants')
    .then((res) => res.json())
    
    
    for (restaurant of restaurantList) {
        restoNameArray.push(restaurant.name)
        restoCoords.push(restaurant.coords)
    }
    restoCoords.forEach(coords => {
        placeMarker(coords) // Loop to place Lng/Lat markers on map
    })
    restoNameArray.forEach(restaurant => { // Loop to fill Nav Bar with restaurant name data
      let node = document.createElement('LI')
      let textNode = document.createTextNode(restaurant)
      node.appendChild(textNode)
      document.getElementById('restoList').appendChild(node);
      })
}


// Function Call ////////////////////////////////////////////
restaurantsOnMap();
