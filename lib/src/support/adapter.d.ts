import { MappingConfig } from '../contracts/support';
/**
 * Adapter to connect api response with data model required by frontend
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 */
/**
 * Convert array of Model objects
 *
 * @param mapping
 * @param {Array} toMap
 * @param preserve
 * @return Array
 */
export declare function mapCollection<T>(toMap: any[], mapping: MappingConfig, preserve?: boolean): T[];
/**
 * Converts Intention object to format required by server side.
 * @param toMap
 * @param mapping
 */
export declare function mapIntention<T>(toMap: any, mapping: MappingConfig): T;
/**
 * Convert single Model object
 *
 * @param mapping
 * @param {Object} toMap.
 * @param preserve
 * @return Object
 */
export declare function mapModel<T>(toMap: any, mapping: MappingConfig, preserve?: boolean): T;
