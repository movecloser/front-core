// Copyright (c) 2021 Move Closer

import { Duration, Moment } from 'moment'
import * as moment from 'moment'

import { ILegacyDateTime } from '../contracts/services'
import { Injectable } from '../container'

/**
 * DateTime is service class that parses Date to wanted format
 *
 * @deprecated since version 1.2.0
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
@Injectable()
export class LegacyDateTime implements ILegacyDateTime {
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
  parse (date: string, format?: string): Moment {
    return moment(date, format)
  }

  /**
   * Returns date to specific format.
   */
  parseToFormat (date: string, format: string): string {
    return moment(date).format(format)
  }
}
