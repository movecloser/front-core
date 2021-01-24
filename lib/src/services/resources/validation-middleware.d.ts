import { FoundResource, ConnectorMiddleware } from '../../contracts/connector';
import { Headers, IResponse, Payload } from '../../contracts/http';
import { IValidation } from '../../contracts/validation';
export declare class ValidationMiddleware implements ConnectorMiddleware {
    /**
     * Name of form used in given request.
     * @protected
     */
    protected formName: string;
    /**
     * Injected validation service.
     * @protected
     */
    protected validationService: IValidation;
    /**
     * Class Constructor.
     * @param validationService
     */
    constructor(validationService: IValidation);
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
