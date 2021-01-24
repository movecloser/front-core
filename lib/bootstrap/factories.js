"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeFactory = exports.routerFactory = void 0;
var bootstrapper_1 = require("../contracts/bootstrapper");
var none_bootstrapper_1 = require("./drivers/none-bootstrapper");
var vue_router_bootstrapper_1 = require("./drivers/vue-router-bootstrapper");
var vuex_bootstrapper_1 = require("./drivers/vuex-bootstrapper");
/**
 * Decide which of predefined router driver to use.
 */
exports.routerFactory = function (routerType, container) {
    switch (routerType) {
        case bootstrapper_1.RouterDriver.VueRouter:
            return new vue_router_bootstrapper_1.VueRouterBootstrapper(container);
        case bootstrapper_1.RouterDriver.None:
            return new none_bootstrapper_1.NoneBootstrapper();
        default:
            throw new Error("Unsupported router driver [" + routerType + "].");
    }
};
/**
 * Decide which of predefined store driver to use.
 */
exports.storeFactory = function (storeType, container) {
    switch (storeType) {
        case bootstrapper_1.StoreDriver.Vuex:
            return new vuex_bootstrapper_1.VuexBootstrapper(container);
        case bootstrapper_1.StoreDriver.None:
            return new none_bootstrapper_1.NoneBootstrapper();
        default:
            throw new Error("Unsupported store driver [" + storeType + "].");
    }
};
