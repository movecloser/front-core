"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const validation_1 = require("../contracts/validation");
const errors_1 = require("../exceptions/errors");
const container_1 = require("../container");
/**
 * Validation service is responsible for sending 422 response to correct form.
 *
 * @author  Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 */
let Validation = class Validation {
    constructor() {
        const event = {
            form: '',
            type: validation_1.ValidationEventType.Clear
        };
        this._stream$ = new rxjs_1.BehaviorSubject(event);
    }
    /**
     * Clear errors of given form.
     *
     * @param  {string} form
     * @return void
     */
    clearForm(form) {
        this._stream$.next({
            form: form,
            type: validation_1.ValidationEventType.Clear
        });
    }
    /**
     * Subscribe to give form for clear events.
     *
     * @param  {string} form
     * @param  {function} callback
     * @return {Subscription}
     */
    onClear(form, callback) {
        if (!callback || typeof callback !== 'function') {
            throw new errors_1.IncorrectCall('[onClear] method requires argument (function) that will be fired, when clear event will occur.');
        }
        return this._stream$.pipe(operators_1.filter((event) => event.form === form || event.type === validation_1.ValidationEventType.Clear)).subscribe(() => {
            callback();
        });
    }
    /**
     * Subscribe to give form and field for errors` events.
     *
     * @param  {string} form
     * @param  {string} field
     * @param  {ValidationErrorCallback} callback
     * @return {Subscription}
     */
    onErrors(form, field, callback) {
        if (!callback || typeof callback !== 'function') {
            throw new errors_1.IncorrectCall('[onErrors] method requires argument (function) that will be fired, when error event will occur.');
        }
        return this._stream$.pipe(operators_1.filter((event) => event.form === form ||
            event.type === validation_1.ValidationEventType.Error), operators_1.filter((event) => {
            if (!event.hasOwnProperty('errors') || typeof event.errors === 'undefined') {
                return false;
            }
            return event.errors.hasOwnProperty(field);
        })).subscribe((event) => {
            if (form === event.form) {
                const errors = [];
                /* istanbul ignore next */
                if (event.hasOwnProperty('errors') &&
                    typeof event.errors !== 'undefined' &&
                    event.errors.hasOwnProperty(field) &&
                    Array.isArray(event.errors[field])) {
                    errors.push(...event.errors[field]);
                }
                callback(errors);
            }
        });
    }
    /**
     * Subscribe to stream form
     *
     * @param  {string} form
     * @param  {function} callback
     * @return {Subscription}
     */
    onFormErrors(form, callback) {
        if (!callback || typeof callback !== 'function') {
            throw new errors_1.IncorrectCall('[onFormErrors] method requires argument (function) that will be fired, when error event will occur.');
        }
        return this._stream$.pipe(operators_1.filter((event) => event.form === form || event.type === validation_1.ValidationEventType.Error)).subscribe((event) => {
            const errors = [];
            /* istanbul ignore next */
            if (event.hasOwnProperty('errors')
                && typeof event.errors !== 'undefined') {
                errors.push(...event.errors['message']);
            }
            callback(errors);
        });
    }
    /**
     * Push errors to validation stream$.
     *
     * @param  {string} form
     * @param  {ErrorsPayload} errors
     * @return void
     */
    pushErrors(form, errors) {
        this._stream$.next({
            form: form,
            type: validation_1.ValidationEventType.Error,
            errors: errors
        });
    }
};
Validation = __decorate([
    container_1.Injectable()
], Validation);
exports.Validation = Validation;
