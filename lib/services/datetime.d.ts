import { IBaseDateTime } from '../contracts/services';
/**
 * DateTime is service class that parses Date to wanted format
 *
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @author Łukasz Jakubowski <lukasz.jakubowski@movecloser.pl>
 * @version 1.0.0
 */
export declare class DateTime implements IBaseDateTime {
    constructor();
    /**
     * Calculate difference between two dates in sec.
     */
    difference(end: string, start?: string): number;
    /**
     * Return now with given format.
     */
    nowToFormat(format?: string): string;
    /**
     * Returns date to specific format.
     */
    parseToFormat(date: string, format: string): string;
}
