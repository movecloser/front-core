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
    const hasGlobalPrefix = typeof props.globalPrefix === 'string' || false;
    return (React.createElement(react_router_1.Switch, null, [...props.moduleRoutes.map((m, i) => {
            // We should consider if there's a global prefix set & if module
            // is skipping it or not.
            const prefix = hasGlobalPrefix && !Boolean(m.skipGlobalPrefix)
                ? Module_1.composeValidPath([props.globalPrefix, m.prefix]) : m.prefix;
            const strict = typeof m.strict === 'boolean' ? m.strict : true;
            return (React.createElement(react_router_1.Route, { key: `route-${i}`, path: prefix },
                React.createElement(Module_1.Module, { prefix: prefix, layout: m.layout, routes: m.routes, auth: props.auth, useGuards: props.useGuards, strict: strict, errorPage: props.errorPage })));
        }), React.createElement(react_router_1.Redirect, { key: `route-fallback`, to: props.fallBackUrl || '/' })]));
}
exports.Factory = Factory;
