"use strict";
// Copyright (c) 2021 Move Closer
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapModel = exports.mapIntention = exports.mapCollection = void 0;
const isObject = require("lodash/isObject");
const merge = require("lodash/merge");
const support_1 = require("../contracts/support");
const errors_1 = require("../exceptions/errors");
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
function mapCollection(toMap, mapping, preserve = true) {
    return toMap.map((item) => {
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
    const mapped = {};
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
function mapModel(toMap, mapping, preserve = true) {
    const mapped = {};
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
    if (typeof item !== 'object' || item === null) {
        return;
    }
    Object.keys(item).forEach(key => {
        if (item[key] && typeof item[key] === 'object' && !Array.isArray(item[key])) {
            mapped[key] = merge(mapped[key], item[key]);
        }
        else {
            mapped[key] = item[key];
        }
    });
    for (const [key, instruction] of Object.entries(mapping)) {
        if (typeof instruction === 'string') {
            if (isObject(item[key])) {
                mapped[key] = merge(mapped[key], item[instruction]);
            }
            else {
                mapped[key] = item[instruction];
            }
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
                case support_1.MappingTypes.Self:
                case support_1.MappingTypes.Adapter:
                    const mappingInstruction = instruction.type === support_1.MappingTypes.Self ? mapping : instruction.map;
                    if (typeof mappingInstruction === 'undefined' || typeof instruction.value !== 'string') {
                        throw new errors_1.MappingError('Invalid instruction. Map in not a MappingConfig or value is not a string.');
                    }
                    if (item[instruction.value] === undefined) {
                        console.debug(`Adapter is SKIPPING field. Key [${instruction.value}] is not present in provided item: `, item);
                        continue;
                    }
                    if (Array.isArray(item[instruction.value])) {
                        mapped[key] = [];
                        for (const i in item[instruction.value]) {
                            if (!item[instruction.value].hasOwnProperty(i))
                                continue;
                            mapped[key][i] = {};
                            mapByConfig(mapped[key][i], item[instruction.value][i], mappingInstruction, preserve);
                        }
                    }
                    else {
                        mapped[key] = {};
                        mapByConfig(mapped[key], item[instruction.value], mappingInstruction, preserve);
                    }
                    if (!preserve) {
                        if (key === instruction.value) {
                            continue;
                        }
                        delete mapped[instruction.value];
                    }
                    continue;
                case support_1.MappingTypes.Function:
                    if (typeof instruction.value !== 'function') {
                        throw new errors_1.MappingError('Invalid instruction. Value is not a function.');
                    }
                    const callbackFunction = instruction.value;
                    mapped[key] = callbackFunction(item);
                    if (!preserve && instruction.source) {
                        if (key === instruction.source) {
                            continue;
                        }
                        delete mapped[instruction.source];
                    }
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
    for (const [key, value] of Object.entries(item)) {
        if (!mapping.hasOwnProperty(key) || mapping[key] === 'undefined' || mapping[key] === null) {
            continue;
        }
        const instruction = mapping[key];
        if (typeof instruction === 'string') {
            mapped[instruction] = value;
            continue;
        }
        if (typeof instruction === 'object' && instruction !== null) {
            const { value, map, target, type } = instruction;
            if (typeof target !== 'string') {
                throw new errors_1.MappingError('Invalid instruction. Missing target.');
            }
            switch (type) {
                case support_1.MappingTypes.Self:
                case support_1.MappingTypes.Adapter:
                    const mappingInstruction = type === support_1.MappingTypes.Self ? mapping : map;
                    if (typeof mappingInstruction === 'undefined' || typeof value !== 'string') {
                        throw new errors_1.MappingError('Invalid instruction. Map in not a MappingConfig or value is not a string.');
                    }
                    if (item[value] === undefined) {
                        console.debug(`Adapter is SKIPPING field. Key [${value}] is not present in provided item: `, item);
                        continue;
                    }
                    if (Array.isArray(item[value])) {
                        mapped[target] = [];
                        for (const i in item[value]) {
                            if (!item[value].hasOwnProperty(i))
                                continue;
                            mapped[target][i] = {};
                            mapByStructure(mapped[target][i], item[value][i], mappingInstruction);
                        }
                    }
                    else {
                        mapped[target] = {};
                        mapByStructure(mapped[target], item[value], mappingInstruction);
                    }
                    continue;
                case support_1.MappingTypes.Function:
                    if (typeof value !== 'function') {
                        throw new errors_1.MappingError('Invalid instruction. Value is not a function.');
                    }
                    const callbackFunction = value;
                    mapped[target] = callbackFunction(item);
                    continue;
            }
        }
        throw new errors_1.MappingError('Invalid mapping instruction type given.');
    }
}
