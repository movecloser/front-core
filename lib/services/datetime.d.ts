import { Moment } from 'moment';
import { IDateTime } from '../contracts/services';
/**
 * DateTime is service class that parses Date to wanted format
 *
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
export declare class DateTime implements IDateTime {
    constructor();
    /**
     * Calculate difference between two dates in sec.
     */
    difference(end: string, start?: string): number;
    /**
     * Return now in moment.
     */
    get now(): Moment;
    /**
     * Return now with given format.
     */
    nowToFormat(format?: string): string;
    /**
     * Parse date to instance of moment.
     */
    parse(date: string): Moment;
    /**
     * Returns date to specific format.
     */
    parseToFormat(date: string, format: string): string;
}
