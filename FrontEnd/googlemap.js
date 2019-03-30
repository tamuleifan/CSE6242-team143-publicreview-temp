//var map;
function initMap() {
    // Map options
    var options = {
      zoom: 11,
      center: {
        lat: 40.7128,
        lng: -74.0060
      }
    }
    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);

    // geocoder
     var geocoder = new google.maps.Geocoder();
     document.getElementById('submit').addEventListener('click', function() {
       geocodeAddress(geocoder, map);
     });

     $(document).ready(function(){
       //$("button").click(function(){
         $.getJSON("toy.json",function(data){
           //alert('data loaded')
           $.each(data,function(i,field){
             //console.log(field.lat)
             //console.log(field.lng)

             // get the filter values and present the markers that is equal to the values
             // need a eventlistener that may be put outside the function initMap
             var userInput = document.getElementById('filter').value;
             console.log(userInput)
             console.log(field.rating)
             if (field.rating === userInput){
               var myLatLng = new google.maps.LatLng(field.lat,field.lng);
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







  // translate address to geo location of lat and lng
  var markers = []
  function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
            markers.push(marker)
            if(markers.length == 2){
              markers[0].setMap(null);//delete the previous marker
              markers.shift();//remove the first element in the array
            }
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }

      //clear entries and map display
    function clearEntries(){
      		$("#address, #filter").val("");
      		//$("#map, #panel-direction").html("");
      	}


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
