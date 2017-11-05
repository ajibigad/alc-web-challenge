angular.module('alc.services', [])
	.service('AlcEndpoints', function(){
		this.studentEndpoint = "/api/v1/alc/student";
	})
	.service('HttpRequestHandler', [function(){

		var defaultErrorHandler = function (error) {
			Materialize.toast(error.message, 4000);
			console.dir(error);
		}

		return function(httpPromise, successHandler, errorHandler){
			
			if( !successHandler ){
				console.error("success handler not passed in args");
				return;
			} else if( (typeof successHandler !== "function") ){
				console.error("success handler must be a function");
				return;
			}

			if( !errorHandler || typeof errorHandler !== "function" ){
				errorHandler = defaultErrorHandler;
			}

			Materialize.Toast.removeAll();

			httpPromise.then(function(response){
				if(response.data.message){
					Materialize.toast(response.data.message, 4000, 'rounded');
				}
				successHandler(response.data.data);
			}, function(response){
				errorHandler(response.data);
			});
		};
	}]);