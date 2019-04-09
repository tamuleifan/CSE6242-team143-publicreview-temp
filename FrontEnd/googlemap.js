// Global Variable setting
bounds = {};
sliderValue = 20;       // sliderValue in minutes
houses = [];
housesInBound = [];
housesMarkers = [];
destination = {};
travelMode = 'DRIVING';
var houseLoad = [d3.csv('toy_zillow_data.csv').then(function(data) {
  data.forEach(function(d) {
      houses.push({
        address: d['location'],
        price: +d['price_per_month'],
        bed: +d['bed_num'],
        bath: +d['bath_num'],
        size: +d['sqft_'],
        url: d['url of rental info'],
        lat: +d['lat'],
        lng: +d['lng']
      });
  });
})]; 
Promise.all(houseLoad).then(function(){console.log(houses);});

function initMap() {
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

  // Crime heatmap
  heatmap = new google.maps.visualization.HeatmapLayer({
    radius: 20,
    map: map
  });
  heatmap.setMap(null);

  // Recommend refine the following code: remove from iniMap()
  $(document).ready(function () {
    //$("button").click(function(){
    $.getJSON("toy.json", function (data) {
      //alert('data loaded')
      $.each(data, function (i, field) {
        //console.log(field.lat)
        //console.log(field.lng)

        // get the filter values and present the markers that is equal to the values
        // need a eventlistener that may be put outside the function initMap
        var userInput = document.getElementById('filter').value;
        console.log(userInput)
        console.log(field.rating)
        if (field.rating === userInput) {
          var myLatLng = new google.maps.LatLng(field.lat, field.lng);
          console.log(myLatLng);
        }


        // Creating a marker and putting it on the maps
        var marker = new google.maps.Marker({
          position: myLatLng,
          icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
        });
        marker.setMap(map);
      })
    })
    //})
  })

};
// End of initiateing map


function getMapBounds() {
  bounds.bottom = map.getBounds().getSouthWest().lat();
  bounds.left = map.getBounds().getSouthWest().lng();
  bounds.top = map.getBounds().getNorthEast().lat();
  bounds.right = map.getBounds().getNorthEast().lng();
  console.log("Get bounds");
  console.log(bounds);
}

// refresh crime and rental data points
function dataRefresh() {
  console.log("-----------------------");
  console.log("Refreshing");
  sliderValue = document.getElementById("sliderbar").value;
  travelMode = document.getElementById("travelModeMenu").value;
  // Update bounds
  getMapBounds();
  // Update crime heat map
  crimeHeatMap();
  // Update houses markers
  houseMarker();
  console.log("-----------------------");
}

// Is number x is between a and b? (Could be used for checking lat and lng)
function inBetween(x, a, b) {
  // x is the checked number
  // a and b are bounds. No order in this function
  return (x - a) * (x - b) <= 0;
}

// Draw house markers within bounds and then commute time to searched location (destination)
async function houseMarker() {
  console.log("Update houses within bounds")
  var service = new google.maps.DistanceMatrixService();
  var data = houses.filter(function(d) {
    return (inBetween(d.lat, bounds.bottom, bounds.top) && inBetween(d.lng, bounds.right, bounds.left));
  });
  
  // Fetch commute time for each points within the boundary
  data.forEach(function(k) {
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
        map: (k.commute > sliderValue*60) ? null : map,
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      });
      housesMarkers.push(marker);
      housesInBound.push(k);
      //console.log(k);
    });
  });
  
  setTimeout(function() {sliderVal(sliderValue, housesInBound);}, 300);
}

function changeTravelMode(val) {
  travelMode = val;
  console.log(val);
  houseMarker();
}

// Setting and updating sliderValue
function sliderVal(val, dataset=housesInBound) {
  sliderValue = val;        // sliderValue in minutes
  //var data = dataset.filter(function(d) {return d.commute <= sliderValue*60;});

  for (var i = 0; i < dataset.length; i++) {
  console.log(dataset[i].marker);
    if (dataset[i].commute > sliderValue*60) {
      housesMarkers[i].setMap(null);
    } else {
      housesMarkers[i].setMap(map);
    }
  }

}

// Get crime rate heatmap points
function crimeHeatMap() {
  console.log("Update crime heat map")
  crimeOnMap = [];
  /*var data = crimePoints.filter(function(d) {
    return (inBetween(d.lat, bounds.bottom, bounds.top) && inBetween(d.lng, bounds.right, bounds.left))
  });

  data.forEach(function(k) {
    crimeOnMap.push(new google.maps.LatLng(k.lat, k.lng));
  })*/
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

// When user search an address (destination)
function searchAddress(address) {
  console.log("Search: " + address);
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
      console.log("Result: (" + results[0].geometry.location.lat() + ", " + results[0].geometry.location.lng() + ")");
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
  
  // I have no idea why I have to [wait 500 millisecond] to get right bounds.
  setTimeout(function () { dataRefresh() }, 500);
}

//clear entries and map display
function clearEntries() {
  $("#address, #filter").val("");
  //$("#map, #panel-direction").html("");
}


  // customized marker- goldstar
/*var goldStar = {
  path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
  fillColor: 'yellow',
  fillOpacity: 0.8,
  scale: 0.1,
  strokeColor: 'gold',
  strokeWeight: 1
};*/

/*
// Array of markers
var markers = [{
    coords: {
      lat: 40.7128,
      lng: -74.0060
    },
    iconImage: goldStar,
    content: "<h3>Liberty Statue</h3>"
  },
  {
    coords: {
      lat: 40.758896,
      lng: -73.985130
    },
    iconImage: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    content: "<h3>Times Square</h3>"
  },
  {
    coords: {
      lat: 40.8075,
      lng: -73.9626
    },
    content: "<h3>Columbia University</h3>"
  }
];
*/




/*  for (var i = 0; i < markers.features.length; i++) {
    addMarker(markers[i]);
  };

  // Add Marker function
  function addMarker(props) {
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      //icon:props.iconImage
    });
    // Check for customized icon
    if (props.iconImage) {
      // Set icon image
      marker.setIcon(props.iconImage)
    }

    // Check content
    if (props.content) {
      var infoWindow = new google.maps.InfoWindow({
        content: props.content
      });

      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      });
    }
  }

  // Listen for click on map
  google.maps.event.addListener(map, 'click',
    function(event) {
      // Add markers
      addMarker({
        coords: event.latLng
      });
    });
}
*/

//ajax asynchronous deprecated
/*$(document).ready(function(){
  $("button").click(function(){
var houses = (function (){
  console.log(1)
    var json = null;
    $.ajax({

        'url': 'toy.json',
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
    alert("OK, data loaded");
})();
})
})*/



/*var markers;

$(document).ready(function(){
  $("button").click(function(){
    $.get("toy.csv", function(data, status){
      if(status == "success"){
      alert("Data: " + data + "\nStatus: " + status);
    }
      Papa.parse(data, {
        header: true,
        complete: function(results){
          markers = results.data;
        }
      });
    });
  });
});
*/

// slider filter
