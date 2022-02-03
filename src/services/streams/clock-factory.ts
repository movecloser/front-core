// Copyright (c) 2021 Move Closer

import { interval, Observable } from 'rxjs'

export const clockStreamFactory = function (): Observable<number> {
  return interval(1000)
}
