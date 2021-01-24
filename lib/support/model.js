"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
var errors_1 = require("../exceptions/errors");
/**
 * @author Kuba Fogel <kuba.foge@movecloser.pl>
 * @version 1.0.0
 */
var Model = /** @class */ (function () {
    function Model(payload) {
        if (payload === void 0) { payload = {}; }
        this.initialValues = {};
        this._data = {};
        this.modelProperties = [];
        this.boot();
        for (var _i = 0, _a = Object.entries(payload); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            this.set(key, value);
        }
    }
    /**
     * Model property getter
     * @param property
     */
    Model.prototype.get = function (property) {
        if (!(property in this._data)) {
            throw new errors_1.MissingPropertyError(property);
        }
        return this._data[property];
    };
    /**
     * Method to update incomplete properties on existing model instance
     * @param payload
     */
    Model.hydrate = function (payload) {
        // @ts-ignore
        var model = new this();
        var mappedPayload = __assign(__assign({}, model.initialValues), payload);
        for (var _i = 0, _a = Object.entries(mappedPayload); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            model.set(key, value);
        }
        return model;
    };
    /**
     * Model property setter
     * @param property
     * @param value
     */
    Model.prototype.set = function (property, value) {
        if (this.modelProperties.includes(property)) {
            var upperPropertyName = property.charAt(0).toUpperCase() + property.slice(1);
            var setterMethod = "set" + upperPropertyName + "Property";
            // @ts-ignore
            if (typeof this[setterMethod] === 'function') {
                // @ts-ignore
                this._data[property] = this[setterMethod](value);
                return;
            }
            var relatesMethod = "relatesTo" + upperPropertyName;
            // @ts-ignore
            if (typeof this[relatesMethod] === 'function') {
                // @ts-ignore
                this._data[property] = this[relatesMethod](value);
                return;
            }
            this._data[property] = value;
        }
    };
    /**
     * Method to extract raw data from model
     */
    Model.prototype.toObject = function () {
        return Object.assign(__assign({}, this.initialValues), this._data);
    };
    /**
     * Method to get model related to given property
     * @param model
     * @param value
     * @protected
     */
    Model.prototype.hasOne = function (model, value) {
        return model.hydrate(value);
    };
    /**
     * Method to get collection related to given property
     * @param model
     * @param values
     * @protected
     */
    Model.prototype.hasMany = function (model, values) {
        var collection = [];
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            collection.push(this.hasOne(model, value));
        }
        return collection;
    };
    return Model;
}());
exports.Model = Model;
