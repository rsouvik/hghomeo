

    angular.module('app', ['components'])
     
    .controller('BeerCounter', function($scope, $locale) {
    $scope.beers = [0, 1, 2, 3, 4, 5, 6];
    if ($locale.id == 'en-us') {
    $scope.beerForms = {
    0: 'no beers',
    one: '{} beer',
    other: '{} beers'   
    };
    } else {
    $scope.beerForms = {
    0: 'hello1',
    one: '{} hello2',
    few: '{} hello3',
    other: '{} hello4'
    };
    }
    });

// create the module and name it scotchApp
	var hgApp = angular.module('hgApp', ['ngRoute']);

	// configure our routes
	hgApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'pages/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'pages/contact.html',
				controller  : 'contactController'
			})
                        
                        .when('/medicines', {
				templateUrl : 'pages/medicines.html',
				controller  : 'medController'
			})
                        
                        .when('/question', {
				templateUrl : 'pages/question.html',
				controller  : 'quesController'
			});
	});

	// create the controller and inject Angular's $scope
	hgApp.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Home!';
	});

	hgApp.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});

	hgApp.controller('contactController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});
        
        hgApp.controller('quesController', function($scope) {
		$scope.message = 'Questionnaire TBD.';
	});

	hgApp.controller('medController', function($scope) {
		$scope.message = 'Medicines TBD.';
	});
        
