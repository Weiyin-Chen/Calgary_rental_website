
var app = angular.module('myApp', []);
app.controller('test', function($scope, $http) {
	$scope.address = "";
  //initialize google map, set the center point
	var map;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.046, lng: -114.072},
    zoom: 12
  });

  //get all the data from db and mark them on the map
  $http.get("/users").then(function (response) {
    for (var i = 0; i < response.data.length; i++) {
      var num = response.data[i].sum.toString();
      var contentString = 'Rental info at this address';
      for (var j = 0; j < num; j++) {
        contentString = contentString  + '<br>' + '<br>' + 
        "Title: " + response.data[i].title[j] + '<br>' +
        "Price: " + response.data[i].price[j] + '<br>' +
        "Description: " + response.data[i].description[j] + '<br>' +
        "Contact: " + response.data[i].contact[j]
      }
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      
      var marker = new google.maps.Marker({
        map: map,
        position: {lat: response.data[i].address[0], lng: response.data[i].address[1]},
        label: num,
        infowindow: infowindow
      });

      google.maps.event.addListener(marker, 'click', function() {
        this.infowindow.open(map, this);

      });
    }

  });

  //post method, when user clicks submit button, update the center of map and save new data
  $scope.create = function() {
    var geocoder = new google.maps.Geocoder();
    var temp = $scope.address;
    geocoder.geocode({'address': temp}, function(results, status) {
      if (status === 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
        map.setZoom(16);
        var info ={
          address: [results[0].geometry.location.lat(), results[0].geometry.location.lng()],
          sum: 1,
          title: [$scope.title],
          price: [$scope.price],
          description: [$scope.description],
          contact: [$scope.contact]
        }
        $http.post('/users', info)
        .success(function (data) {
         $scope.address = '';
         $scope.title = '';
         $scope.price = '';
         $scope.description = '';
         $scope.contact = '';
       })
        .error(function (data) {
         console.log('error: ' + data);
       })
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });


  }
})

