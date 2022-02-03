import { CSRFConfig, FoundResource, Headers, ICSRFService, IHttpConnector, Payload } from '../../contracts';
/**
 * CSRF service is responsible for appending a CSRF token to requests.
 *
 * @author Agnieszka Zawadzka <agnieszka.zawadzka@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 */
export declare abstract class CSRFService implements ICSRFService {
    protected _config: CSRFConfig;
    protected _http: IHttpConnector;
    constructor(_config: CSRFConfig, _http: IHttpConnector);
    /**
     * @inheritDoc
     */
    getConfig(): CSRFConfig;
    /**
     * @inheritDoc
     */
    getToken(resource: FoundResource, headers: Headers, body: Payload): Promise<string>;
    /**
     * Compose payload that will be send.
     */
    protected abstract composePayload(resource: FoundResource, headers: Headers, body: Payload): Payload;
    /**
     * Retrieve token from response.
     */
    protected abstract retrieveTokenFromResponse(data: Payload): string;
}
