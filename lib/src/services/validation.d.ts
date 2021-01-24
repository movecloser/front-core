import { Subscription } from 'rxjs';
import { ErrorsPayload, IValidation, ValidationErrorCallback } from '../contracts/validation';
/**
 * Validation service is responsible for sending 422 response to correct form.
 *
 * @author  Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 */
export declare class Validation implements IValidation {
    private _stream$;
    constructor();
    /**
     * Clear errors of given form.
     *
     * @param  {string} form
     * @return void
     */
    clearForm(form: string): void;
    /**
     * Subscribe to give form for clear events.
     *
     * @param  {string} form
     * @param  {function} callback
     * @return {Subscription}
     */
    onClear(form: string, callback: () => void): Subscription;
    /**
     * Subscribe to give form and field for errors` events.
     *
     * @param  {string} form
     * @param  {string} field
     * @param  {ValidationErrorCallback} callback
     * @return {Subscription}
     */
    onErrors(form: string, field: string, callback: ValidationErrorCallback): Subscription;
    /**
     * Subscribe to stream form
     *
     * @param  {string} form
     * @param  {function} callback
     * @return {Subscription}
     */
    onFormErrors(form: string, callback: ValidationErrorCallback): Subscription;
    /**
     * Push errors to validation stream$.
     *
     * @param  {string} form
     * @param  {ErrorsPayload} errors
     * @return void
     */
    pushErrors(form: string, errors: ErrorsPayload): void;
}
