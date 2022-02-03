// Copyright (c) 2021 Move Closer

import { FoundResource, ConnectorMiddleware } from '../../contracts/connector'
import { Headers, IResponse, Payload } from '../../contracts/http'
import { IValidation } from '../../contracts/validation'

import { Injectable } from '../../container'

@Injectable()
export class ValidationMiddleware implements ConnectorMiddleware {
  /**
   * Name of form used in given request.
   * @protected
   */
  protected formName: string = ''

  /**
   * Injected validation service.
   * @protected
   */
  protected validationService: IValidation

  /**
   * Class Constructor.
   * @param validationService
   */
  constructor (validationService: IValidation) {
    this.validationService = validationService
  }

  /**
   * Method to be called after call execution.
   * It handles side effects.
   */
  public afterCall (response: IResponse): void {
    if (response.status === 422 && response.errors !== null) {
      this.validationService.pushErrors(
        this.formName,
        typeof response.errors.errors === 'object'
          ? response.errors.errors : {},
        typeof response.errors.message === 'string' ? response.errors.message : null
      )
    }
  }

  /**
   * Method to be called before call execution.
   * It can transform headers and body for a given resource.
   */
  public beforeCall (resource: FoundResource, headers: Headers, body: Payload) {
    this.formName = resource.shorthand as string
    this.validationService.clearForm(this.formName)

    return { headers, body }
  }
}
