import { injectable } from 'inversify'

import { FoundResource, IResourcesMiddleware } from '@/contracts/resources'
import { Headers, IResponse, Payload } from '@/contracts/http'
import { IValidation } from '@/contracts/validation'

@injectable()
export class ValidationMiddleware implements IResourcesMiddleware {
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
   * @param response
   */
  public afterCall (response: IResponse): void {
    if (response.status === 422) {
      this.validationService.pushErrors(
        this.formName,
        response.errors !== null ? response.errors.errors : {}
      )
    }
  }

  /**
   * Method to be called before call execution.
   * It can transform headers and body for a given resource.
   * @param resource
   * @param headers
   * @param body
   */
  public beforeCall (resource: FoundResource, headers: Headers, body: Payload) {
    this.formName = resource.shorthand as string
    this.validationService.clearForm(this.formName)

    return { headers, body }
  }
}

export const validationMiddleware: symbol = Symbol.for('ValidationMiddleware')