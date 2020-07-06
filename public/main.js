// Variable Declarations ////////////////////////////////////////////////////////////////////////
let myMap = (mapboxgl.accessToken =
  "pk.eyJ1Ijoic2Vhbm1wMjIiLCJhIjoiY2tjM3M0bGlwMDB4ejJxbXNmbndvdjNxbyJ9.vwuXpXD9aoHqCUtonVTF0A");
let map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
  center: [-73.2150, 44.4810], // starting position [lng, lat]
  zoom: 15, // starting zoom
});
let restoAddyArray = [];
let restoNameArray = [];
let navLinks = document.querySelectorAll("div.restoLink");
console.log(navLinks);

for (i = 0; i < navLinks.length; i++) {
    navLinks[i] = restoNameArray[i];
}


function placeMarker(address) {
  let urlAddress = encodeURI(address);

  fetch(
    `https://nominatim.openstreetmap.org/search?q=${urlAddress}&format=json`
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      let lngLatArr = [json[0].lon, json[0].lat];
      new mapboxgl.Marker().setLngLat(lngLatArr).addTo(map);
    });
}

async function restaurantsOnMap() {
    let restaurantList = await fetch('https://yelpingtonapi.herokuapp.com/api/restaurants')
    .then((res) => res.json())
    
    
    for (restaurant of restaurantList) {
        restoAddyArray.push(restaurant.address)
        restoNameArray.push(restaurant.name)
    }
    restoAddyArray.forEach(restaurant => {
        placeMarker(restaurant)
    })

    console.log(restoAddyArray);
    console.log(restoNameArray);
    console.log(navLinks);

}



// placeMarker("Sweetwaters, Burlington, VT, USA");
// placeMarker("Hen of the Wood, Burlington, VT, USA");
// placeMarker("Leunig's Bistro, Burlington, VT, USA");

restaurantsOnMap();