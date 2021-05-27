"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProxy = void 0;
/**
 * This helper returns proxified class.
 *
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
function createProxy(target) {
    return new Proxy(target, {
        /* istanbul ignore next */
        apply(target, thisArg, argArray) {
            return target.__invoke(...argArray);
        },
        get(target, p) {
            /* istanbul ignore next */
            if (typeof p === 'symbol')
                return;
            p = String(p);
            /* istanbul ignore next */
            if (p in (Reflect.getPrototypeOf(target) || {}) && !(p in Object.prototype)) {
                return function (...arg) {
                    // @ts-ignore
                    return target[p](...arg);
                };
            }
            return target.__get(p, undefined);
        },
        getOwnPropertyDescriptor(target, name) {
            return {
                value: target.__toObject()[name],
                enumerable: true,
                configurable: true,
            };
        },
        // @ts-ignore
        ownKeys(target) {
            return [...Object.keys(target.__toObject())];
        },
        set(target, p, value) {
            return target.__set(p, value);
        }
    });
}
exports.createProxy = createProxy;
