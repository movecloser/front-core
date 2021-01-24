"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapModel = exports.mapIntention = exports.mapCollection = void 0;
var support_1 = require("../contracts/support");
var errors_1 = require("../exceptions/errors");
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
/* istanbul ignore next */
function mapCollection(toMap, mapping, preserve) {
    if (preserve === void 0) { preserve = true; }
    return toMap.map(function (item) {
        return mapModel(item, mapping, preserve);
    });
}
exports.mapCollection = mapCollection;
/**
 * Converts Intention object to format required by server side.
 * @param toMap
 * @param mapping
 */
function mapIntention(toMap, mapping) {
    var mapped = {};
    mapByStructure(mapped, toMap, mapping);
    return mapped;
}
exports.mapIntention = mapIntention;
/**
 * Convert single Model object
 *
 * @param mapping
 * @param {Object} toMap.
 * @param preserve
 * @return Object
 */
function mapModel(toMap, mapping, preserve) {
    if (preserve === void 0) { preserve = true; }
    var mapped = {};
    mapByConfig(mapped, toMap, mapping, preserve);
    return mapped;
}
exports.mapModel = mapModel;
/**
 * Provides mapping based on {type} given in config.
 * Operates on single objects (collections are fired in loop)
 * Is called internally by methods: Model and Collection
 * Instructions should be prepared in this manned:
 *  [as it should be]: [as it is]
 *
 * @return Array
 * @param mapped
 * @param mapping
 * @param item
 * @param preserve
 */
function mapByConfig(mapped, item, mapping, preserve) {
    Object.keys(item).forEach(function (key) {
        mapped[key] = item[key];
    });
    for (var _i = 0, _a = Object.entries(mapping); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], instruction = _b[1];
        if (typeof instruction === 'string') {
            mapped[key] = item[instruction];
            if (!preserve) {
                if (key === instruction) {
                    continue;
                }
                delete mapped[instruction];
            }
            continue;
        }
        if (typeof instruction === 'object' && instruction !== null) {
            switch (instruction.type) {
                case support_1.MappingTypes.Adapter:
                    if (typeof instruction.map === 'undefined' || typeof instruction.value !== 'string') {
                        throw new errors_1.MappingError('Invalid instruction. Map in not a MappingConfig or value is not a string.');
                    }
                    mapByConfig(mapped[key], item[instruction.value], instruction.map, false);
                    continue;
                case support_1.MappingTypes.Function:
                    if (typeof instruction.value !== 'function') {
                        throw new errors_1.MappingError('Invalid instruction. Value is not a function.');
                    }
                    var callbackFunction = instruction.value;
                    mapped[key] = callbackFunction(item);
                    continue;
            }
        }
        throw new errors_1.MappingError('Invalid mapping instruction type given.');
    }
}
/**
 * Provides mapping based on items initial structure. This mapping works
 * in opposite way than mapByConfig. Instructions should be prepared in this manned:
 *  [as it is]: [as it should be]
 *
 * @return Array
 * @param mapped
 * @param mapping
 * @param item
 */
function mapByStructure(mapped, item, mapping) {
    for (var _i = 0, _a = Object.entries(item); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (!mapping.hasOwnProperty(key) || mapping[key] === 'undefined' || mapping[key] === null) {
            continue;
        }
        var instruction = mapping[key];
        if (typeof instruction === 'string') {
            mapped[instruction] = value;
        }
        else {
            if (typeof instruction.value !== 'function') {
                throw new errors_1.MappingError('Invalid instruction. Value is not a function.');
            }
            if (typeof instruction.target !== 'string') {
                throw new errors_1.MappingError('Invalid instruction. Missing target.');
            }
            var callbackFunction = instruction.value;
            mapped[instruction.target] = callbackFunction(item);
        }
    }
}
