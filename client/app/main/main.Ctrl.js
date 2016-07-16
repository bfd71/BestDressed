(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$state', 'Auth', '$modal', '$http'];

    function MainCtrl($scope, $state, Auth, $modal, $http) {
        $scope.user = Auth.getCurrentUser();

        $scope.look = {};

        // related to ng-show and ng-hide - certain elements will depend on if the 
        // user has added something to the input field
        $scope.scrapePostForm = true;
        $scope.uploadLookTitle = true;
        $scope.uploadLookForm = false;
        $scope.showScrapeDetails = false;
        $scope.gotScrapeResults = false;
        $scope.loading = false;

        // from angular-motion documentation
        var myModal = $modal({
            scope: $scope,
            show: false
        });
        // from angular-motion documentation
        $scope.showModal = function() {
            myModal.$promise.then(myModal.show);
        }

        // define angular-watch listener function
        // Watch for changes to URL, Scrape and Display Results
        $scope.$watch('look.link', function(newVal, oldVal) {
            if (newVal.length > 5) {
                $scope.loading = true;
            }
            $http.post('/api/links/scrape', {
                url: $scope.look.link
            })
                .then(function(data) {
                    console.log(data);
                    $scope.showScrapeDetails = true;
                    $scope.gotScrapeResults = true;
                    $scope.uploadLookTitle = false;
                    $scope.look.imgThumb = data.data.img;
                    $scope.look.description = data.data.desc;
                })
                .catch(function(data) {
                    console.log('failed to return from scrape');
                    $scope.loading = false;
                    $scope.look.link = '';
                    $scope.gotScrapeResults = false;
                })
                .finally(function() {
                    $scope.loading = false;
                    $scope.uploadLookForm = false;
                });
        });

    }
})();