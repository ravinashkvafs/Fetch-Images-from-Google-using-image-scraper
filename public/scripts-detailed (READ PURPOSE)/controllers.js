'use strict';

angular.module('drwn')

.controller('myController', ['$scope', '$state', '$stateParams', 'imgFac', function ($scope, $state, $stateParams, imgFac) {
    $scope.keyword = '';
    $scope.list = '';
    $scope.load = {};
    $scope.string = "null";
    
    $scope.sendKey = function(){        
        $scope.success = 0;
        $scope.success = imgFac.send($scope.keyword);
    };
    $scope.loadList = function(){
        $scope.list = imgFac.getList();
    };
    
    
    $scope.refine = function(load){
        
        return $scope.string;
    };
    $scope.loadIMG = function(){
        $scope.load = imgFac.getIMG({key: $stateParams.key});
        
    };
}])
;