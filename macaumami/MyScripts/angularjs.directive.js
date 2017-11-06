/* Angularjs 初始化 */
var ngapp = angular.module('ngapp', ['ui.bootstrap']);

ngapp.directive('append', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var file = $parse(attrs.append);

            element.bind('change', function () {
                if (element[0].files != undefined) {
                    scope.$apply(function () { file.assign(scope, element[0].files[0]); });
                } else {
                    file.assign(scope, null);
                }
            });
        }
    };
}]);

/* Modal 基本設定 */
var BaseModal = function ($scope, $uibModalInstance) {
    this.cancel = function () { $uibModalInstance.dismiss("cancel"); };
    this.close = function ($o) { $uibModalInstance.close($o); };

    $scope.Cancel = this.cancel;
};