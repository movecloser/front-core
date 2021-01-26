"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeFactory = exports.routerFactory = void 0;
const bootstrapper_1 = require("../contracts/bootstrapper");
const none_bootstrapper_1 = require("./drivers/none-bootstrapper");
const vue_router_bootstrapper_1 = require("./drivers/vue-router-bootstrapper");
const vuex_bootstrapper_1 = require("./drivers/vuex-bootstrapper");
/**
 * Decide which of predefined router driver to use.
 */
/* istanbul ignore next */
exports.routerFactory = (routerType, container) => {
    switch (routerType) {
        case bootstrapper_1.RouterDriver.VueRouter:
            return new vue_router_bootstrapper_1.VueRouterBootstrapper(container);
        case bootstrapper_1.RouterDriver.None:
            return new none_bootstrapper_1.NoneBootstrapper();
        default:
            throw new Error(`Unsupported router driver [${routerType}].`);
    }
};
/**
 * Decide which of predefined store driver to use.
 */
/* istanbul ignore next */
exports.storeFactory = (storeType, container) => {
    switch (storeType) {
        case bootstrapper_1.StoreDriver.Vuex:
            return new vuex_bootstrapper_1.VuexBootstrapper(container);
        case bootstrapper_1.StoreDriver.None:
            return new none_bootstrapper_1.NoneBootstrapper();
        default:
            throw new Error(`Unsupported store driver [${storeType}].`);
    }
};
