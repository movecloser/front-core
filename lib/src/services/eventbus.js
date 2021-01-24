"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eventbus = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var container_1 = require("../container");
/**
 * Eventbus based on RxJS.
 *
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
var Eventbus = /** @class */ (function () {
    function Eventbus() {
        var event = { name: 'app:started' };
        this._stream$ = new rxjs_1.BehaviorSubject(event);
    }
    /**
     * Emit new event to bus.
     */
    Eventbus.prototype.emit = function (name, payload) {
        if (payload === void 0) { payload = null; }
        var eventData = { name: name };
        if (payload !== null) {
            eventData.payload = payload;
        }
        this._stream$.next(eventData);
        if (process.env.APP_EVENT_LOG === 'true') {
            /* eslint no-console: off */
            console.info("Event: " + name, payload);
        }
    };
    /**
     * Register new observer.
     */
    Eventbus.prototype.observe = function (observer) {
        return this._stream$.subscribe(function (event) {
            var index = observer.observableEvents;
            if (index.hasOwnProperty(event.name) && typeof index[event.name] !== 'undefined') {
                var method = index[event.name];
                if (typeof observer[method] === 'function') {
                    observer[method](event.payload);
                }
            }
        });
    };
    /**
     * Handle event of type.
     */
    Eventbus.prototype.handle = function (name, callback) {
        return this._stream$.pipe(operators_1.filter(function (event) { return event.name === name; })).subscribe(/* istanbul ignore next */ function (event) {
            /* istanbul ignore next */
            setTimeout(function () { return callback(event); }, 1);
        });
    };
    /**
     * Handle event of type only once.
     */
    Eventbus.prototype.handleOnce = function (name, callback) {
        return this._stream$.pipe(operators_1.first(function (event) { return event.name === name; })).subscribe(/* istanbul ignore next */ function (event) {
            setTimeout(function () { return callback(event); }, 1);
        });
    };
    Eventbus = __decorate([
        container_1.Injectable()
    ], Eventbus);
    return Eventbus;
}());
exports.Eventbus = Eventbus;
