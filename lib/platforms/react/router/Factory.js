"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = void 0;
const React = require("react");
const react_router_1 = require("react-router");
const Module_1 = require("./Module");
/**
 * This component uses provided map to print out a module routing.
 *
 * @author Łukasz Jakubowski <lukasz.jakubowski@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @licence MIT
 */
function Factory(props) {
    const moduleRoutes = props.moduleRoutes.filter((m) => {
        if (!props.useGuards)
            return true;
        // Let's determine if auth has an access to the module. If not we cannot register
        // it's routing.
        return typeof props.auth !== 'undefined' && m.accessor
            ? props.auth.canAccess(m.accessor) : false;
    });
    return (React.createElement(react_router_1.Switch, null, moduleRoutes.map((m, i) => {
        return (React.createElement(react_router_1.Route, { key: `route-${i}`, path: m.prefix },
            React.createElement(Module_1.Module, { prefix: m.prefix, layout: m.layout, routes: m.routes, auth: props.auth, useGuards: props.useGuards, errorPage: props.errorPage })));
    })));
}
exports.Factory = Factory;
