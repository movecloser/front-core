"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const errors_1 = require("../exceptions/errors");
/**
 * @author Kuba Fogel <kuba.foge@movecloser.pl>
 * @version 1.0.0
 */
class Model {
    constructor(payload = {}) {
        this.initialValues = {};
        this._data = {};
        this.modelProperties = [];
        this.boot();
        for (const [key, value] of Object.entries(payload)) {
            this.set(key, value);
        }
    }
    /**
     * Model property getter
     * @param property
     */
    get(property) {
        if (!(property in this._data)) {
            throw new errors_1.MissingPropertyError(property);
        }
        return this._data[property];
    }
    /**
     * Method to update incomplete properties on existing model instance
     * @param payload
     */
    static hydrate(payload) {
        // @ts-ignore
        const model = new this();
        const mappedPayload = Object.assign(Object.assign({}, model.initialValues), payload);
        for (const [key, value] of Object.entries(mappedPayload)) {
            model.set(key, value === undefined ? model.initialValues[key] : value);
        }
        return model;
    }
    /**
     * Model property setter
     * @param property
     * @param value
     */
    set(property, value) {
        if (this.modelProperties.includes(property)) {
            const upperPropertyName = property.charAt(0).toUpperCase() + property.slice(1);
            const setterMethod = `set${upperPropertyName}Property`;
            // @ts-ignore
            if (typeof this[setterMethod] === 'function') {
                // @ts-ignore
                this._data[property] = this[setterMethod](value);
                return;
            }
            const relatesMethod = `relatesTo${upperPropertyName}`;
            // @ts-ignore
            if (typeof this[relatesMethod] === 'function') {
                // @ts-ignore
                this._data[property] = this[relatesMethod](value);
                return;
            }
            this._data[property] = value;
        }
    }
    /**
     * Method to extract raw data from model
     */
    toObject() {
        const target = Object.assign({}, this.initialValues);
        for (const [key, value] of Object.entries(this._data)) {
            if (Array.isArray(value)) {
                const collection = [];
                for (const element of value) {
                    if (element instanceof Model) {
                        collection.push(element.toObject());
                    }
                    else {
                        collection.push(element);
                    }
                }
                target[key] = collection;
                continue;
            }
            if (value instanceof Model) {
                target[key] = value.toObject();
                continue;
            }
            target[key] = value;
        }
        return target;
    }
    /**
     * Method to get model related to given property
     * @param model
     * @param value
     * @protected
     */
    hasOne(model, value) {
        return model.hydrate(value);
    }
    /**
     * Method to get collection related to given property
     * @param model
     * @param values
     * @protected
     */
    hasMany(model, values) {
        const collection = [];
        for (const value of values) {
            collection.push(this.hasOne(model, value));
        }
        return collection;
    }
}
exports.Model = Model;
