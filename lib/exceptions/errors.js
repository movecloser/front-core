"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableEntityError = exports.UnauthorizedError = exports.TooManyRequestsError = exports.TemporaryUnavailableError = exports.ResourceActionFailed = exports.PermissionDeniedError = exports.NotImplementedError = exports.NotFoundError = exports.MissingPropertyError = exports.MissingParameter = exports.MappingError = exports.InternalServerError = exports.IncorrectValueError = exports.IncorrectCall = exports.DeprecatedError = exports.ConflictError = exports.ConnectionError = exports.BadRequestError = void 0;
class BadRequestError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'BadRequestError';
    }
}
exports.BadRequestError = BadRequestError;
class ConnectionError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'ConflictError';
    }
}
exports.ConnectionError = ConnectionError;
class ConflictError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'ConflictError';
    }
}
exports.ConflictError = ConflictError;
class DeprecatedError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'DeprecatedError';
    }
}
exports.DeprecatedError = DeprecatedError;
class IncorrectCall extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'IncorrectCall';
    }
}
exports.IncorrectCall = IncorrectCall;
class IncorrectValueError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'IncorrectValueError';
    }
}
exports.IncorrectValueError = IncorrectValueError;
class InternalServerError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'InternalServerError';
    }
}
exports.InternalServerError = InternalServerError;
class MappingError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'MappingError';
    }
}
exports.MappingError = MappingError;
class MissingParameter extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'MissingParameter';
    }
}
exports.MissingParameter = MissingParameter;
class MissingPropertyError extends Error {
    constructor(key) {
        super();
        this.key = key;
        this.message = `Key: [${this.key}] not found`;
        this.name = 'MissingPropertyError';
    }
}
exports.MissingPropertyError = MissingPropertyError;
class NotFoundError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
class NotImplementedError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'NotImplementedError';
    }
}
exports.NotImplementedError = NotImplementedError;
class PermissionDeniedError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'PermissionDeniedError';
    }
}
exports.PermissionDeniedError = PermissionDeniedError;
class ResourceActionFailed extends Error {
    constructor(message, status, payload) {
        super();
        this.message = message;
        this.status = status;
        this.payload = payload;
        this.name = 'ResourceActionFailed';
    }
}
exports.ResourceActionFailed = ResourceActionFailed;
class TemporaryUnavailableError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'TemporaryUnavailableError';
    }
}
exports.TemporaryUnavailableError = TemporaryUnavailableError;
class TooManyRequestsError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'TooManyRequestsError';
    }
}
exports.TooManyRequestsError = TooManyRequestsError;
class UnauthorizedError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'UnauthorizedError';
    }
}
exports.UnauthorizedError = UnauthorizedError;
class UnprocessableEntityError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'UnprocessableEntityError';
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;
