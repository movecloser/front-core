"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = exports.composeValidPath = void 0;
const React = require("react");
const react_router_1 = require("react-router");
/**
 * Compose valid router path by trimming trailling slashes & prevent againts
 * any slash duplication.
 */
function composeValidPath(parts) {
    const fullPath = parts.map((p) => p.replace(/^\/+|\/+$/g, '')).join('/');
    return `/${fullPath}`;
}
exports.composeValidPath = composeValidPath;
/**
 * This component renders single module taking guard function into consideration.
 *
 * @author Łukasz Jakubowski <lukasz.jakubowski@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @licence MIT
 */
const Module = (props) => {
    return (React.createElement(props.layout, null,
        React.createElement(react_router_1.Switch, null,
            props.routes.map((r, i) => {
                // Let's determine if we should consider redirection. !NOTE: redirection has higher
                // priority over component.
                let shouldRedirect;
                if (props.useGuards) {
                    // Let's determine if `auth` has access to given Route. There are 2 scenarios:
                    // 1. The booting process hasn't finished, props.auth === undefined
                    // 2. There's no user provided but route has guard method, props.auth === null
                    // 3. The guard method returns false.
                    shouldRedirect = (typeof props.auth === null && typeof r.guard === 'function') || (typeof props.auth !== 'undefined' && typeof r.guard === 'function' &&
                        !r.guard(props.auth));
                }
                else {
                    shouldRedirect = 'redirect' in r && (typeof r.component !== 'function' && typeof r.component !== 'object');
                }
                const fullPath = props.prefix !== '/'
                    ? composeValidPath([props.prefix, r.path]) : r.path;
                return shouldRedirect ? (React.createElement(react_router_1.Redirect, { from: fullPath, to: r.redirect || props.prefix, key: `route-module-${props.prefix}-${i}` })) : (React.createElement(react_router_1.Route, { exact: props.strict, path: fullPath, render: (componentProps) => (
                    // @ts-ignore
                    React.createElement(r.component, Object.assign({}, componentProps))), key: `route-module-${props.prefix}-${i}` }));
            }),
            props.errorPage ? (React.createElement(react_router_1.Route, { component: props.errorPage, key: `route-module-${props.prefix}-error-page` })) : null)));
};
exports.Module = Module;
