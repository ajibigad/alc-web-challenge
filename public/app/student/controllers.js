angular.module('alc.student.controllers', [])
    .controller('StudentController', ['$rootScope', '$scope', '$state', '$stateParams', '$location', '$anchorScroll', '$timeout', 'StudentService',
        function($rootScope, $scope, $state, $stateParams, $location, $anchorScroll, $timeout, StudentService) {

            $scope.sexOptions = [{ name: 'MALE', value: 'male' },
                { name: 'FEMALE', value: 'female' }
            ];

            if ($stateParams.id) {
                Materialize.updateTextFields();
                StudentService.getStudent($stateParams.id, function(student) {
                    $scope.student = student;
                    $scope.student.birthDate = moment($scope.student.birthDate).format('YYYY-MM-DD');

                    //allow page to render data
                    $timeout(function() {
                        console.log("running jquery now");
                        Materialize.updateTextFields();
                        $('select').material_select();
                    }, 1000);
                });
            }

            $scope.submitStudent = function() {
                var inputFields = [
                    { name: 'firstname', friendlyName: 'First Name' },
                    { name: 'lastname', friendlyName: 'Last Name' },
                    { name: 'othername', friendlyName: 'Other Name' },
                    { name: 'sex', friendlyName: 'Sex' },
                    { name: 'phonenumber', friendlyName: 'Phone Number' },
                    { name: 'email', friendlyName: 'Email' },
                    { name: 'address', friendlyName: 'Address' },
                    { name: 'birthdate', friendlyName: 'Birth Date' }
                ];
                if (!$scope['studentdetails'].$valid) {

                    var invalidField = inputFields.find(function(field) {
                        return $scope['studentdetails'][field.name].$invalid;
                    });

                    Materialize.toast("Valid " + invalidField.friendlyName + " is required", 4000, 'rounded');
                    $location.hash(invalidField.name);
                    $anchorScroll.yOffset = 50;
                    $anchorScroll();
                    return;
                }
                console.dir($scope.student);
                if ($stateParams.id) {
                    StudentService.updateStudent($scope.student, function() {
                        Materialize.toast('Student details updated!', 4000);
                        $state.go('students');
                    });
                } else {
                    StudentService.saveStudent($scope.student, function() {
                        Materialize.toast('Student details saved!', 4000);
                        $state.go('students');
                    });
                }
            }

        }
    ])
    .controller('StudentsController', ['$rootScope', '$scope', '$state', 'StudentService', function($rootScope, $scope, $state, StudentService) {

        $scope.dataLoading = false;

        $scope.getStudents = function(tableState) {

            $scope.tableState = tableState;

            var start = tableState.pagination.start || 0;
            var length = tableState.pagination.number || 15;
            var request = {
                page: Math.ceil((start + 1) / length),
                limit: length
            };

            $scope.dataLoading = true;

            StudentService.getStudents(function(students) {
                $scope.students = students.docs;
                tableState.pagination.numberOfPages = students.pages;
                $scope.dataLoading = false;
            }, function(error) {
                Materialize.toast(error.message, 4000);
                $scope.dataLoading = false;
            }, request);
        };

        $scope.deleteStudent = function(id) {
            StudentService.deleteStudent(id, function() {
                $scope.getStudents();
            });
        };

        // $scope.getStudents(); 
    }])