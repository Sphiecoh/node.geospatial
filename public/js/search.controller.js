(function()
{
	    
angular.module('mapApp').controller('searchController',searchController);
searchController.$inject = ['geolocation','$http'];
	function searchController(geolocation,$http)
	{
		var search = this;
		search.title ='Search For Users';
		search.users ={};
		activate();
		
		function activate()
		{
			geolocation.getLocation().then(function(data){

        // Set the latitude and longitude equal to the HTML5 coordinates
         search.coords = {lat:parseFloat(data.coords.latitude).toFixed(4), long:parseFloat(data.coords.longitude).toFixed(4)};
           $http.post('/users/near',search.coords).success(function(data){
			   search.users = data;
		   }).error(function(){});

    });
		}
	}
})();