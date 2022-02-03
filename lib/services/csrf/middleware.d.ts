import { ConnectorMiddleware, FoundResource, Headers, ICSRFService, Payload } from '../../contracts';
/**
 * @author Agnieszka Zawadzka <agnieszka.zawadzka@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 */
export declare class CSRFMiddleware implements ConnectorMiddleware {
    private _csrfService;
    private _config;
    constructor(_csrfService: ICSRFService);
    /**
     * Method to be called after call execution.
     * It handles side effects.
     */
    afterCall(): void;
    /**
     * Method to be called before call execution.
     * It can transform headers and body for a given resource.
     */
    beforeCall(resource: FoundResource, headers: Headers, body: Payload): Promise<{
        headers: Headers;
        body: Payload;
    }>;
}
