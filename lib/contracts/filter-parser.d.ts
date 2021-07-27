export declare enum ConjunctionOperator {
    Or = "or",
    And = "and"
}
export declare type Filter = string | number | boolean | FilterParams | FilterParams[];
export declare enum FilterOperator {
    Equal = "eq",
    GreaterEqual = "ge",
    GreaterThan = "gt",
    LessEqual = "le",
    LessThan = "lt",
    Like = "lk",
    NotLike = "nl",
    NotEqual = "ne"
}
export interface FilterParams {
    conjunction?: ConjunctionOperator;
    operator?: FilterOperator;
    value: string | number | boolean;
}
export interface FiltersConfig {
    [key: string]: Filter;
}
export interface QueryParams {
    [key: string]: string | boolean | number | undefined;
}
export interface QueryParserSeparators {
    operators: string;
    values: string;
}
