"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamBus = void 0;
var errors_1 = require("../exceptions/errors");
var container_1 = require("../container");
/**
 * Provides access to stream based bus channels.
 *
 * @author  Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 */
var StreamBus = /** @class */ (function () {
    function StreamBus(streams) {
        this._registry = {};
        for (var _i = 0, _a = Object.entries(streams); _i < _a.length; _i++) {
            var _b = _a[_i], n = _b[0], f = _b[1];
            this.register(n, f);
        }
    }
    StreamBus.prototype.get = function (stream) {
        if (!this._registry.hasOwnProperty(stream)) {
            throw new errors_1.IncorrectValueError("Stream [" + stream + "] does not exist.");
        }
        return this._registry[stream];
    };
    StreamBus.prototype.register = function (stream, factory, force) {
        if (force === void 0) { force = false; }
        if (this._registry.hasOwnProperty(stream) && !force) {
            throw new errors_1.IncorrectValueError("Stream [" + stream + "] already exists.");
        }
        this._registry[stream] = factory();
        return true;
    };
    StreamBus.prototype.unregister = function (stream) {
        if (!this._registry.hasOwnProperty(stream)) {
            return false;
        }
        return delete this._registry[stream];
    };
    StreamBus = __decorate([
        container_1.Injectable()
    ], StreamBus);
    return StreamBus;
}());
exports.StreamBus = StreamBus;
