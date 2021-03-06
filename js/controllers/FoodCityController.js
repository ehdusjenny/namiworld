/*
 * Author: DoYeon (Nami) Kim
 */
 
angular.module('namiworld')
.controller('FoodCityController', function($http, $state, $window, FoodCity, FoodArticle) {
	$window.scrollTo(0, 0);
	var vm = this;
	var url = window.location.href;
	vm.city = url.substring(url.lastIndexOf("/") + 1, url.length);
	console.log(vm.city);
	var cities = ['montreal', 'ottawa', 'quebec_city', 'toronto'];
	if (!cities.includes(vm.city)) {
		vm.city = FoodCity.getCity().url;
		console.log(vm.city);
	}
	vm.cityLoaded = true;

	mapping = {true: -1, false: 1};
	function loadCity() {
		$http({
			url: '../../md/food/articles.json',
			method: 'GET',
			headers: {
   				'Content-Type': "application/json"
 			}
	    }).then(function(response){
	        cities = response.data.cities;
	    	for (i = 0; i < cities.length; i++) {
	    		city = cities[i];
	    		if (city.url == vm.city) {
	    			vm.city = city;
	    			console.log(city.articles);
	    			console.log('2017/06/11' < '2017/07/06');
	    			vm.articles = city.articles.sort(function(a, b){return mapping[a.created > b.created]});
	    			console.log(vm.articles);
	    			break;
	    		}
	    	}
	    }, function(error){
	        vm.city = 'Error fetching food cities!';
	    });
	}
	loadCity();

	function goToArticle(article) {
        FoodArticle.setArticle(article);
        vm.cityLoaded = false;
        $state.go("food.article", {"articleName" : article.filename});
    }
    vm.goToArticle = goToArticle;
});