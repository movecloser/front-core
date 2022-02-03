"use strict";
// Copyright (c) 2021 Move Closer
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
class Configuration {
    constructor(config) {
        this.config = config;
    }
    /**
     * Returns file (top level section) of configuration.
     * @param name
     */
    byFile(name) {
        if (!this.config[name]) {
            throw new Error(`Key [${name}] is not a valid config key.`);
        }
        return this.config[name];
    }
    /**
     *  Provides access to config by given key.
     *  Key is string consisting of keys connected by dots.
     *  'http.base.url' or 'router.mode'
     */
    byKey(key, shouldThrow = true, defaultValue = null) {
        if (key.length === 0) {
            throw new Error('Given key is empty.');
        }
        let foundValue = this.config;
        const keys = key.split('.');
        for (const k of keys) {
            if (foundValue && foundValue.hasOwnProperty(k) && typeof foundValue[k] !== 'undefined') {
                foundValue = foundValue[k];
                continue;
            }
            if (shouldThrow) {
                throw new Error(`Key [${k}] is not a valid config key.`);
            }
            foundValue = defaultValue;
            break;
        }
        return foundValue;
    }
    /**
     * Returns true if given filename exists in config's top level structure.
     */
    has(file) {
        return file in this.config;
    }
    /**
     * Returns complete configuration as single object.
     */
    toObject() {
        return this.config;
    }
}
exports.Configuration = Configuration;
