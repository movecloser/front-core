import { ConnectorMiddleware, FoundResource, IConnector, Params, ResourcesRegistry, ResponseType } from '../contracts/connector';
import { Headers, IHttpConnector, IResponse, Payload } from '../contracts/http';
/**
 * ApiConnector is a service class that provides unified access to the REST API.
 *
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
export declare class ApiConnector implements IConnector {
    private readonly _http;
    private _list;
    private _middlewares;
    constructor(list: ResourcesRegistry, httpConnector: IHttpConnector, middlewares: ConnectorMiddleware[]);
    /**
     * Call to resource.
     */
    call(resource: string, action: string, params?: Params, body?: Payload, headers?: Headers, responseType?: ResponseType): Promise<IResponse>;
    /**
     * Return resource address.
     */
    findResource(resource: string, action: string, params?: Params): FoundResource;
    /**
     * Merge given list with existing middlewares.
     */
    useMiddlewares(list: ConnectorMiddleware[]): void;
    /**
     * Merge given list with existing registry..
     */
    useResources(list: ResourcesRegistry): void;
    /**
     * Build full url based on resource from routing list.
     */
    private static buildUrl;
    /**
     * Checks if given resource exists.
     */
    private checkIfActionOfResourceExists;
    /**
     * Compares endpoint parameters with given parameters.
     */
    private static checkIfAllParamsProvided;
    /**
     * Resolve form name by resource & action.
     */
    private static resolveShorthand;
}
