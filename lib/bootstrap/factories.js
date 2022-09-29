"use strict";
// Copyright (c) 2021 Move Closer
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeFactory = exports.routerFactory = void 0;
const bootstrapper_1 = require("../contracts/bootstrapper");
const none_bootstrapper_1 = require("./drivers/none-bootstrapper");
const react_router_bootstraper_1 = require("./drivers/react-router-bootstraper");
const vue_router_bootstrapper_1 = require("./drivers/vue-router-bootstrapper");
const vuex_bootstrapper_1 = require("./drivers/vuex-bootstrapper");
/**
 * Decide which of predefined router driver to use.
 */
/* istanbul ignore next */
const routerFactory = (routerType, container, configuration) => {
    switch (routerType) {
        case bootstrapper_1.RouterDriver.VueRouter:
            return new vue_router_bootstrapper_1.VueRouterBootstrapper(container, configuration);
        case bootstrapper_1.RouterDriver.ReactRouter:
            return new react_router_bootstraper_1.ReactRouterBootstrapper(container, configuration);
        case bootstrapper_1.RouterDriver.None:
            return new none_bootstrapper_1.NoneBootstrapper();
        default:
            throw new Error(`Unsupported router driver [${routerType}].`);
    }
};
exports.routerFactory = routerFactory;
/**
 * Decide which of predefined store driver to use.
 */
/* istanbul ignore next */
const storeFactory = (storeType, container, configuration) => {
    switch (storeType) {
        case bootstrapper_1.StoreDriver.Vuex:
            return new vuex_bootstrapper_1.VuexBootstrapper(container, configuration);
        case bootstrapper_1.StoreDriver.None:
            return new none_bootstrapper_1.NoneBootstrapper();
        default:
            throw new Error(`Unsupported store driver [${storeType}].`);
    }
};
exports.storeFactory = storeFactory;
