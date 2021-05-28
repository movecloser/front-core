import { Subscription } from 'rxjs';
import { ErrorsPayload, IValidation, ValidationErrorCallback, ValidationEvent } from '../contracts/validation';
/**
 * Validation service is responsible for sending 422 response to correct form.
 *
 * @author  Kuba Fogel <kuba.fogel@movecloser.pl>
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
export declare class Validation implements IValidation {
    protected callbackMessage: string;
    private _stream$;
    constructor();
    /**
     * Clear errors of given form.
     */
    clearForm(form: string): void;
    /**
     * Subscribe to give form for clear events.
     */
    onClear(form: string, callback: (value: ValidationEvent) => void): Subscription;
    /**
     * Subscribe to give form and field for errors` events.
     */
    onErrors(form: string, field: string, callback: ValidationErrorCallback): Subscription;
    /**
     * Subscribe to stream form.
     */
    onFormErrors(form: string, callback: ValidationErrorCallback): Subscription;
    /**
     * Push errors to validation stream$.
     */
    pushErrors(form: string, errors: ErrorsPayload, message?: string | null): void;
}
