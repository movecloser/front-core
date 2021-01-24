import { ConnectorMiddleware, FoundResource } from '../../contracts/connector';
import { Headers, IResponse, Payload } from '../../contracts/http';
import { IEventbus } from '../../contracts/eventbus';
export declare class EventbusMiddleware implements ConnectorMiddleware {
    protected eventbus: IEventbus;
    constructor(eventbus: IEventbus);
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
