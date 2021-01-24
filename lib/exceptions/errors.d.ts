declare class KernelError {
    constructor();
}
export declare class BadRequestError extends KernelError {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class ConnectionError extends KernelError {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class ConflictError extends KernelError {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class DeprecatedError extends KernelError {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class IncorrectCall extends KernelError {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class IncorrectValueError extends KernelError {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class InternalServerError extends KernelError {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class MappingError extends KernelError {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class MissingParameter extends KernelError {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class MissingPropertyError extends KernelError {
    key: string;
    message: string;
    name: string;
    constructor(key: string);
}
export declare class NotFoundError extends KernelError {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class NotImplementedError extends KernelError {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class PermissionDeniedError extends KernelError {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class TemporaryUnavailableError extends KernelError {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class TooManyRequestsError extends KernelError {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class UnauthorizedError extends KernelError {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class UnprocessableEntityError extends KernelError {
    message: string;
    name: string;
    constructor(message: string);
}
export {};
