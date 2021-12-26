navigator.geolocation.getCurrentPosition(function (position) {
  console.log(position.coords.longitude, position.coords.latitude);
  initMap(position.coords.longitude, position.coords.latitude);
});

// Initialize and add the map
function initMap(lng, lat) {
  // The location of Uluru
  const uluru = { lat: lat, lng: lng };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}
