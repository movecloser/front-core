"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpConnector = void 0;
var container_1 = require("../container");
var errors_1 = require("../exceptions/errors");
/**
 * Http Connector is service class that provides http functionality.
 *
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
var HttpConnector = /** @class */ (function () {
    function HttpConnector(constructors, defaultDestination) {
        if (constructors === void 0) { constructors = {}; }
        if (defaultDestination === void 0) { defaultDestination = null; }
        this._drivers = {};
        this._defaultDestination = defaultDestination;
        for (var _i = 0, _a = Object.entries(constructors); _i < _a.length; _i++) {
            var _b = _a[_i], name_1 = _b[0], fn = _b[1];
            this._drivers[name_1] = fn();
        }
    }
    /**
     * Return default destination.
     */
    HttpConnector.prototype.defaultDestination = function () {
        if (!this._defaultDestination) {
            throw new errors_1.IncorrectCall('Default destination is not set. Cannot perform action when driver is not selected.');
        }
        return this._defaultDestination;
    };
    /**
     * Perform delete http request.
     */
    HttpConnector.prototype.delete = function (target, data, headers, options) {
        if (data === void 0) { data = {}; }
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = null; }
        return this.defaultDriver.delete(target, data, headers, options);
    };
    /**
     * Return instance of requested destination driver.
     * @param destination
     */
    HttpConnector.prototype.destination = function (destination) {
        if (!this._drivers.hasOwnProperty(destination)) {
            throw new errors_1.IncorrectCall("HttpConnector has no driver matching given destination [" + destination + "] defined.");
        }
        return this._drivers[destination];
    };
    /**
     * Perform get http request.
     */
    HttpConnector.prototype.get = function (target, params, headers, options) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = null; }
        return this.defaultDriver.get(target, params, headers, options);
    };
    /**
     * Perform post http request.
     */
    HttpConnector.prototype.post = function (target, data, headers, options) {
        if (data === void 0) { data = {}; }
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = null; }
        return this.defaultDriver.post(target, data, headers, options);
    };
    /**
     * Perform put http request.
     */
    HttpConnector.prototype.put = function (target, data, headers, options) {
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = null; }
        return this.defaultDriver.put(target, data, headers, options);
    };
    /**
     * Registering new destination.
     * @param name
     * @param driver
     * @param setAsDefault
     */
    HttpConnector.prototype.register = function (name, driver, setAsDefault) {
        if (setAsDefault === void 0) { setAsDefault = false; }
        if (this._drivers.hasOwnProperty(name)) {
            throw new errors_1.IncorrectCall("Destination with name: [" + name + "], has been already registered.");
        }
        if (!driver) {
            throw new errors_1.IncorrectCall("Cannot register destination without driver specified.");
        }
        this._drivers[name] = driver;
        if (setAsDefault) {
            this.setDefaultDestination(name);
        }
    };
    /**
     * Setter for default destination field.
     * Value cannot be override during runtime.
     *
     * @param name
     */
    HttpConnector.prototype.setDefaultDestination = function (name) {
        if (this._defaultDestination !== null) {
            throw new errors_1.IncorrectCall('Default destination already set. Cannot overwrite.');
        }
        if (!name) {
            throw new errors_1.IncorrectCall('Cannot set default destination without name specified.');
        }
        if (!this._drivers.hasOwnProperty(name)) {
            throw new errors_1.IncorrectCall("Cannot set default destination [" + name + "] that hasn't been registered.");
        }
        this._defaultDestination = name;
    };
    Object.defineProperty(HttpConnector.prototype, "defaultDriver", {
        /**
         *
         * @private
         */
        get: function () {
            if (!this._defaultDestination) {
                throw new errors_1.IncorrectCall('Default destination is not set. Cannot perform action when driver is not selected.');
            }
            return this._drivers[this._defaultDestination];
        },
        enumerable: false,
        configurable: true
    });
    HttpConnector = __decorate([
        container_1.Injectable()
    ], HttpConnector);
    return HttpConnector;
}());
exports.HttpConnector = HttpConnector;
