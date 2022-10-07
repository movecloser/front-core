"use strict";
// Copyright (c) 2022 Move Closer
Object.defineProperty(exports, "__esModule", { value: true });
exports.VuexBootstrapper = void 0;
class VuexBootstrapper {
    constructor(container, configuration) {
        this.container = container;
        this.configuration = configuration;
        this._stack = {};
    }
    /**
     * Applies callback to bootstrapper stack.
     * @param name
     * @param callback
     */
    applyModule(name, callback) {
        Object.assign(this._stack, { [name]: callback(this.container, this.configuration) });
    }
    /**
     * Return stack for current bootstrapper.
     */
    stack() {
        return this._stack;
    }
}
exports.VuexBootstrapper = VuexBootstrapper;
