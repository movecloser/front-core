"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableEntityError = exports.UnauthorizedError = exports.TooManyRequestsError = exports.TemporaryUnavailableError = exports.PermissionDeniedError = exports.NotImplementedError = exports.NotFoundError = exports.MissingPropertyError = exports.MissingParameter = exports.MappingError = exports.InternalServerError = exports.IncorrectValueError = exports.IncorrectCall = exports.DeprecatedError = exports.ConflictError = exports.ConnectionError = exports.BadRequestError = void 0;
class KernelError {
    constructor() {
        //@ts-ignore;
        Error.apply(this, arguments);
    }
}
KernelError.prototype = new Error();
class BadRequestError extends KernelError {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'BadRequestError';
    }
}
exports.BadRequestError = BadRequestError;
class ConnectionError extends KernelError {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'ConflictError';
    }
}
exports.ConnectionError = ConnectionError;
class ConflictError extends KernelError {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'ConflictError';
    }
}
exports.ConflictError = ConflictError;
class DeprecatedError extends KernelError {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'DeprecatedError';
    }
}
exports.DeprecatedError = DeprecatedError;
class IncorrectCall extends KernelError {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'IncorrectCall';
    }
}
exports.IncorrectCall = IncorrectCall;
class IncorrectValueError extends KernelError {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'IncorrectValueError';
    }
}
exports.IncorrectValueError = IncorrectValueError;
class InternalServerError extends KernelError {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'InternalServerError';
    }
}
exports.InternalServerError = InternalServerError;
class MappingError extends KernelError {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'MappingError';
    }
}
exports.MappingError = MappingError;
class MissingParameter extends KernelError {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'MissingParameter';
    }
}
exports.MissingParameter = MissingParameter;
class MissingPropertyError extends KernelError {
    constructor(key) {
        super();
        this.key = key;
        this.message = `Key: [${this.key}] not found`;
        this.name = 'MissingPropertyError';
    }
}
exports.MissingPropertyError = MissingPropertyError;
class NotFoundError extends KernelError {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
class NotImplementedError extends KernelError {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'NotImplementedError';
    }
}
exports.NotImplementedError = NotImplementedError;
class PermissionDeniedError extends KernelError {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'PermissionDeniedError';
    }
}
exports.PermissionDeniedError = PermissionDeniedError;
class TemporaryUnavailableError extends KernelError {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'TemporaryUnavailableError';
    }
}
exports.TemporaryUnavailableError = TemporaryUnavailableError;
class TooManyRequestsError extends KernelError {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'TooManyRequestsError';
    }
}
exports.TooManyRequestsError = TooManyRequestsError;
class UnauthorizedError extends KernelError {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'UnauthorizedError';
    }
}
exports.UnauthorizedError = UnauthorizedError;
class UnprocessableEntityError extends KernelError {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'UnprocessableEntityError';
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;
