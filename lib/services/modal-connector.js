"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalConnector = void 0;
const rxjs_1 = require("rxjs");
const container_1 = require("../container");
let ModalConnector = class ModalConnector {
    constructor(registry) {
        this._registry = registry;
        this._stream$ = new rxjs_1.BehaviorSubject({
            component: null,
            opened: false,
            payload: {}
        });
        this._stream$.subscribe((state) => {
            this._state = state;
        });
    }
    /**
     *
     * @param key
     */
    close(key = null) {
        if (key === null || !key.length || this._state.component === key) {
            this._stream$.next({
                component: null,
                opened: false,
                payload: {}
            });
        }
        this.unlockScroll();
    }
    /**
     *
     */
    component() {
        if (this._state.component === null) {
            throw new Error('Modal is not opened. Check if [isOpened] before calling for modal component.');
        }
        if (!this._registry.hasOwnProperty(this._state.component)) {
            throw new Error(`Unregistered modal component [${this._state.component}]`);
        }
        return this._registry[this._state.component];
    }
    /**
     *
     */
    get isOpened() {
        return this._state.opened && this._state.component !== null;
    }
    /**
     *
     */
    get name() {
        return this._state.component;
    }
    /**
     *
     // * @param key
     * @param payload
     */
    open(key, payload = {}) {
        if (!this._registry.hasOwnProperty(key)) {
            throw new Error(`Unregistered modal component [${key}]`);
        }
        this._stream$.next({
            component: key,
            opened: true,
            payload: payload
        });
        this.lockScroll();
    }
    /**
     *
     * @param key
     * @param promise
     * @param payload
     */
    openAsync(key, promise, payload = {}) {
        if (!this._registry.hasOwnProperty(key)) {
            throw new Error(`Unregistered modal component [${key}]`);
        }
        promise.then(() => {
            this._stream$.next({
                component: key,
                opened: true,
                payload: payload
            });
        });
    }
    /**
     *
     */
    get payload() {
        return this._state.payload;
    }
    /**
     *
     * @param callback
     */
    subscribe(callback) {
        this._stream$.subscribe((state) => {
            callback(state);
        });
    }
    /**
     * Locks the window's scroll.
     * @private
     *
     * @author Stanisław Gregor <stanislaw.gregor@movecloser.pl>
     */
    lockScroll() {
        /* istanbul ignore else */
        if (typeof window !== 'undefined') {
            document.body.style.overflowY = 'hidden';
        }
    }
    /**
     * Unlocks the window's scroll.
     * @private
     *
     * @author Stanisław Gregor <stanislaw.gregor@movecloser.pl>
     */
    unlockScroll() {
        /* istanbul ignore else */
        if (typeof window !== 'undefined') {
            document.body.style.overflowY = 'auto';
        }
    }
};
ModalConnector = __decorate([
    container_1.Injectable()
], ModalConnector);
exports.ModalConnector = ModalConnector;
exports.default = ModalConnector;
