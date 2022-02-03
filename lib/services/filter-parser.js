"use strict";
// Copyright (c) 2021 Move Closer
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQueryParams = exports.composeQueryParams = void 0;
const filter_parser_1 = require("../contracts/filter-parser");
const errors_1 = require("../exceptions/errors");
const defaultSeparators = {
    operators: ':',
    values: ','
};
/**
 * Compose QueryParams from FiltersConfig.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 */
function composeQueryParams(filters, separators = defaultSeparators, trimEmptyValues = true) {
    let result = {};
    for (const key of Object.keys(filters)) {
        const config = filters[key];
        if (config === null || config === 'undefined') {
            throw new errors_1.IncorrectValueError('Filter value must be defined');
        }
        switch (typeof config) {
            case 'string':
                if (trimEmptyValues && !String(config).length)
                    continue;
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
                    if (trimEmptyValues && !String(config.value).length)
                        continue;
                    result[key] = stringifyFilter(config, separators.operators);
                }
                else {
                    const toSet = config.filter((params) => trimEmptyValues ? String(params.value).length : true).map((params) => stringifyFilter(params, separators.operators)).join(separators.values);
                    if (trimEmptyValues && !toSet)
                        continue;
                    result[key] = toSet;
                }
                continue;
            default:
                throw new errors_1.IncorrectValueError('Provided filters config does not match with FiltersConfig interface');
        }
    }
    return result;
}
exports.composeQueryParams = composeQueryParams;
/**
 * Parse QueryParams to FiltersConfig.
 *
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 */
function parseQueryParams(query, separators = defaultSeparators) {
    let result = {};
    for (const [key, value] of Object.entries(query)) {
        result[key] = parseFilter(String(value).split(separators.values), separators.operators);
    }
    return result;
}
exports.parseQueryParams = parseQueryParams;
function parseFilter(filters, separator) {
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
}
function stringifyFilter(config, separator, trimEqual = false) {
    let filterString = '';
    if (!config.hasOwnProperty('operator') || !config.hasOwnProperty('value')) {
        throw new errors_1.MissingParameter('Keys [operator] and [value] are required.');
    }
    if (config.value === null || config.value === 'undefined' || config.value === '') {
        throw new errors_1.IncorrectValueError('Filter value must be defined');
    }
    filterString = `${config['value']}`;
    if (config['operator'] !== filter_parser_1.FilterOperator.Equal || !trimEqual) {
        filterString = `${config['operator']}${separator}${filterString}`;
    }
    if (config.hasOwnProperty('conjunction')) {
        filterString = `${config['conjunction']}${separator}${filterString}`;
    }
    return filterString;
}
