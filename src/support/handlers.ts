import { Handler, IResponse } from '@/contracts/http'
import { IEventbus } from '@/contracts/eventbus'

function notFoundhandler (response: IResponse, eventbus: IEventbus): void {
  if (!response.isSuccessful() && response.status === 404) {
    if (typeof window === 'undefined') {
      throw new Error('HTTP404')
    } else {
      eventbus.emit('http:exceptions.404')
    }
  }
}

export const httpHandlers: Handler[] = [
  notFoundhandler
]

export default httpHandlers
