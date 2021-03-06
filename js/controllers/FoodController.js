/*
 * Author: DoYeon (Nami) Kim
 */
 
angular.module('namiworld')
.controller('FoodController', function($http, $state, $rootScope, FoodCity, FoodArticle) {
	var vm = this;

	/*
	 * articles.json has a list of cities.
	 * Each city has a name, region, country, and a list of articles with title, filename, synopsis, created, and tags.
	 */

    var cities = ['montreal', 'ottawa', 'quebec_city', 'toronto'];

    var url = window.location.href;
    var last_word = url.substring(url.lastIndexOf("/") + 1, url.length);
    //some major hardcoded hacky poop
	if (last_word != 'tech' && last_word != 'blog' && last_word != 'bio' && last_word != 'main' && last_word != 'food'
        && !url.includes('/tech/') && !url.includes('/blog/') && !url.includes('/bio/') && !url.includes('/main/')) {
        vm.articleOpen = true;
    }
    else if (cities.includes(last_word)) {
        vm.articleOpen = false;
        vm.cityLoaded = true;
    }
    else {
        vm.articleOpen = false;
        vm.cityLoaded = false;
    }
    $http({
            url: '../../md/food/articles.json',
            method: 'GET',
            headers: {
                'Content-Type': "application/json"
            }
    }).then(function(response){
        vm.cities = response.data.cities;
    }, function(error){
        vm.cities = 'Error getting food articles!';
    });

    mapping = {true: -1, false: 1};
    function getThreeLatestArticles(cityName) {
    	for (i = 0; i < vm.cities.length; i++) {
    		city = vm.cities[i]
    		if (city.name == cityName) {
    			var sorted = city.articles.sort(function(a, b){
    				if (a.created.toLowerCase().localeCompare(b.created.toLowerCase()) == 0) {
    					return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    				}
                    else return mapping[a.created > b.created];
    			});
    			return sorted.slice(0, 3);
    		}
    	}
    	return null;
    }
	vm.getThreeLatestArticles = getThreeLatestArticles;

	function goToCity(city) {
		FoodCity.setCity(city);
        vm.cityLoaded = true;
		$state.go("food.city", {"cityName" : city.url});
	}
	vm.goToCity = goToCity;

    function goToArticle(article) {
        FoodArticle.setArticle(article);
        vm.articleOpen = true;
        $state.go("food.article", {"articleName" : article.filename});
    }
    vm.goToArticle = goToArticle;

    $rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams){
        if (toState.name == "food") {
            vm.articleOpen = false;
            vm.cityLoaded = false;
        }
    })
});