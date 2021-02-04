import { Payload } from '../contracts'

export class BadRequestError extends Error {
    public name: string = 'BadRequestError'
    constructor (public message: string) {
        super()
    }
}

export class ConnectionError extends Error {
    public name: string = 'ConflictError'
    constructor (public message: string) {
        super()
    }
}

export class ConflictError extends Error {
    public name: string = 'ConflictError'
    constructor (public message: string) {
        super()
    }
}

export class DeprecatedError extends Error {
    public name: string = 'DeprecatedError'
    constructor (public message: string) {
        super()
    }
}

export class IncorrectCall extends Error {
  public name: string = 'IncorrectCall'
  constructor (public message: string) {
    super()
  }
}

export class IncorrectValueError extends Error {
  public name: string = 'IncorrectValueError'
  constructor (public message: string) {
    super()
  }
}

export class InternalServerError extends Error {
    public name: string = 'InternalServerError'
    constructor (public message: string) {
        super()
    }
}

export class MappingError extends Error {
    public name: string = 'MappingError'
    constructor (public message: string) {
        super()
    }
}

export class MissingParameter extends Error {
  public name: string = 'MissingParameter'
  constructor (public message: string) {
    super()
  }
}

export class MissingPropertyError extends Error {
    public message: string = `Key: [${this.key}] not found`
    public name: string = 'MissingPropertyError'
    constructor (public key: string) {
        super()
    }
}

export class NotFoundError extends Error {
    public name: string = 'NotFoundError'
    constructor (public message: string) {
        super()
    }
}

export class NotImplementedError extends Error {
    public name: string = 'NotImplementedError'
    constructor (public message: string) {
        super()
    }
}

export class PermissionDeniedError extends Error {
    public name: string = 'PermissionDeniedError'
    constructor (public message: string) {
        super()
    }
}

export class ResourceActionFailed extends Error {
  public name: string = 'ResourceActionFailed'
  constructor (public message: string, public status: number|string, public payload: Payload = {}) {
    super();
  }
}

export class TemporaryUnavailableError extends Error {
    public name: string = 'TemporaryUnavailableError'
    constructor (public message: string) {
        super()
    }
}

export class TooManyRequestsError extends Error {
    public name: string = 'TooManyRequestsError'
    constructor (public message: string) {
        super()
    }
}

export class UnauthorizedError extends Error {
    public name: string = 'UnauthorizedError'
    constructor (public message: string) {
        super()
    }
}

export class UnprocessableEntityError extends Error {
    public name: string = 'UnprocessableEntityError'
    constructor (public message: string) {
        super()
    }
}
