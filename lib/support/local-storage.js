"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = void 0;
var window_1 = require("../services/window");
/**
 * @author Stanisław Gregor <stanislaw.gregor@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
    }
    /**
     * Resolves the value for the given key.
     * Returns 'null' if the key is not set.
     */
    LocalStorage.prototype.get = function (key) {
        if (!window_1.WindowService.isDefined) {
            return null;
        }
        return window.localStorage.getItem(key);
    };
    /**
     * Checks if the given key has ever been set.
     */
    LocalStorage.prototype.isSet = function (key) {
        if (!window_1.WindowService.isDefined) {
            return false;
        }
        return window.localStorage.getItem(key) !== null;
    };
    /**
     * Removes this value the given key.
     */
    LocalStorage.prototype.remove = function (key) {
        if (!window_1.WindowService.isDefined) {
            return;
        }
        window.localStorage.removeItem(key);
    };
    /**
     * Sets the value for the given key.
     */
    LocalStorage.prototype.set = function (key, value) {
        if (window_1.WindowService.isDefined) {
            window.localStorage.setItem(key, value);
        }
    };
    return LocalStorage;
}());
exports.LocalStorage = LocalStorage;
exports.default = LocalStorage;
