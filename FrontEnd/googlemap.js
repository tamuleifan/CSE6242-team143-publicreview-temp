// Global Variable setting
bounds = {};
slideValue = 20;
/* crimePoints = [];
d3.csv('sample_crime_data.csv').then(function(data) {
  data.forEach(function(d) {
      crimePoints.push({
        year: +d['year'],
        LAW_CAT_CD: d['LAW_CAT_CD'],
        VIC_AGE_GROUP: d['VIC_AGE_GROUP'],
        VIC_SEX: d['VIC_SEX'],
        lat: +d['Latitude'],
        lng: +d['Longitude']
      });
  });
}); */

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
    mapCenterMarkers = new google.maps.Marker({
      position: map.getCenter(),
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

// Setting and updating slideValue
function sliderVal(val) {
  slideValue = val;
  console.log(slideValue);
}

function getMapBounds() {
  bounds.bottom = map.getBounds().getSouthWest().lat();
  bounds.left = map.getBounds().getSouthWest().lng();
  bounds.top = map.getBounds().getNorthEast().lat();
  bounds.right = map.getBounds().getNorthEast().lng();
  console.log(bounds);
}

// refresh crime and rental data points
function dataRefresh() {
  // Update bounds
  getMapBounds();
  crimeHeatMap();
}

// Is number x is between a and b? (Could be used for checking lat and lng)
function inBetween(x, a, b) {
  // x is the checked number
  // a and b are bounds. No order in this function
  return (x - a) * (x - b) <= 0;
}

// Get crime rate heatmap points
function crimeHeatMap() {
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
    + " AND law_cat_cd in(\'FELONY\', \'VIOLATION\')";                        // Limiting felony and violation

  $.getJSON(apiCall, function (data) {
    data.forEach(function (d) {
      crimeOnMap.push({
        location: new google.maps.LatLng(+d['latitude'], +d['longitude']),
        weight: (d['law_cat_cd'] == 'FELONY') ? 5 : 1
      });
    });
  }).done(function () {
    console.log(crimeOnMap)
    heatmap.setData(crimeOnMap);
  });
}

// Display heatmap or not
function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function searchAddress(address) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);
      mapCenterMarkers.setMap(null);
      mapCenterMarkers = new google.maps.Marker({
        position: results[0].geometry.location,
        map: map
      });
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
