"use strict";
// Copyright (c) 2021 Move Closer
Object.defineProperty(exports, "__esModule", { value: true });
exports.VueRouterBootstrapper = void 0;
class VueRouterBootstrapper {
    constructor(container, configuration) {
        this.container = container;
        this.configuration = configuration;
        this._stack = [];
    }
    /**
     * Applies callback to bootstrapper stack.
     */
    applyModule(name, callback) {
        const routes = callback(this.container, this.configuration).map((route) => {
            return this.prefixRouteName(route, name);
        });
        this._stack = [
            ...this._stack,
            ...routes
        ];
    }
    /**
     * Return stack for current bootstrapper.
     */
    stack() {
        return this._stack;
    }
    /**
     * Prefixes the given route's name with the provided string.
     * @param route - The route which `name` property is to be prefixed.
     * @param prefix - The prefix that is to be prepended to the route's `name` property.
     */
    prefixRouteName(route, prefix) {
        if (route.hasOwnProperty('name')) {
            route.name = `${prefix}.${route.name}`;
        }
        if (route.children) {
            route.children = route.children.map((child) => this.prefixRouteName(child, route.name || prefix));
        }
        return route;
    }
}
exports.VueRouterBootstrapper = VueRouterBootstrapper;
