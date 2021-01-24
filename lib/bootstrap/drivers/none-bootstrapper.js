"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoneBootstrapper = void 0;
var NoneBootstrapper = /** @class */ (function () {
    function NoneBootstrapper() {
    }
    /**
     * Applies callback to bootstrapper stack.
     */
    NoneBootstrapper.prototype.applyModule = function (name, callback) { };
    /**
     * Return stack for current bootstrapper.
     */
    NoneBootstrapper.prototype.stack = function () {
        return [];
    };
    return NoneBootstrapper;
}());
exports.NoneBootstrapper = NoneBootstrapper;
