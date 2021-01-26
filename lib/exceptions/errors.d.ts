export declare class BadRequestError extends Error {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class ConnectionError extends Error {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class ConflictError extends Error {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class DeprecatedError extends Error {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class IncorrectCall extends Error {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class IncorrectValueError extends Error {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class InternalServerError extends Error {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class MappingError extends Error {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class MissingParameter extends Error {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class MissingPropertyError extends Error {
    key: string;
    message: string;
    name: string;
    constructor(key: string);
}
export declare class NotFoundError extends Error {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class NotImplementedError extends Error {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class PermissionDeniedError extends Error {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class TemporaryUnavailableError extends Error {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class TooManyRequestsError extends Error {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class UnauthorizedError extends Error {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class UnprocessableEntityError extends Error {
    message: string;
    name: string;
    constructor(message: string);
}
