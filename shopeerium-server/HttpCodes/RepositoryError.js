const RepositoryError = function(message) {
    this.name = 'DBServerError';
    this.statusCode = 516;
    this.message = message;
};

RepositoryError.prototype = Object.create(Error.prototype);
module.exports = RepositoryError;
