"use strict";
// Copyright (c) 2021 Move Closer
Object.defineProperty(exports, "__esModule", { value: true });
exports.VuexBootstrapper = void 0;
class VuexBootstrapper {
    constructor(container) {
        this.container = container;
        this._stack = {};
    }
    /**
     * Applies callback to bootstrapper stack.
     * @param name
     * @param callback
     */
    applyModule(name, callback) {
        Object.assign(this._stack, { [name]: callback(this.container) });
    }
    /**
     * Return stack for current bootstrapper.
     */
    stack() {
        return this._stack;
    }
}
exports.VuexBootstrapper = VuexBootstrapper;
