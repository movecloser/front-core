"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VuexBootstrapper = void 0;
var VuexBootstrapper = /** @class */ (function () {
    function VuexBootstrapper(container) {
        this.container = container;
        this._stack = {};
    }
    /**
     * Applies callback to bootstrapper stack.
     * @param name
     * @param callback
     */
    VuexBootstrapper.prototype.applyModule = function (name, callback) {
        Object.assign(this._stack, { name: callback(this.container) });
    };
    /**
     * Return stack for current bootstrapper.
     */
    VuexBootstrapper.prototype.stack = function () {
        return this._stack;
    };
    return VuexBootstrapper;
}());
exports.VuexBootstrapper = VuexBootstrapper;
