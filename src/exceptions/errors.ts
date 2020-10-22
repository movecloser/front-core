class KernelError {
    constructor () {
        //@ts-ignore;
        Error.apply(this, arguments)
    }
}

KernelError.prototype = new Error();

export class BadRequestError extends KernelError {
    public name: string = 'BadRequestError'
    constructor (public message: string) {
        super()
    }
}

export class ConflictError extends KernelError {
    public name: string = 'ConflictError'
    constructor (public message: string) {
        super()
    }
}

export class DeprecatedError extends KernelError {
    public name: string = 'DeprecatedError'
    constructor (public message: string) {
        super()
    }
}

export class IncorrectCall extends KernelError {
  public name: string = 'IncorrectCall'
  constructor (public message: string) {
    super()
  }
}

export class IncorrectValueError extends KernelError {
  public name: string = 'IncorrectValueError'
  constructor (public message: string) {
    super()
  }
}

export class InternalServerError extends KernelError {
    public name: string = 'InternalServerError'
    constructor (public message: string) {
        super()
    }
}

export class MappingError extends KernelError {
    public name: string = 'MappingError'
    constructor (public message: string) {
        super()
    }
}

export class MissingParameter extends KernelError {
  public name: string = 'MissingParameter'
  constructor (public message: string) {
    super()
  }
}

export class MissingPropertyError extends KernelError {
    public message: string = `Key: [${this.key}] not found`
    public name: string = 'MissingPropertyError'
    constructor (public key: string) {
        super()
    }
}

export class NotFoundError extends KernelError {
    public name: string = 'NotFoundError'
    constructor (public message: string) {
        super()
    }
}

export class NotImplementedError extends KernelError {
    public name: string = 'NotImplementedError'
    constructor (public message: string) {
        super()
    }
}

export class PermissionDeniedError extends KernelError {
    public name: string = 'PermissionDeniedError'
    constructor (public message: string) {
        super()
    }
}

export class TemporaryUnavailableError extends KernelError {
    public name: string = 'TemporaryUnavailableError'
    constructor (public message: string) {
        super()
    }
}

export class TooManyRequestsError extends KernelError {
    public name: string = 'TooManyRequestsError'
    constructor (public message: string) {
        super()
    }
}

export class UnauthorizedError extends KernelError {
    public name: string = 'UnauthorizedError'
    constructor (public message: string) {
        super()
    }
}

export class UnprocessableEntityError extends KernelError {
    public name: string = 'UnprocessableEntityError'
    constructor (public message: string) {
        super()
    }
}
