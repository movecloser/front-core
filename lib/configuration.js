"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
/**
 * Configuration is config files holder.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
var Configuration = /** @class */ (function () {
    function Configuration(config) {
        this.config = config;
    }
    /**
     * Returns file (top level section) of configuration.
     * @param name
     */
    Configuration.prototype.byFile = function (name) {
        if (!this.config[name]) {
            throw new Error("Key [" + name + "] is not a valid config key.");
        }
        return this.config[name];
    };
    /**
     *  Provides access to config by given key.
     *  Key is string consisting of keys connected by dots.
     *  'http.base.url' or 'router.mode'
     */
    Configuration.prototype.byKey = function (key, shouldThrow, defaultValue) {
        if (shouldThrow === void 0) { shouldThrow = true; }
        if (defaultValue === void 0) { defaultValue = null; }
        if (key.length === 0) {
            throw new Error('Given key is empty.');
        }
        var foundValue = this.config;
        var keys = key.split('.');
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var k = keys_1[_i];
            if (foundValue.hasOwnProperty(k) && typeof foundValue[k] !== 'undefined') {
                foundValue = foundValue[key];
                continue;
            }
            if (shouldThrow) {
                throw new Error("Key [" + k + "] is not a valid config key.");
            }
            foundValue = defaultValue;
            break;
        }
        return foundValue;
    };
    /**
     * Returns true if given filename exists in config's top level structure.
     */
    Configuration.prototype.has = function (file) {
        return file in this.config;
    };
    /**
     * Returns complete configuration as single object.
     */
    Configuration.prototype.toObject = function () {
        return this.config;
    };
    return Configuration;
}());
exports.Configuration = Configuration;
