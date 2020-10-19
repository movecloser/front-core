import { Headers, IResponse, List, Payload } from '@/contracts/http'

/**
 * Response class is responsible for delivering response from http request.
 *
 * @author Łukasz sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
export class Response implements IResponse {
  public readonly data: Payload
  public readonly errors: Payload|List|null
  public readonly headers: Headers
  public readonly status: number

  constructor (
    status: number,
    data: Payload,
    headers: Headers = {},
    errors: Payload|List|null = null
  ) {
    this.status = status
    this.data = data
    this.errors = errors
    this.headers = headers
  }

  /**
   * Determine if response has any errors.
   */
  hasErrors (): boolean {
    if (this.errors === null) {
      return false
    }

    return (Array.isArray(this.errors) && this.errors.length > 0) ||
      (typeof this.errors === 'object' && Object.values(this.errors).length > 0)
  }

  /**
   * Determine if response is successful.
   */
  isSuccessful (): boolean {
    return this.status >= 200 && this.status < 300
  }
}
