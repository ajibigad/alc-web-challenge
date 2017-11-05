angular.module('alc.student.services', [])
	.service('StudentService', ['$http', 'HttpRequestHandler', 'AlcEndpoints',  function($http, HttpRequestHandler, AlcEndpoints){
		var endpoint = AlcEndpoints.studentEndpoint;

		var generateEndpointWithID = function(id){
			return endpoint + "/" + id;
		}

		this.getStudents = function(successHandler, errorHandler, request){
			HttpRequestHandler($http.get(endpoint, {params: request}), successHandler, errorHandler);
		};

		this.getStudent = function(id, successHandler, errorHandler){
			HttpRequestHandler($http.get(generateEndpointWithID(id)), successHandler, errorHandler);
		}

		this.saveStudent = function(request, successHandler, errorHandler){
			HttpRequestHandler($http.post(endpoint, request), successHandler, errorHandler);
		}

		this.updateStudent = function(request, successHandler, errorHandler){
			HttpRequestHandler($http.put(endpoint, request), successHandler, errorHandler);
		}

		this.deleteStudent = function(id, successHandler, errorHandler){
			HttpRequestHandler($http.delete(generateEndpointWithID(id)), successHandler, errorHandler);
		}
	}])