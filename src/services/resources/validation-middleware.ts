import { FoundResource, IResourcesMiddleware } from '@/contracts/resources'
import { Headers, IResponse, Payload } from '@/contracts/http'
import { IValidation } from '@/contracts/validation'

export class ValidationMiddleware implements IResourcesMiddleware {
  protected formName: string = ''

  protected validationService: IValidation

  constructor (validationService: IValidation) {
    this.validationService = validationService
  }

  public afterCall (response: IResponse): void {
    if (response.status === 422) {
      this.validationService.pushErrors(
        this.formName,
        response.errors !== null ? response.errors.errors : {}
      )
    }
  }

  public beforeCall (resource: FoundResource, headers: Headers, body: Payload) {
    this.formName = resource.shorthand as string
    this.validationService.clearForm(this.formName)

    return { headers, body }
  }
}
