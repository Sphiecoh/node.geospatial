(function()
{
	    
angular.module('mapApp').controller('searchController',searchController);
searchController.$inject = ['geolocation','$http'];
	function searchController(geolocation,$http)
	{
		var vm = this;
		vm.title ='Search For Users';
		vm.users ={};
		activate();
		
		function activate()
		{
			geolocation.getLocation().then(function(data){

        // Set the latitude and longitude equal to the HTML5 coordinates
         vm.coords = {lat:parseFloat(data.coords.latitude).toFixed(4), long:parseFloat(data.coords.longitude).toFixed(4)};
           $http.post('/users/near',vm.coords).success(function(data){
			   vm.users = data;
		   }).error(function(){});

    });
		}
	}
})();