(function () {
    'use strict';

    angular
        .module('app')
        .factory('factory', factory);

    factory.$inject = ['$http'];

    function factory($http) {
        var service = {
            getData: getData
        };

        return service;

        function getData() { }
    }
})();


myApp.factory('myFactory', function () {
    var factory = {};
    factory.multiply = function (a, b) {
        return a * b
    }
    return factory();
});

myApp.service('myService', function (myFactory) {
    this.square = function (a) {
        return factory.multiply(a , a);
    }
});

function person(name){
    this.name = name
}

var me = new person();
me.name