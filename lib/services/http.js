/*
 * Copyright (c) 2021 Move Closer
 */

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpConnector = void 0;
const container_1 = require("../container");
const errors_1 = require("../exceptions/errors");
/**
 * Http Connector is service class that provides http functionality.
 *
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
let HttpConnector = class HttpConnector {
    constructor(constructors = {}, defaultDestination = null) {
        this._drivers = {};
        this._defaultDestination = defaultDestination;
        for (const [name, fn] of Object.entries(constructors)) {
            this._drivers[name] = fn();
        }
    }
    /**
     * Return default destination.
     */
    defaultDestination() {
        if (!this._defaultDestination) {
            throw new errors_1.IncorrectCall('Default destination is not set. Cannot perform action when driver is not selected.');
        }
        return this._defaultDestination;
    }
    /**
     * Perform delete http request.
     */
    delete(target, data = {}, headers = {}, options = null) {
        return this.defaultDriver.delete(target, data, headers, options);
    }
    /**
     * Return instance of requested destination driver.
     * @param destination
     */
    destination(destination) {
        if (!this._drivers.hasOwnProperty(destination)) {
            throw new errors_1.IncorrectCall(`HttpConnector has no driver matching given destination [${destination}] defined.`);
        }
        return this._drivers[destination];
    }
    /**
     * Perform get http request.
     */
    get(target, params = {}, headers = {}, options = null) {
        return this.defaultDriver.get(target, params, headers, options);
    }
    /**
     * Perform post http request.
     */
    post(target, data = {}, headers = {}, options = null) {
        return this.defaultDriver.post(target, data, headers, options);
    }
    /**
     * Perform put http request.
     */
    put(target, data, headers = {}, options = null) {
        return this.defaultDriver.put(target, data, headers, options);
    }
    /**
     * Registering new destination.
     * @param name
     * @param driver
     * @param setAsDefault
     */
    register(name, driver, setAsDefault = false) {
        if (this._drivers.hasOwnProperty(name)) {
            throw new errors_1.IncorrectCall(`Destination with name: [${name}], has been already registered.`);
        }
        if (!driver) {
            throw new errors_1.IncorrectCall(`Cannot register destination without driver specified.`);
        }
        this._drivers[name] = driver;
        if (setAsDefault) {
            this.setDefaultDestination(name);
        }
    }
    /**
     * Setter for default destination field.
     * Value cannot be override during runtime.
     *
     * @param name
     */
    setDefaultDestination(name) {
        if (this._defaultDestination !== null) {
            throw new errors_1.IncorrectCall('Default destination already set. Cannot overwrite.');
        }
        if (!name) {
            throw new errors_1.IncorrectCall('Cannot set default destination without name specified.');
        }
        if (!this._drivers.hasOwnProperty(name)) {
            throw new errors_1.IncorrectCall(`Cannot set default destination [${name}] that hasn't been registered.`);
        }
        this._defaultDestination = name;
    }
    /**
     *
     * @private
     */
    get defaultDriver() {
        if (!this._defaultDestination) {
            throw new errors_1.IncorrectCall('Default destination is not set. Cannot perform action when driver is not selected.');
        }
        return this._drivers[this._defaultDestination];
    }
};
HttpConnector = __decorate([
    (0, container_1.Injectable)()
], HttpConnector);
exports.HttpConnector = HttpConnector;
