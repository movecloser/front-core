"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const errors_1 = require("../exceptions/errors");
const parse = (filters) => {
    let result = {};
    for (const key of Object.keys(filters)) {
        const config = filters[key];
        const configType = typeof config;
        if (config === null || config === 'undefined') {
            throw new errors_1.IncorrectValueError('Filter value must be defined');
        }
        if (configType === 'string') {
            result[key] = `${config}`;
            continue;
        }
        if (configType === 'boolean') {
            result[key] = config ? 1 : 0;
            continue;
        }
        if (configType === 'number') {
            // @ts-ignore
            result[key] = config;
            continue;
        }
        if (configType === 'object' && !Array.isArray(config)) {
            // @ts-ignore
            result[key] = parseFilterParams(config);
            continue;
        }
        if (configType === 'object' && Array.isArray(config)) {
            result[key] = config.map((params) => parseFilterParams(params)).join(',');
            continue;
        }
        throw new errors_1.IncorrectValueError('Provided filters config does not match with FiltersConfig interface');
    }
    return result;
};
exports.parse = parse;
const parseFilterParams = (config) => {
    let filterString = '';
    if (!config.hasOwnProperty('operator') || !config.hasOwnProperty('value')) {
        throw new errors_1.MissingParameter('Keys [operator] and [value] are required.');
    }
    if (config.value === null || config.value === 'undefined') {
        throw new errors_1.IncorrectValueError('Filter value must be defined');
    }
    filterString = `${config['operator']}:${config['value']}`;
    if (config.hasOwnProperty('conjunction')) {
        filterString = `${config['conjunction']}:${filterString}`;
    }
    return filterString;
};
