    //  (function () {
    //define angular application + take dependency on angulars 
    // routing module (ngRoute) [from angular-route.js] 
    angular.module("MyAngularApp", ["ngRoute"]);


    //define applications config, where we will outline the routing rules
    angular.module("MyAngularApp")
        .config(function ($routeProvider, $locationProvider) {

            $locationProvider.hashPrefix("");

            $routeProvider
                .when("/", { //when we hit just tthe root url, go to the overviewpage
                    templateUrl: "View-VisitedCountryListOverview.html"
                })
                .when("/overview", { //when we hit baseurl/overview, then render the overview partial page
                    templateUrl: "View-VisitedCountryListOverview.html"
                })
                .otherwise({ //otherwise show a simple error message when someone tries to go somewher else on our site
                    template: "<strong> Error: You have routed to an invalid page! </strong>"
                });
        });

    //Add the controller definition and implementation to the application
    angular.module("MyAngularApp").controller("CountriesVisitedController", CountriesVisitedController);

    //1) create an mvc - 'controller' which will coordinate getting the 'model' and present itfor the 'view'
    function CountriesVisitedController($scope) {
        /* 2) inject $scope (angular DI object for a context, where    
                                                                  out view and controller have access to it. 
                                                                  very similar to ViewBag! in Asp.NET) */

        $scope.countryToAdd = {}; //8) declare the countryToAdd in the scope viewbag.

        // 3) this is the same array data, but we now place it in the controller
        //    and as a property of our Angular $scope bag. (mimicking it retrieving the data from a web service/webapi)
        //    anything defined in $scope willbecome available as a variable in our 'view' side of angular. 
        $scope.countriesVisited = [{
            name: 'Thailand',
            datevisited: '11/18'
        }, {
            name: 'USA-ToShowItsComingFromScope!',
            datevisited: '07/18'
        }, {
            name: 'Japan',
            datevisited: '10/18'
        }, {
            name: 'Brazil',
            datevisited: '09/18'
        }, {
            name: 'Colombia',
            datevisited: '09/18'
        }];

        // 5) create a method in scope that allows for adding a new visited country to array
        $scope.addVisitedCountry = function (countyVisitData) {
            $scope.countriesVisited.push(countyVisitData);
            // because of how data binding works in Angular..
            // when to add to this array, the ng-repeat (in view, ln:14) 
            // that references the array, will automatically be updated
            // and display the new addition

            $scope.countryToAdd = {}; //8) empty out the countryToAdd so nexttime we want add, we get a new instance
        };
    };

    //  })();