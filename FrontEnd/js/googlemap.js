// Global Variable setting
var info_windows_container = [];
var directionsDisplay = {};
var bounds = {};
var sliderValue = 20;       // sliderValue in minutes
var minZoomLevel = 14;
var houses = [];
var housesInBound = [];
var housesMarkers = [];
var iconBlue = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
var iconGray = "http://labs.google.com/ridefinder/images/mm_20_gray.png";
var destination = {};
var travelMode = 'DRIVING';
var houseLoad = [d3.csv('cleaned_zillow_data.csv').then(function (data) {
  data.forEach(function (d) {
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

function initMap() {
  //variables for Directions API

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

  // Limiting map scope (map zoom)
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
    directionsDisplay = new google.maps.DirectionsRenderer({ preserveViewport: true, suppressMarkers: true });
    info_windows_container = new google.maps.InfoWindow;
    dataRefresh();
  });

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
  document.getElementById("mask").style.visibility = "visible";
  sliderValue = document.getElementById("sliderbar").value;
  travelMode = document.getElementById("travelModeMenu").value;
  // Update bounds
  Promise.all([getMapBounds()])
    .then(houseMarker())
    .then(crimeHeatMap());
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
  var i = 0;
  var data = houses.filter(function (d) {
    return (inBetween(d.lat, bounds.bottom, bounds.top) && inBetween(d.lng, bounds.right, bounds.left));
  });

  if (data.length == 0) document.getElementById("mask").style.visibility = "hidden";

  // Fetch commute time for each points within the boundary
  data.forEach(function (k) {
    k.latlng = new google.maps.LatLng(k.lat, k.lng);

    var getCommute = {
      origins: [k.latlng],
      destinations: [destination.latlng],
      travelMode: travelMode
    };

    service.getDistanceMatrix(getCommute, function (response, status) {
      i += 1;   // counter for data processing index
      console.log(i);

      if (status === 'OK') {
        k.commute = response.rows[0].elements[0].duration.value;    // [value] is second; [text] would be in chinese
      } else {
        k.commute = null;
      }

      if (!inList(k, housesInBound)) {
        var marker = new google.maps.Marker({
          position: k.latlng,
          map: map,
          icon: iconGray//(k.commute > sliderValue * 60) ? iconGray : iconBlue
        });
        var content = "<table  class='tbl-marker'>"
          + "<tr><td><b>Price:</b></td> <td>" + k.price.toLocaleString() + "/month</td></tr>"
          + "<tr><td><b>Bed:</b></td> <td>" + k.bed + "</td></tr>"
          + "<tr><td><b>Bath:</b></td> <td>" + k.bath + "</td></tr>"
          + "<tr><td><b>Room size:</b></td> <td>" + k.size.toLocaleString() + " (sqrt)</td></tr>"
          + "<tr><td><b>Commute Time:</b></td> <td>" + Math.round(k.commute / 60) + "mins (" + travelMode.toLowerCase() + ")</td></tr>"
          + "<tr><td><b><a href='" + k.url + "' target='_blank'>Link to Zillow</a></b> </td></tr>"
          + "</table>";
        var infowindow = new google.maps.InfoWindow

        google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
          return function () {
            info_windows_container.close();
            infowindow.setContent(content);
            infowindow.open(map, marker);
            info_windows_container = infowindow;
          };
        })(marker, content, infowindow));

        // Add commute path when marker is clicked (remove previous and add a new one)
        marker.addListener('click', function () {
          directionsDisplay.set('directions', null);
          directionsDisplay.setMap(map);
          directionsDisplay.setPanel(document.getElementById('panel-direction'));
          calculateAndDisplayRoute(new google.maps.DirectionsService, directionsDisplay, k.latlng);
        });

        housesMarkers.push(marker);
        housesInBound.push(k);
        //console.log(k);
      }

      if (i == data.length) sliderVal(sliderValue, housesInBound);

    });
  });
}

function inList(obj, list) {
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) return true;
  }
  return false;
}

function changeTravelMode(val) {
  travelMode = val;
  //console.log(val);
  houseMarker();
  info_windows_container.close();               //delete the previous marker
  directionsDisplay.set('directions', null);    //delete the previous route
}

// Setting and updating sliderValue
function sliderVal(val, dataset = housesInBound) {
  sliderValue = val;        // sliderValue in minutes
  //var data = dataset.filter(function(d) {return d.commute <= sliderValue*60;});

  for (var i = 0; i < dataset.length; i++) {
    if (dataset[i].commute > sliderValue * 60) {
      if (housesMarkers[i].getIcon() === iconBlue) housesMarkers[i].setIcon(iconGray);
    } else {
      if (housesMarkers[i].getIcon() === iconGray) housesMarkers[i].setIcon(iconBlue);
    }
  }
  //document.getElementById("mask").style.visibility = "hidden";
}

function calculateAndDisplayRoute(dirService, dirDisplay, start) {
  dirService.route({
    origin: start,
    destination: destination.latlng,
    travelMode: travelMode
  }, function (response, status) {
    if (status === 'OK') {
      dirDisplay.setDirections(response);
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
  var ne = new google.maps.LatLng(40.919353, -73.6925357);
  var sw = new google.maps.LatLng(40.4936881, -74.2591087);

  geocoder.geocode({
    address: address,
    bounds: new google.maps.LatLngBounds(sw, ne),
    componentRestrictions: { country: 'US' }
  }, function (results, status) {
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

    dataRefresh()

  });
}
