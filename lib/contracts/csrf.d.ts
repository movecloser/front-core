import { Headers, Methods, Payload } from './http';
import { FoundResource } from './connector';
export interface CSRFConfig {
    paramName: string;
    sendAsBody?: boolean;
    source: string | {
        connection: string;
        url: string;
        method: Methods;
    };
}
export declare const CSRFServiceType: unique symbol;
export interface ICSRFService {
    /**
     * Return CSRF config object.
     */
    getConfig(): CSRFConfig;
    /**
     * Return new token.
     */
    getToken(resource: FoundResource, headers: Headers, body: Payload): Promise<string>;
}
