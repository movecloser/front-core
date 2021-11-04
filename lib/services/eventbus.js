"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eventbus = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const container_1 = require("../container");
/**
 * Eventbus based on RxJS.
 *
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
let Eventbus = class Eventbus {
    constructor() {
        const event = { name: 'app:started' };
        this._stream$ = new rxjs_1.BehaviorSubject(event);
    }
    /**
     * Emit new event to bus.
     */
    emit(name, payload = null) {
        let eventData = { name };
        if (payload !== null) {
            eventData.payload = payload;
        }
        this._stream$.next(eventData);
        if (process.env.APP_EVENT_LOG === 'true') {
            /* eslint no-console: off */
            console.info(`Event: ${name}`, payload);
        }
    }
    /**
     * Register new observer.
     */
    observe(observer) {
        return this._stream$.subscribe((event) => {
            const index = observer.observableEvents;
            if (index.hasOwnProperty(event.name) && typeof index[event.name] !== 'undefined') {
                const method = index[event.name];
                if (typeof observer[method] === 'function') {
                    observer[method](event.payload);
                }
            }
        });
    }
    /**
     * Handle event of type.
     */
    handle(name, callback) {
        return this._stream$.pipe((0, operators_1.filter)((event) => event.name === name)).subscribe(/* istanbul ignore next */ (event) => {
            /* istanbul ignore next */
            setTimeout(() => callback(event), 1);
        });
    }
    /**
     * Handle event of type only once.
     */
    handleOnce(name, callback) {
        return this._stream$.pipe((0, operators_1.first)((event) => event.name === name)).subscribe(/* istanbul ignore next */ (event) => {
            setTimeout(() => callback(event), 1);
        });
    }
};
Eventbus = __decorate([
    (0, container_1.Injectable)()
], Eventbus);
exports.Eventbus = Eventbus;
