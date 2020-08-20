// Variable Declarations ////////////////////////////////////////////////////////////////////////
  let hash = location.hash;
  let id = hash.slice(1);
  let dirtyCoords = hash.split('?')
  let reversedCoords = dirtyCoords[1].split(',')
  let cleanCoords = [reversedCoords[1], reversedCoords[0]]
  let name = document.getElementById('name')
  let category = document.getElementById('category')
  let address = document.getElementById('address')
  let phone = document.getElementById('phone')
  let hours = document.getElementById('hours')
  let notes = document.getElementById('notes')
  let link = document.getElementById('website')
  
  let myMap = (mapboxgl.accessToken =
    "pk.eyJ1Ijoic2Vhbm1wMjIiLCJhIjoiY2tjM3M0bGlwMDB4ejJxbXNmbndvdjNxbyJ9.vwuXpXD9aoHqCUtonVTF0A");
  let map = new mapboxgl.Map({
    container: "restaurant-map", // container id
    style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
    center: cleanCoords, // starting position [lng, lat]
    zoom: 17, // starting zoom
  });
    
  
  // Function Declarations ////////////////////////////////////
  function placeMarker(coords) {
    // Place marker on map
    let lngLatArr = [coords[1], coords[0]];
    new mapboxgl.Marker().setLngLat(lngLatArr).addTo(map);
  }
  
  async function restaurantsOnMap() {
    // Fetch API data and push relavent data to arrays for later use
    let restaurant = await fetch(
      `https://yelpingtonapi.herokuapp.com/api/restaurants/${id}`
    ).then((res) => res.json());
    
    // Populating restaurant template divs with restaurant info
    name.textContent = restaurant.name;
    address.textContent = restaurant.address;
    phone.textContent = restaurant.phone;
    category.textContent = restaurant.category;
    link.innerHTML = restaurant.website;
    link.href = restaurant.website;
    hours.textContent = restaurant.hours;
    notes.textContent = restaurant.notes;
    coords = restaurant.coords    
      
  
    placeMarker(restaurant.coords); // Marker placement
  
      
  }
  
  // Function Call ////////////////////////////////////////////
  restaurantsOnMap();