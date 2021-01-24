"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VueRouterBootstrapper = void 0;
var VueRouterBootstrapper = /** @class */ (function () {
    function VueRouterBootstrapper(container) {
        this.container = container;
        this._stack = [];
    }
    /**
     * Applies callback to bootstrapper stack.
     */
    VueRouterBootstrapper.prototype.applyModule = function (name, callback) {
        var _this = this;
        var routes = callback(this.container).map(function (route) {
            return _this.prefixRouteName(route, name);
        });
        this._stack = __spreadArrays(this._stack, routes);
    };
    /**
     * Return stack for current bootstrapper.
     */
    VueRouterBootstrapper.prototype.stack = function () {
        return this._stack;
    };
    /**
     * Prefixes the given route's name with the provided string.
     * @param route - The route which `name` property is to be prefixed.
     * @param prefix - The prefix that is to be prepended to the route's `name` property.
     */
    VueRouterBootstrapper.prototype.prefixRouteName = function (route, prefix) {
        var _this = this;
        if (route.hasOwnProperty('name')) {
            route.name = prefix + "." + route.name;
        }
        if (route.children) {
            route.children = route.children.map(function (child) { return _this.prefixRouteName(child, route.name || prefix); });
        }
        return route;
    };
    return VueRouterBootstrapper;
}());
exports.VueRouterBootstrapper = VueRouterBootstrapper;
