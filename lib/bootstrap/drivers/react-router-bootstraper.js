"use strict";
// Copyright (c) 2022 Move Closer
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactRouterBootstrapper = void 0;
class ReactRouterBootstrapper {
    constructor(container, configuration) {
        this.container = container;
        this.configuration = configuration;
        this._stack = [];
    }
    /**
     * Applies callback to bootstrapper stack.
     */
    applyModule(name, callback) {
        const routes = callback(this.container, this.configuration);
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
