/* jshint node: true */
'use strict';


// Declare app level module which depends on filters, and services
angular.module('alc', [
    'ngAnimate',
    'ui.router',
    'smart-table',
    'alc.services',
    'alc.student.services',
    'alc.student.controllers',
    'ncy-angular-breadcrumb'
]).
config(['$stateProvider', '$urlRouterProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $breadcrumbProvider) {
    $stateProvider
        .state('students', {
            url: '/students',
            controller: 'StudentsController',
            templateUrl: 'app/student/templates/students.html',
            ncyBreadcrumb: {
                label: 'Students'
            }
        })
        .state('student', {
            url: '/student/:id',
            controller: 'StudentController',
            templateUrl: 'app/student/templates/student.html',
            ncyBreadcrumb: {
                label: 'Student Details',
                parent: 'students'
            }
        });
    $urlRouterProvider.otherwise('/students');

    $breadcrumbProvider.setOptions({
      // template: '<div>My app<span ng-repeat="step in steps"> > {{step.ncyBreadcrumbLabel}}</span></div>',
      template: '<div class="nav-wrapper"><div class="col s12"><a href="{{step.ncyBreadcrumbLink}}" class="breadcrumb" ng-repeat="step in steps">{{step.ncyBreadcrumbLabel}}</a></div></div>'
    });
}]);