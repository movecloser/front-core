import { fromEvent, Observable } from 'rxjs'

export const windowStreamFactory = function (): Observable<Event> {
  return fromEvent(window, 'scroll')
}
