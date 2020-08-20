// Variable Declarations ////////////////////////////////////////////////////////////////////////
let myMap = (mapboxgl.accessToken =
  "pk.eyJ1Ijoic2Vhbm1wMjIiLCJhIjoiY2tjM3M0bGlwMDB4ejJxbXNmbndvdjNxbyJ9.vwuXpXD9aoHqCUtonVTF0A");
let map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
  center: [-73.215, 44.479], // starting position [lng, lat]
  zoom: 14.7, // starting zoom
});

// Function Declarations ////////////////////////////////////
function placeMarker(coords) {
  // Place marker on map
  let lngLatArr = [coords[1], coords[0]];
  new mapboxgl.Marker().setLngLat(lngLatArr).addTo(map);
}

async function restaurantsOnMap() {
  // Fetch API data and push relavent data to arrays for later use
  let restaurantList = await fetch(
    "https://yelpingtonapi.herokuapp.com/api/restaurants"
  ).then((res) => res.json());
  console.log(restaurantList);

  for (restaurant of restaurantList) {
    let textNode = document.createTextNode(restaurant.name);
    let a = document.createElement("a");
    let node = document.createElement("LI");

    placeMarker(restaurant.coords); // Marker placement

    a.appendChild(textNode);
    a.title = restaurant.name;
    a.href = "/restaurant#" + restaurant.id + "?" + restaurant.coords;
    node.appendChild(a);
    document.getElementById("restoList").appendChild(node);
  }
}

// Function Call ////////////////////////////////////////////
restaurantsOnMap();
