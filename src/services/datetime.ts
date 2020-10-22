import { injectable } from 'inversify'
import { Duration, Moment } from 'moment'
import * as moment from 'moment'
import { IncorrectCall } from '@/exceptions/errors'

export interface IDateTime {
  difference (start: string, end?: string): number
  now: Moment
  nowToFormat (format: string): string
  parse (date: string): Moment
  parseToFormat (date: string, format: string): string
}

/**
 * DateTime is service class that parses Date to wanted format
 *
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
@injectable()
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

    if (typeof end !== 'string' || typeof start !== 'string') {
      throw new IncorrectCall('[difference] method should be called with strings as an arguments')
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
    if (typeof format !== 'string') {
      throw new IncorrectCall('Format should be a string')
    }

    return format.length ? moment().format(format) : moment().format()
  }

  /**
   * Parse date to instance of moment.
   */
  parse (date: string): Moment {
    if (!date || typeof date !== 'string') {
      throw new IncorrectCall('Cannot [parse] when date is not provided')
    }

    return moment(date)
  }

  /**
   * Returns date to specific format.
   */
  parseToFormat (date: string, format: string): string {
    if (!date || typeof date !== 'string') {
      throw new IncorrectCall('Cannot [parseToFormat] when date is not provided')
    }

    if (!format || typeof format !== 'string') {
      throw new IncorrectCall('Cannot [parseToFormat] when format is not provided')
    }
    return moment(date).format(format)
  }
}

export const DateTimeType = Symbol.for('IDateTime')
