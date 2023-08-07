import { Moment } from 'moment';
import { ILegacyDateTime } from '../contracts/services';
/**
 * DateTime is service class that parses Date to wanted format
 *
 * @deprecated since version 1.2.0
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
export declare class LegacyDateTime implements ILegacyDateTime {
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
    parse(date: string, format?: string): Moment;
    /**
     * Returns date to specific format.
     */
    parseToFormat(date: string, format: string): string;
}
