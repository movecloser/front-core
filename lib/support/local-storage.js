"use strict";
// Copyright (c) 2021 Move Closer
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = void 0;
/* istanbul ignore file */
// TODO: add tests and remove ignore
const window_1 = require("../services/window");
/**
 * @author Stanisław Gregor <stanislaw.gregor@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 2.0.0
 * @licence MIT
 */
class LocalStorage {
    /**
     * Resolves the value for the given key.
     * Returns 'null' if the key is not set.
     */
    static get(key) {
        if (!window_1.WindowService.isDefined) {
            return null;
        }
        return window.localStorage.getItem(key);
    }
    /**
     * Checks if the given key has ever been set.
     */
    static isSet(key) {
        if (!window_1.WindowService.isDefined) {
            return false;
        }
        return window.localStorage.getItem(key) !== null;
    }
    /**
     * Removes this value the given key.
     */
    static remove(key) {
        if (!window_1.WindowService.isDefined) {
            return;
        }
        window.localStorage.removeItem(key);
    }
    /**
     * Sets the value for the given key.
     */
    static set(key, value) {
        if (window_1.WindowService.isDefined) {
            window.localStorage.setItem(key, value);
        }
    }
}
exports.LocalStorage = LocalStorage;
exports.default = LocalStorage;
