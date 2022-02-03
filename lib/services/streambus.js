"use strict";
// Copyright (c) 2021 Move Closer
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamBus = void 0;
const errors_1 = require("../exceptions/errors");
const container_1 = require("../container");
/**
 * Provides access to stream based bus channels.
 *
 * @author  Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 */
let StreamBus = class StreamBus {
    constructor(streams) {
        this._registry = {};
        for (const [n, f] of Object.entries(streams)) {
            this.register(n, f);
        }
    }
    get(stream) {
        if (!this._registry.hasOwnProperty(stream)) {
            throw new errors_1.IncorrectValueError(`Stream [${stream}] does not exist.`);
        }
        return this._registry[stream];
    }
    register(stream, factory, force = false) {
        if (this._registry.hasOwnProperty(stream) && !force) {
            throw new errors_1.IncorrectValueError(`Stream [${stream}] already exists.`);
        }
        this._registry[stream] = factory();
        return true;
    }
    unregister(stream) {
        if (!this._registry.hasOwnProperty(stream)) {
            return false;
        }
        return delete this._registry[stream];
    }
};
StreamBus = __decorate([
    (0, container_1.Injectable)()
], StreamBus);
exports.StreamBus = StreamBus;
