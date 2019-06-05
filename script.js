let map, infoWindow;

function createMap (){
    let options = {
        center: {
            lat: 40.758701,
            lng: -111.876183
        },
        zoom: 10, // zoom is from 1-17
        // mapTypeId: google.maps.MapTypeId.HYBRID
        // makes map view hybrid
    };

    map = new google.maps.Map(document.getElementById('map'), options)

    var input = document.getElementById('search');
    var searchBox = new google.maps.places.SearchBox(input);
  
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });
  
    var markers = [];
    
    searchBox.addListener('places_changed', function () {
      var places = searchBox.getPlaces(); // retrieves a list of places according to the query
  
      if (places.length == 0)
        return;
  
      markers.forEach(function (m) { m.setMap(null); });
      markers = [];
  
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(p) {
        if (!p.geometry)
          return;
  
        markers.push(new google.maps.Marker({
          map: map,
          title: p.name,
          position: p.geometry.location
        }));
  
        if (p.geometry.viewport)
          bounds.union(p.geometry.viewport);
        else
          bounds.extend(p.geometry.location);
      });
      
      map.fitBounds(bounds);

    })

//     infoWindow = new google.maps.InfoWindow;

//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(function(pos){
//             let position = { // position requires lat and lng, that is how the api wants it
//                 lat: pos.coords.latitude,
//                 lng: pos.coords.longitude
//             }
//             infoWindow.setPosition(position);
//             infoWindow.setContent('You are here!');
//             infoWindow.open(map)
//         }, function (){
//             handleLocationError('Geolocation service failed', map.center())
//         })
//     } else {
//         handleLocationError('No geolocation available', map.center())
//     }
// }

// function handleLocationError (text, position){
//     infoWindow.setPosition(position);
//     infoWindow.setContent(text);
//     infoWindow.open(map)
}


