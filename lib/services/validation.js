"use strict";
// Copyright (c) 2021 Move Closer
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
/* istanbul ignore file */
// TODO: Fix tests using rxjs marbles.
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const validation_1 = require("../contracts/validation");
const container_1 = require("../container");
/**
 * Validation service is responsible for sending 422 response to correct form.
 *
 * @author  Kuba Fogel <kuba.fogel@movecloser.pl>
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
let Validation = class Validation {
    constructor() {
        this.callbackMessage = 'Cannot recognize error message.';
        const event = {
            form: '',
            type: validation_1.ValidationEventType.Clear
        };
        this._stream$ = new rxjs_1.BehaviorSubject(event);
    }
    /**
     * Clear errors of given form.
     */
    clearForm(form) {
        this._stream$.next({
            form: form,
            type: validation_1.ValidationEventType.Clear
        });
    }
    /**
     * Subscribe to give form for clear events.
     */
    onClear(form, callback) {
        return this._stream$.pipe((0, operators_1.filter)(event => event.form === form || event.type === validation_1.ValidationEventType.Clear)).subscribe(callback);
    }
    /**
     * Subscribe to give form and field for errors` events.
     */
    onErrors(form, field, callback) {
        return this._stream$.pipe((0, operators_1.filter)(event => event.form === form &&
            event.type === validation_1.ValidationEventType.Error), (0, operators_1.filter)(event => typeof event.errors !== 'undefined' && field in event.errors), (0, operators_1.map)(event => {
            // @ts-ignore  The value is checked above.
            return Array.isArray(event.errors[field]) ?
                // @ts-ignore
                event.errors[field] : [event.message || this.callbackMessage];
        })).subscribe(callback);
    }
    /**
     * Subscribe to stream form.
     */
    onFormErrors(form, callback) {
        return this._stream$.pipe((0, operators_1.filter)(event => event.form === form &&
            event.type === validation_1.ValidationEventType.Error)).subscribe((event) => {
            const errors = [];
            if (event.message) {
                errors.push(event.message);
            }
            if (typeof event.errors === 'object' && event.errors !== null) {
                for (const list of Object.values(event.errors)) {
                    errors.push(...list);
                }
            }
            callback(errors.length ? errors : [this.callbackMessage]);
        });
    }
    /**
     * Push errors to validation stream$.
     */
    pushErrors(form, errors, message = null) {
        this._stream$.next(Object.assign({ form: form, type: validation_1.ValidationEventType.Error, errors: errors }, (message ? { message } : {})));
    }
};
Validation = __decorate([
    (0, container_1.Injectable)()
], Validation);
exports.Validation = Validation;
