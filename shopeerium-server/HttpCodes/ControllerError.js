const ControllerError = function(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
};

ControllerError.prototype = Object.create(Error.prototype);
module.exports = ControllerError;
