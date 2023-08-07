// Copyright (c) 2021 Move Closer

import * as dayjs from 'dayjs'

import { IBaseDateTime } from '../contracts/services'
import { Injectable } from '../container'

/**
 * DateTime is service class that parses Date to wanted format
 *
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @author Łukasz Jakubowski <lukasz.jakubowski@movecloser.pl>
 * @version 1.0.0
 */
@Injectable()
export class DateTime implements IBaseDateTime {
  constructor () {
    dayjs.locale('pl')
  }

  /**
   * Calculate difference between two dates in sec.
   */
  difference (end: string, start: string = ''): number {
    const startDate = start.length ? dayjs(start) : dayjs()
    const endDate = dayjs(end)

    return endDate.diff(startDate, 'second')
  }

  /**
   * Return now with given format.
   */
  nowToFormat (format: string = ''): string {
    return format.length ? dayjs().format(format) : dayjs().format()
  }

  /**
   * Returns date to specific format.
   */
  parseToFormat (date: string, format: string): string {
    return dayjs(date).format(format)
  }
}
