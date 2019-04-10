// Global Variable setting
bounds = {};
sliderValue = 20;       // sliderValue in minutes
houses = [];
housesInBound = [];
housesMarkers = [];
iconBlue = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
iconGray = "http://labs.google.com/ridefinder/images/mm_20_gray.png";
destination = {};
travelMode = 'DRIVING';
var houseLoad = [d3.csv('cleaned_zillow_data.csv').then(function(data) {
  data.forEach(function(d) {
      houses.push({
        address: d['location'],
        price: +d['price_per_month'],
        bed: +d['bed num'],
        bath: +d['bath num'],
        size: +d['sqft'],
        url: d['url of rental info'],
        lat: +d['latitude'],
        lng: +d['longitude']
      });
  });
})];
Promise.all(houseLoad).then(function(){console.log("");});



function initMap() {
  //variables for Directions API

  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  // Map options
  options = {
    zoom: 15,
    center: {
      lat: 40.7128,
      lng: -74.0060
    }
  }

  // New map
  map = new google.maps.Map(document.getElementById('map'), options);

  directionsDisplay.setMap(map);
  var start_p = document.getElementById('start').value;
  document.getElementById('route').addEventListener('click', function() {
       calculateAndDisplayRoute(directionsService, directionsDisplay, start_p)
})
  /*directionsDisplay.setMap(map);
          directionsDisplay.setPanel(document.getElementById('panel-direction'));

          var control = document.getElementById('floating-panel');
          control.style.display = 'block';
          map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

          var onChangeHandler = function() {
            calculateAndDisplayRoute(directionsService, directionsDisplay);
          };
          document.getElementById('start').addEventListener('change', onChangeHandler);
          document.getElementById('end').addEventListener('change', onChangeHandler);

*/

  // Limiting map scope (map zoom)
  minZoomLevel = 15;
  map.addListener('zoom_changed', function () {
    if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
    heatmap.set('radius', (map.getZoom() - 13) * 10);
    dataRefresh();
  });

  // Listening bound_changed event. If bound changes, refresh crime data and rental data
  map.addListener('dragend', function () {
    dataRefresh();
  });

  // Get initial bounds through listenting 'tilt_changed' (which should only happen when first loaded)
  map.addListener('tilt_changed', function () {
    destination.latlng = map.getCenter();
    destination.marker = new google.maps.Marker({
      position: destination.latlng,
      map: map
    });
    dataRefresh();
  });

  //map.addListener('click', function() {
    //map.setCenter(destination.marker.getPosition());
  //})


  // Crime heatmap
  heatmap = new google.maps.visualization.HeatmapLayer({
    radius: 20,
    map: map
  });
  heatmap.setMap(null);

};
// End of initiateing map


function getMapBounds() {
  bounds.bottom = map.getBounds().getSouthWest().lat();
  bounds.left = map.getBounds().getSouthWest().lng();
  bounds.top = map.getBounds().getNorthEast().lat();
  bounds.right = map.getBounds().getNorthEast().lng();
  //console.log("Get bounds");
  //console.log(bounds);
}

// refresh crime and rental data points
function dataRefresh() {
  //console.log("-----------------------");
  //console.log("Refreshing");
  sliderValue = document.getElementById("sliderbar").value;
  travelMode = document.getElementById("travelModeMenu").value;
  // Update bounds
  getMapBounds();
  // Update crime heat map
  crimeHeatMap();
  // Update houses markers
  houseMarker();
  //console.log("-----------------------");
}

// Is number x is between a and b? (Could be used for checking lat and lng)
function inBetween(x, a, b) {
  // x is the checked number
  // a and b are bounds. No order in this function
  return (x - a) * (x - b) <= 0;
}

// Draw house markers within bounds and then commute time to searched location (destination)
function houseMarker() {
  //console.log("Update houses within bounds")
  var service = new google.maps.DistanceMatrixService();
  var data = houses.filter(function(d) {
    return (inBetween(d.lat, bounds.bottom, bounds.top) && inBetween(d.lng, bounds.right, bounds.left));
  });

  // Fetch commute time for each points within the boundary
  data.forEach(function(k) {

    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var getCommute = {
      origins: [new google.maps.LatLng(k.lat, k.lng)],
      destinations: [destination.latlng],
      travelMode: travelMode
    };
    service.getDistanceMatrix(getCommute, function(response, status) {
      if (status === 'OK') {
        k.commute = response.rows[0].elements[0].duration.value;    // [value] is second; [text] would be in chinese
      } else {
        k.commute = null;
      }

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(k.lat, k.lng),
        map: map,
        icon: (k.commute > sliderValue*60)? iconGray : iconBlue
      });

      var content = "<table><tr><td><b>Price:</b></td> <td>" + k.price.toLocaleString() + "/month</td></tr>"
        + "<tr><td><b>Bed:</b></td> <td>" + k.bed + "</td></tr>"
        + "<tr><td><b>Bath:</b></td> <td>" + k.bath + "</td></tr>"
        + "<tr><td><b>Room size:</b></td> <td>" + k.size.toLocaleString() + " (sqrt)</td></tr>"
        + "<tr><td><b>Commute Time:</b></td> <td>" + Math.round(k.commute/60) + "mins (" + travelMode.toLowerCase() + ")</td></tr>"
        + "<tr><td><b><a href='" + k.url + "' target='_blank'>Link to Zillow</a></b> </td></tr></table>";
      var infowindow = new google.maps.InfoWindow()

      google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
        return function () {
          infowindow.setContent(content);
          infowindow.open(map, marker);
        };
      })(marker, content, infowindow));

      housesMarkers.push(marker);
      housesInBound.push(k);
      //console.log(k);


      marker.addListener('click', function() {
        directionsDisplay.setMap(map);
        var start_point = marker.getPosition()
        calculateAndDisplayRoute(directionsService, directionsDisplay,start_point,travelMode);

      })

    });
  });

  setTimeout(function() {sliderVal(sliderValue, housesInBound);}, 300);
}

function changeTravelMode(val) {
  travelMode = val;
  //console.log(val);
  houseMarker();
}

// Setting and updating sliderValue
function sliderVal(val, dataset=housesInBound) {
  sliderValue = val;        // sliderValue in minutes
  //var data = dataset.filter(function(d) {return d.commute <= sliderValue*60;});

  for (var i = 0; i < dataset.length; i++) {
    if (dataset[i].commute > sliderValue*60) {
      housesMarkers[i].setIcon(iconGray);
    } else {
      housesMarkers[i].setIcon(iconBlue);
    }
  }

}

function calculateAndDisplayRoute(directionsService, directionsDisplay, start, tavel_mode) {
  var end = document.getElementById('address').value;
  directionsService.route({
		 origin: start,
		 destination: end,
		 travelMode: tavel_mode
		}, function(response, status) {
		  if (status === 'OK') {
			directionsDisplay.setDirections(response);
		  } else {
			alert('Directions request failed due to ' + status);
		  }
		});
	}



// Get crime rate heatmap points
function crimeHeatMap() {
  //console.log("Update crime heat map")
  crimeOnMap = [];

  var crimeURL = "https://data.cityofnewyork.us/resource/9s4h-37hy.json?$limit=1000000"; //totalling 468,988 rows in 2017
  var apiCall = crimeURL
    + "&$where="
    + "rpt_dt between \'2017-01-01T00:00:00\' and \'2018-01-01T00:00:00\'"    // Date interval: year 2017
    + " AND latitude between " + bounds.bottom + " and " + bounds.top         // Latitude between left and right bounds
    + " AND longitude between " + bounds.left + " and " + bounds.right        // Longitude between bottom and top bounds
    + " AND law_cat_cd in(\'FELONY\', \'MISDEMEANOR\')";                      // Limiting felony and misdemeanor

  $.getJSON(apiCall, function (data) {
    data.forEach(function (d) {
      crimeOnMap.push({
        location: new google.maps.LatLng(+d['latitude'], +d['longitude']),
        weight: (d['law_cat_cd'] == 'FELONY') ? 5 : 1
      });
    });
  }).done(function () {
    // console.log(crimeOnMap)
    heatmap.setData(crimeOnMap);
  });
}

// Display heatmap or not
function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

// get the geocode for destination address
function geocodeAddress(address) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status === 'OK') {
      destination.latlng = results[0].geometry.location;
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}


// When user search an address (destination)
function searchAddress(address) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);
      destination.marker.setMap(null);
      destination.latlng = results[0].geometry.location;
      destination.marker = new google.maps.Marker({
        position: destination.latlng,
        map: map
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

  // I have no idea why I have to [wait 500 millisecond] to get right bounds.
  setTimeout(function () { dataRefresh() }, 500);
}
