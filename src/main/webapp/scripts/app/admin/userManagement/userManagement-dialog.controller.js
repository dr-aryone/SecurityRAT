'use strict';

angular.module('sdlctoolApp').controller('UserManagementDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'UserManagement', 'Authorities', 'User', 'AlertService',
        function($scope, $stateParams, $uibModalInstance, entity, UserManagement, Authorities, User, AlertService) {
    	$scope.usernamePattern = new RegExp("^[a-z0-9]*$");
        $scope.user = entity;
        Authorities.query(function(result) {
        	$scope.authorities = result;
        });
        
        $scope.load = function(id) {
        	UserManagement.get({id : id}, function(result) {
                $scope.user = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('sdlctoolApp:UserManagementUpdate', result);
            $uibModalInstance.close(result);
        };

        $scope.save = function () {
        	
            if ($scope.user.id != null) {
            	User.update($scope.user, onSaveFinished);
            } else {
            	$scope.user.password = "Dummy=2pass";
            	$scope.user.langKey = 'en';
            	User.save($scope.user, onSaveFinished, function(error) {
            		if(error.status == 400) {
            			AlertService.error('Username or email already in use', ['email', 'username'])
            		}
            	});
            }
        };
        $scope.close = function(){}
        $scope.clear = function() {
        	$uibModalInstance.dismiss('cancel');
        };
}]);
