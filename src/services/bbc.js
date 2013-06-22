angular.module('angular-bbc').factory('bbc', ['$http', '$q', function ($http, $q) {

  var bbc = {};

  bbc.topics = function () {
    var deferred = $q.defer();

    $http.get('http://api.bbcnews.appengine.co.uk/topics').success(function (data) {
      deferred.resolve(data);
    }).error(function (data, status, headers, config) {
      deferred.reject(new Error());
    });

    return deferred.promise;
  };

  bbc.stories = function () {

  };

  return bbc;
}]);
