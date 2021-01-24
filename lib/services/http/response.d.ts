import { Headers, IResponse, List, Payload } from '../../contracts/http';
/**
 * Response class is responsible for delivering response from http request.
 *
 * @author Łukasz sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
export declare class Response implements IResponse {
    readonly data: Payload;
    readonly errors: Payload | List | null;
    readonly headers: Headers;
    readonly status: number;
    constructor(status: number, data: Payload, headers?: Headers, errors?: Payload | List | null);
    /**
     * Determine if response has any errors.
     */
    hasErrors(): boolean;
    /**
     * Determine if response is successful.
     */
    isSuccessful(): boolean;
}
