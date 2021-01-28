import { Subscription } from 'rxjs';
export interface ErrorsPayload {
    [key: string]: string[];
}
export interface IValidation {
    clearForm(form: string): void;
    onClear(form: string, callback: () => void): Subscription;
    onErrors(form: string, field: string, callback: ValidationErrorCallback): Subscription;
    onFormErrors(form: string, callback: (...args: any[]) => void): Subscription;
    pushErrors(form: string, errors: ErrorsPayload, message?: string | null): void;
}
export declare type ValidationErrorCallback = (errors: string[]) => void;
export declare const ValidationType: unique symbol;
export interface ValidationEvent {
    form: string;
    type: ValidationEventType;
    message?: string;
    errors?: ErrorsPayload;
}
export declare enum ValidationEventType {
    Clear = "clear",
    Error = "error"
}
