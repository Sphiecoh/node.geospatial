(function()
{
    
angular.module('mapApp').controller('userController',userController);
userController.$inject = ['$scope','$http','$rootScope','geolocation','mapservice'];

function userController($scope, $http, $rootScope, geolocation,mapservice){

    var vm = this;
    vm.formData = {};
    var coords = {};
    vm.title = "Search";
    // Set initial coordinates to the center of the US
    vm.formData.latitude = 39.500;
    vm.formData.longitude = -98.350;
    
    activate();
    
    function activate()
    {
        geolocation.getLocation().then(function(data){

            // Set the latitude and longitude equal to the HTML5 coordinates
            coords = {lat:data.coords.latitude, long:data.coords.longitude};

            // Display coordinates in location textboxes rounded to three decimal points
            vm.formData.longitude = parseFloat(coords.long).toFixed(3);
            vm.formData.latitude = parseFloat(coords.lat).toFixed(3);

            // Display message confirming that the coordinates verified.
            vm.formData.htmlverified = "Yep (Thanks for giving us real data!)";

            mapservice.refresh(vm.formData.latitude, vm.formData.longitude);

        });
    }

    // Functions
    // ----------------------------------------------------------------------------
    // Get coordinates based on mouse click. When a click event is detected....
    $rootScope.$on("clicked", function(){

        // Run the gservice functions associated with identifying coordinates
        $scope.$apply(function(){
            vm.formData.latitude = parseFloat(mapservice.clickLat).toFixed(3);
            vm.formData.longitude = parseFloat(mapservice.clickLong).toFixed(3);
            vm.formData.htmlverified = "Nope (Thanks for spamming my map...)";
        });
    });

    // Creates a new user based on the form fields
    vm.createUser = function() {

        // Grabs all of the text box fields
        var userData = {
            username: vm.formData.username,
            gender: vm.formData.gender,
            age: vm.formData.age,
            favlang: vm.formData.favlang,
            location: {type : 'Point',coordinates:[parseFloat(vm.formData.longitude), parseFloat(vm.formData.latitude)]} ,
            htmlverified: vm.formData.htmlverified
        };

        // Saves the user data to the db
        $http.post('/users', userData)
            .success(function (data) {

                // Once complete, clear the form (except location)
                vm.formData.username = "";
                vm.formData.gender = "";
                vm.formData.age = "";
                vm.formData.favlang = "";

                // Refresh the map with new data
                mapservice.refresh(vm.formData.latitude, vm.formData.longitude);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
}
})();