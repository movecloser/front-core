import { Duration, Moment } from 'moment'
import * as moment from 'moment'

import { IDateTime } from '@/contracts/services'

import { IncorrectCall } from '@/exceptions/errors'
import { Injectable } from '@/container'

/**
 * DateTime is service class that parses Date to wanted format
 *
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
@Injectable()
export class DateTime implements IDateTime {
  constructor () {
    moment.locale('pl')
  }

  /**
   * Calculate difference between two dates in sec.
   */
  difference (end: string, start: string = ''): number {
    if (!end) {
      throw new IncorrectCall('Cannot calculate difference when specific date is not provided')
    }

    const startDate: Moment = start.length ? moment(start) : moment()
    const endDate: Moment = moment(end)

    const duration: Duration = moment.duration(endDate.diff(startDate))
    return duration.asSeconds()
  }

  /**
   * Return now in moment.
   */
  get now (): Moment {
    return moment()
  }

  /**
   * Return now with given format.
   */
  nowToFormat (format: string = ''): string {
    return format.length ? moment().format(format) : moment().format()
  }

  /**
   * Parse date to instance of moment.
   */
  parse (date: string): Moment {
    return moment(date)
  }

  /**
   * Returns date to specific format.
   */
  parseToFormat (date: string, format: string): string {
    return moment(date).format(format)
  }
}
