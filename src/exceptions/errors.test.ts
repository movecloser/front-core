import {
  BadRequestError,
  ConflictError,
  ConnectionError,
  DeprecatedError,
  IncorrectCall,
  IncorrectValueError,
  InternalServerError,
  MappingError,
  MissingParameter,
  MissingPropertyError,
  NotFoundError,
  NotImplementedError,
  PermissionDeniedError,
  ResourceActionFailed,
  TemporaryUnavailableError,
  TooManyRequestsError,
  UnauthorizedError,
  UnprocessableEntityError
} from './errors'

describe('Test error classes', () => {
  test('Expect [BadRequestError] to contain specific message', () => {
    const message = 'Bad Request Error'
    const error = new BadRequestError(message)

    expect(() => {
      throw error
    }).toThrowError(BadRequestError)
    expect(error.message).toBe(message)
  })

  test('Expect [ConnectionError] to contain specific message', () => {
    const message = 'Connection Error'
    const error = new ConnectionError(message)

    expect(() => {
      throw error
    }).toThrowError(ConnectionError)
    expect(error.message).toBe(message)
  })

  test('Expect [ConflictError] to contain specific message', () => {
    const message = 'Conflict Error'
    const error = new ConflictError(message)

    expect(() => {
      throw error
    }).toThrowError(ConflictError)
    expect(error.message).toBe(message)
  })

  test('Expect [DeprecatedError] to contain specific message', () => {
    const message = 'Deprecated Error'
    const error = new DeprecatedError(message)

    expect(() => {
      throw error
    }).toThrowError(DeprecatedError)
    expect(error.message).toBe(message)
  })

  test('Expect [DeprecatedError] to contain specific message', () => {
    const message = 'Deprecated Error'
    const error = new DeprecatedError(message)

    expect(() => {
      throw error
    }).toThrowError(DeprecatedError)
    expect(error.message).toBe(message)
  })

  test('Expect [IncorrectCall] to contain specific message', () => {
    const message = 'IncorrectCall'
    const error = new IncorrectCall(message)

    expect(() => {
      throw error
    }).toThrowError(IncorrectCall)
    expect(error.message).toBe(message)
  })

  test('Expect [IncorrectValueError] to contain specific message', () => {
    const message = 'Incorrect Value Error'
    const error = new IncorrectValueError(message)

    expect(() => {
      throw error
    }).toThrowError(IncorrectValueError)
    expect(error.message).toBe(message)
  })

  test('Expect [InternalServerError] to contain specific message', () => {
    const message = 'Internal Server Error'
    const error = new InternalServerError(message)

    expect(() => {
      throw error
    }).toThrowError(InternalServerError)
    expect(error.message).toBe(message)
  })

  test('Expect [MappingError] to contain specific message', () => {
    const message = 'Mapping Error'
    const error = new MappingError(message)

    expect(() => {
      throw error
    }).toThrowError(MappingError)
    expect(error.message).toBe(message)
  })

  test('Expect [MissingParameter] to contain specific message', () => {
    const message = 'MissingParameter'
    const error = new MissingParameter(message)

    expect(() => {
      throw error
    }).toThrowError(MissingParameter)
    expect(error.message).toBe(message)
  })

  test('Expect [MissingPropertyError] to contain specific message', () => {
    const key = 'value'
    const error = new MissingPropertyError(key)

    expect(() => {
      throw error
    }).toThrowError(MissingPropertyError)
    expect(error.message).toBe(`Key: [${key}] not found`)
  })

  test('Expect [NotFoundError] to contain specific message', () => {
    const message = 'Not Found Error'
    const error = new NotFoundError(message)

    expect(() => {
      throw error
    }).toThrowError(NotFoundError)
    expect(error.message).toBe(message)
  })

  test('Expect [NotImplementedError] to contain specific message', () => {
    const message = 'Not Implemented Error'
    const error = new NotImplementedError(message)

    expect(() => {
      throw error
    }).toThrowError(NotImplementedError)
    expect(error.message).toBe(message)
  })

  test('Expect [PermissionDeniedError] to contain specific message', () => {
    const message = 'Permission Denied Error'
    const error = new PermissionDeniedError(message)

    expect(() => {
      throw error
    }).toThrowError(PermissionDeniedError)
    expect(error.message).toBe(message)
  })

  test('Expect [ResourceActionFailed] to contain specific message', () => {
    const message = 'Resource Action Failed'
    const status = '200'
    const payload = {
      test: true
    }
    const error = new ResourceActionFailed(message, status, payload)

    expect(() => {
      throw error
    }).toThrowError(ResourceActionFailed)
    expect(error.message).toBe(message)
    expect(error.payload).toEqual(payload)
  })

  test('Expect [TemporaryUnavailableError] to contain specific message', () => {
    const message = 'Temporary Unavailable Error'
    const error = new TemporaryUnavailableError(message)

    expect(() => {
      throw error
    }).toThrowError(TemporaryUnavailableError)
    expect(error.message).toBe(message)
  })

  test('Expect [TooManyRequestsError] to contain specific message', () => {
    const message = 'TooMany Requests Error'
    const error = new TooManyRequestsError(message)

    expect(() => {
      throw error
    }).toThrowError(TooManyRequestsError)
    expect(error.message).toBe(message)
  })

  test('Expect [UnauthorizedError] to contain specific message', () => {
    const message = 'Unauthorized Error'
    const error = new UnauthorizedError(message)

    expect(() => {
      throw error
    }).toThrowError(UnauthorizedError)
    expect(error.message).toBe(message)
  })

  test('Expect [UnprocessableEntityError] to contain specific message', () => {
    const message = 'Unprocessable Entity Error'
    const error = new UnprocessableEntityError(message)

    expect(() => {
      throw error
    }).toThrowError(UnprocessableEntityError)
    expect(error.message).toBe(message)
  })
})
