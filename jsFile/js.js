var myApp = angular.module("myApp", ['ngRoute', 'ngAnimate'])
myApp.factory("musicService", ["$rootScope", function ($rootScope) {
    var svc = {};
    var data = [
        { name: "Grouplove", genre: "Alternative", rating: 3 },
        { name: "The Beatles", genre: "Rock", rating: 4 },
        { name: "The Core", genre: "New Wave", rating: 5 }
    ];
    svc.getArtists = function () {
        return data;
    };
    svc.addArtist = function (Artist) {
        data.push(Artist);
    };
    svc.editArtist = function (index, Artist) {
        data[index] = Artist;
    };
    return svc;
}]);
myApp.controller("listController", ["$scope", "$location", "$routeParams", "musicService",
    function ($scope, $location, $routeParams, musicService) {
        $scope.data = musicService.getArtists();

        $scope.addArtist = function () {
            $location.path("/items/add");
        }
        $scope.editItem = function (x) {
            $location.path("/items/" + x);
        }
    }
])

myApp.controller("addController", ["$scope", "$location", "$routeParams", "musicService",
    function ($scope, $location, $routeParams, musicService) {
        //save a new artist
        $scope.save = function () {
            musicService.addArtist({ name: $scope.item.name, genre: $scope.item.genre, rating: $scope.item.rating })
            $location.path("/items");
        }

        $scope.cancel = function () {
            $location.path("/items");
        }
    }
])

myApp.controller("editController", ["$scope", "$location", "$routeParams", "musicService",
    function ($scope, $location, $routeParams, musicService) {
        $scope.item = musicService.getArtists()[parseInt($routeParams.index)];
        //save existing artist
        $scope.save = function () {
            musicService.editArtist(parseInt($routeParams.index),
           { name: $scope.item.name, genre: $scope.item.genre, rating: $scope.item.rating }
           )
            $location.path("/items");
        }

        $scope.cancel = function () {
            $location.path("/items");
        }
    }
])

.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
               when('/items', {
                   templateUrl: 'view-list.html',
                   controller: 'listController'
               }).
              when("/items/add", {
                  controller: "addController",
                  templateUrl: "view-detail.html"
              })
    .when("/items/:index", {
        controller: "editController",
        templateUrl: "view-detail.html"
    }).
               otherwise({
                   redirectTo: '/items'
               });
        }]);
;