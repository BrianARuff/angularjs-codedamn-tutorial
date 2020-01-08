const app = angular.module("mainApp", ["ngRoute"]);

app.config([
  "$routeProvider",
  function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "login.html"
      }, console.log(location.href))
      .when("/dashboard", {
        resolve: {
          "check": function($location, $rootScope) {
            if (!$rootScope.loggedIn) {
              console.log($location.path());
              $location.path("/");
            }
          }
        },
        templateUrl: "dashboard.html"
      })
      .otherwise({
        redirectTo: "/"
      });
  }
]);

app.controller("loginCtrl", [
  "$scope",
  "$location",
  "$rootScope",
  function($scope, $location, $rootScope) {
    $scope.submit = function(e) {
      if ($scope.username === "admin" && $scope.password === "admin") {
        $rootScope.loggedIn = true;
        $location.path("/dashboard");
      } else {
        $rootScope.loggedIn = false;
        $scope.invalidCredentials = true;
      }
      $scope.removeErrorMessage = function(e) {
        console.log(e);
        console.log($rootScope);
        $scope.invalidCredentials = false;
      };
    };
  }
]);

app.controller("dashboardCtrl", [
  "$scope",
  "$location",
  "$rootScope",
  function($scope, $location, $rootScope) {
    console.log($location.path());
    console.log("$scope", $scope);
    console.log("$rootScope", $rootScope);
  }
]);
