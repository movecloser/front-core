"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const proxy_1 = require("./proxy");
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
            this.__set(key, value);
        }
    }
    /**
     * Create instance of Model with Proxy involved.
     * @param payload
     */
    static create(payload = {}) {
        return proxy_1.createProxy(
        // @ts-ignore
        new this(payload));
    }
    /**
     * @author Łukasz Jakubowski <lukasz.jakubowski@movecloser.pl>
     *
     * @template T, Payload - model type, intention payload
     *
     * @param [intention] {IIntention<Payload>}
     * @returns {IModel<T>}
     */
    applyIntention(intention) {
        const toModel = intention.toModel();
        for (const key in toModel) {
            if (!toModel.hasOwnProperty(key))
                continue;
            if (!this.modelProperties.includes(key)) {
                console.warn(`Trying to assign incompatible intention property ${key} to ${this.constructor.name}`);
                continue;
            }
            this._data[key] = toModel[key];
        }
    }
    /**
     * @author Łukasz Jakubowski <lukasz.jakubowski@movecloser.pl>
     *
     * @template T, - model type
     *
     * @returns {IModel<T>}
     */
    clone() {
        // @ts-ignore
        return new this.constructor(JSON.parse(JSON.stringify(this._data)));
    }
    /**
     * Model property getter
     * @param property
     * @param defaultValue
     */
    get(property, defaultValue = null) {
        return this.__get(property, defaultValue);
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
        return proxy_1.createProxy(model);
    }
    /**
     * Model property setter
     * @param property
     * @param value
     */
    set(property, value) {
        return this.__set(property, value);
    }
    /**
     * Method to extract raw data from model
     */
    toObject() {
        return this.__toObject();
    }
    /**
     * Return value for given property due to it's accessor.
     */
    __get(property, defaultValue) {
        if (!(property in this._data)) {
            return defaultValue;
        }
        return this._data[property];
    }
    /**
     * Throws when someone trying to invoke class.
     */
    /* istanbul ignore next */
    __invoke(...data) {
        throw new Error('Model cannot be invoked.');
    }
    /**
     * Set value for given property due to additional helper mutators.
     */
    __set(property, value) {
        if (this.modelProperties.includes(property)) {
            const upperPropertyName = property.charAt(0).toUpperCase() + property.slice(1);
            const setterMethod = `set${upperPropertyName}Property`;
            // @ts-ignore
            if (typeof this[setterMethod] === 'function') {
                // @ts-ignore
                this._data[property] = this[setterMethod](value);
                return true;
            }
            const relatesMethod = `relatesTo${upperPropertyName}`;
            // @ts-ignore
            if (typeof this[relatesMethod] === 'function') {
                // @ts-ignore
                this._data[property] = this[relatesMethod](value);
                return true;
            }
            this._data[property] = value;
        }
        return false;
    }
    /**
     * Method to extract raw data from model
     */
    __toObject() {
        const target = Object.assign({}, this.initialValues);
        for (const [key, value] of Object.entries(this._data)) {
            // TODO: Test it.
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
            // TODO: Test it.
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
        if (Array.isArray(values)) {
            for (const value of values) {
                collection.push(this.hasOne(model, value));
            }
        }
        return collection;
    }
}
exports.Model = Model;
