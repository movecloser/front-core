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
exports.Module = (props) => {
    return (React.createElement(props.layout, null,
        React.createElement(react_router_1.Switch, null,
            props.routes.map((r, i) => {
                // Let's determine if we should consider redirection. !NOTE: redirection has higher
                // priority over component.
                let shouldRedirect = typeof r.component !== 'function' || 'redirect' in r;
                const fullPath = props.prefix !== '/'
                    ? composeValidPath([props.prefix, r.path]) : r.path;
                if (!shouldRedirect && props.useGuards) {
                    // Let's determine if `auth` has access to given Route. There are 2 scenarios:
                    // 1. There's no user provided but route has guard method.
                    // 2. The guard method returns false.
                    shouldRedirect = (typeof props.auth === 'undefined' && typeof r.guard === 'function') || (typeof props.auth !== 'undefined' && typeof r.guard === 'function' &&
                        !r.guard(props.auth));
                }
                return shouldRedirect ? (React.createElement(react_router_1.Redirect, { from: fullPath, to: r.redirect || props.prefix, key: `route-${props.prefix}-${i}` })) : (React.createElement(react_router_1.Route, { exact: true, path: fullPath, render: (componentProps) => (
                    // @ts-ignore
                    React.createElement(r.component, Object.assign({}, componentProps))), key: `route-${props.prefix}-${i}` }));
            }),
            props.errorPage ? (React.createElement(react_router_1.Route, { component: props.errorPage })) : null)));
};
