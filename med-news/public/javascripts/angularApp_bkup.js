var app = angular.module('MedNews', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
	postPromise: ['posts', function(posts){
	  return posts.getAll();
	}]
      }	
    });

  $urlRouterProvider.otherwise('home');
}]);

app.factory('posts', ['$http', function($http){
  var o = {
    posts: []
  };
  o.create = function(post) {
  return $http.post('/posts', post).success(function(data){
    o.posts.push(data);	
  });
};
o.upvote = function(post) {
  return $http.put('/posts/' + post._id + '/upvote')
    .success(function(data){
      post.upvotes += 1;
    });
};
  o.getAll = function() {
	return $http.get('/posts').success(function(data){
	angular.copy(data, o.posts);
	});
  };
  return o;
}]);

app.factory('userService', [function() {
  var sdo = {
    isLogged: false,
    username: ''
  };
  return sdo;
}]);

app.controller('MainCtrl', [
'$scope',
'posts',
function($scope, posts){
  $scope.test = 'Hello world!';
  $scope.posts = posts.posts;
//  $scope.posts = [
//  {title: 'post 1', upvotes: 5},
//  {title: 'post 2', upvotes: 2},
//  {title: 'post 3', upvotes: 15},
//  {title: 'post 4', upvotes: 9},
//  {title: 'post 5', upvotes: 4}
//];
  $scope.addPost = function(){
   //$scope.posts = posts.posts;
    if(!$scope.title || $scope.title === '') { return; }
  //$scope.posts.push({
  //  title: $scope.title,
  //  link: $scope.link,
  //  upvotes: 0
  //});
  posts.create({
    title: $scope.title,
    link: $scope.link,
    upvotes: 0
  });
  $scope.title = '';
  $scope.link = '';
};
$scope.incrementUpvotes = function(post) {
  posts.upvote(post);
};
}]);

app.controller('LoginCtrl', [
'$scope',
'$http',
'userService',
function($scope, $http, User){
  $scope.login = function() {
  // configuration object
  var config = { /* ... */ }

  $http(config)
  .success(function(data, status, headers, config) {
    if (data.status) {
      // succefull login
      User.isLogged = true;
      User.username = data.username;
    }
    else {
      User.isLogged = false;
      User.username = '';
    }
  })
  .error(function(data, status, headers, config) {
    User.isLogged = false;
    User.username = '';
  });
}
}]);

var directives = angular.module('directives');

directives.directive('showtab',
    function () {
        return {
            link: function (scope, element, attrs) {
                element.click(function(e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        };
    });



angular.module('components', [])


  .directive('tabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: [ "$scope", function($scope) {
        var panes = $scope.panes = [];
 
        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        }
 
        this.addPane = function(pane) {
          if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        }
      }],
      template:
        '<div class="tabbable">' +
          '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
              '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
          '</ul>' +
          '<div class="tab-content" ng-transclude></div>' +
        '</div>',
      replace: true
    };
  })
  
  .directive('pane', function() {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: { title: '@' },
      link: function(scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);
      },
      template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true
    };
  })
  
  

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


  
  




