import { Authorization, FoundResource, ConnectorMiddleware } from '../../contracts/connector';
import { Headers, IResponse, Payload } from '../../contracts/http';
export declare class AuthMiddleware implements ConnectorMiddleware {
    protected authService: Authorization;
    constructor(authService: Authorization);
    /**
     * Method to be called after call execution.
     * It handles side effects.
     */
    afterCall(response: IResponse): void;
    /**
     * Method to be called before call execution.
     * It can transform headers and body for a given resource.
     */
    beforeCall(resource: FoundResource, headers: Headers, body: Payload): {
        headers: Headers;
        body: Payload;
    };
}
