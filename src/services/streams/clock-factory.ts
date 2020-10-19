import { interval, Observable } from 'rxjs'

export const clockStreamFactory = function (): Observable<number> {
  return interval(1000)
}
