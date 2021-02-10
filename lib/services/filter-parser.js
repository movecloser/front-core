"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQueryParams = exports.composeQueryParams = void 0;
const filter_parser_1 = require("../contracts/filter-parser");
const errors_1 = require("../exceptions/errors");
/**
 * Compose QueryParams from FiltersConfig.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 */
const composeQueryParams = (filters, separators = defaultSeparators) => {
    let result = {};
    for (const key of Object.keys(filters)) {
        const config = filters[key];
        if (config === null || config === 'undefined') {
            throw new errors_1.IncorrectValueError('Filter value must be defined');
        }
        switch (typeof config) {
            case 'string':
                result[key] = `${config}`;
                continue;
            case 'boolean':
                result[key] = config ? 1 : 0;
                continue;
            case 'number':
                result[key] = config;
                continue;
            case 'object':
                if (!Array.isArray(config)) {
                    result[key] = stringifyFilter(config, separators.operators);
                }
                else {
                    result[key] = config.map((params) => stringifyFilter(params, separators.operators)).join(separators.values);
                }
                continue;
            default:
                throw new errors_1.IncorrectValueError('Provided filters config does not match with FiltersConfig interface');
        }
    }
    return result;
};
exports.composeQueryParams = composeQueryParams;
/**
 * Parse QueryParams to FiltersConfig.
 *
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 */
const parseQueryParams = (query, separators = defaultSeparators) => {
    let result = {};
    for (const [key, value] of Object.entries(query)) {
        result[key] = parseFilter(String(value).split(separators.values), separators.operators);
    }
    return result;
};
exports.parseQueryParams = parseQueryParams;
const defaultSeparators = {
    operators: ':',
    values: ','
};
const parseFilter = (filters, separator) => {
    const decomposeFilter = (filter) => {
        const parts = filter.split(separator);
        if (parts.length === 1) {
            return parseValue(parts[0]);
        }
        const params = { value: '' };
        for (const part of parts) {
            if (Object.values(filter_parser_1.ConjunctionOperator).includes(part)) {
                params.conjunction = part;
                continue;
            }
            if (Object.values(filter_parser_1.FilterOperator).includes(part)) {
                params.operator = part;
                continue;
            }
            params.value = parseValue(part);
        }
        return params;
    };
    const parseValue = (value) => {
        return isNaN(Number(value)) ? value : Number(value);
    };
    if (filters.length > 1) {
        return filters.map((filter) => {
            const decoded = decomposeFilter(filter);
            return typeof decoded === 'object'
                ? decoded : { value: decoded, conjunction: filter_parser_1.ConjunctionOperator.Or };
        });
    }
    return decomposeFilter(filters.length ? filters[0] : '');
};
const stringifyFilter = (config, separator) => {
    let filterString = '';
    if (!config.hasOwnProperty('operator') || !config.hasOwnProperty('value')) {
        throw new errors_1.MissingParameter('Keys [operator] and [value] are required.');
    }
    if (config.value === null || config.value === 'undefined') {
        throw new errors_1.IncorrectValueError('Filter value must be defined');
    }
    filterString = `${config['operator']}${separator}${config['value']}`;
    if (config.hasOwnProperty('conjunction')) {
        filterString = `${config['conjunction']}${separator}${filterString}`;
    }
    return filterString;
};
