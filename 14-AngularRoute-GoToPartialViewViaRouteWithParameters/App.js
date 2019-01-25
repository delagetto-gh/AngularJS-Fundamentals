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
                .when("/overview", { 
                    templateUrl: "View-VisitedCountryListOverview.html"
                })
                .when("/detail/:countryName", { //syntax ':urlParamName' - defines a the name of the url parameter that we will pass to this route (and will consume in its controller)
                    templateUrl: "View-VisitedCountryDetail.html"
                })
                .otherwise({
                    template: "<strong> Error: You have routed to an invalid page! </strong>"
                });
        });


    ////  ------------------- CountriesVisitedController  (same as example 13.. nothing to see here..)-----------------------------------------

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


    ////  -------------------------------- CountryDetailsViewController ------------------------------------------------

    //Add the controller definition and implementation to the application
    angular.module("MyAngularApp").controller("CountryDetailsViewController", CountryDetailsViewController);

    //1) create an mvc - 'controller' which will coordinate getting the 'model' and present itfor the 'view'
    //  NOTE - here we inject the $routeParams object which angrular provdides us,that will contain the url params we
    //  defined in the route (in config)
    function CountryDetailsViewController($scope, $routeParams) {

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

        var foundCountry = {};

        //here we loop through our countries arry to try and find the country with a name that matches
        //the name of the country we supplied in our link (from the overviews page).
        // oncefound, set a scope variable of 'selectedCountry' which our View-VisitedCountryDetail view will
        // use to bind data.
        
        for (var i = 0; i < $scope.countriesVisited.length; i++) {
            if ($scope.countriesVisited[i].name == $routeParams.countryName) {
                foundCountry = $scope.countriesVisited[i];
            }
        }
        $scope.selectedCountryDetail = foundCountry;
    };

    //  })();