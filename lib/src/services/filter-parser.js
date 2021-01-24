"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
var errors_1 = require("../exceptions/errors");
exports.parse = function (filters) {
    var result = {};
    for (var _i = 0, _a = Object.keys(filters); _i < _a.length; _i++) {
        var key = _a[_i];
        var config = filters[key];
        var configType = typeof config;
        if (config === null || config === 'undefined') {
            throw new errors_1.IncorrectValueError('Filter value must be defined');
        }
        if (configType === 'string') {
            result[key] = "" + config;
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
            result[key] = config.map(function (params) { return parseFilterParams(params); }).join(',');
            continue;
        }
        throw new errors_1.IncorrectValueError('Provided filters config does not match with FiltersConfig interface');
    }
    return result;
};
var parseFilterParams = function (config) {
    var filterString = '';
    if (!config.hasOwnProperty('operator') || !config.hasOwnProperty('value')) {
        throw new errors_1.MissingParameter('Keys [operator] and [value] are required.');
    }
    if (config.value === null || config.value === 'undefined') {
        throw new errors_1.IncorrectValueError('Filter value must be defined');
    }
    filterString = config['operator'] + ":" + config['value'];
    if (config.hasOwnProperty('conjunction')) {
        filterString = config['conjunction'] + ":" + filterString;
    }
    return filterString;
};
