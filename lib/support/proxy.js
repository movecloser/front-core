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
            if (p in Reflect.getPrototypeOf(target)) {
                return function (...arg) {
                    // @ts-ignore
                    return target[p](...arg);
                };
            }
            return target.__get(p);
        },
        getOwnPropertyDescriptor(target) {
            return {
                value: target.__toObject(),
                enumerable: true,
                configurable: true
            };
        },
        ownKeys(target) {
            return [...Object.keys(target.__toObject())];
        },
        set(target, p, value) {
            return target.__set(p, value);
        }
    });
}
exports.createProxy = createProxy;
