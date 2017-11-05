var AlcResponse = function(message, data){

	var defaultMessage = "Response from ALC";

	var response = {
		message : message ? message: defaultMessage,
		data : data ? data : {}
	};

	return response;
}

module.exports = AlcResponse;