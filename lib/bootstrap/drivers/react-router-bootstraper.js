"use strict";
// Copyright (c) 2021 Move Closer
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactRouterBootstrapper = void 0;
class ReactRouterBootstrapper {
    constructor(container) {
        this.container = container;
        this._stack = [];
    }
    /**
     * Applies callback to bootstrapper stack.
     */
    applyModule(name, callback) {
        const routes = callback(this.container);
        this._stack.push(routes);
    }
    /**
     * Return stack for current bootstrapper.
     */
    stack() {
        return this._stack;
    }
}
exports.ReactRouterBootstrapper = ReactRouterBootstrapper;
