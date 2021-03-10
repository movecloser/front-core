import { FiltersConfig, QueryParams, QueryParserSeparators } from '../contracts/filter-parser';
/**
 * Compose QueryParams from FiltersConfig.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 */
export declare function composeQueryParams(filters: FiltersConfig, separators?: QueryParserSeparators, trimEmptyValues?: boolean): QueryParams;
/**
 * Parse QueryParams to FiltersConfig.
 *
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 */
export declare function parseQueryParams(query: QueryParams, separators?: QueryParserSeparators): FiltersConfig;
