import { injectable } from 'inversify'
import moment, { Duration, Moment } from 'moment'

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

export const DateTimeType = Symbol.for('IDateTime')
