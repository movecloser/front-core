import { Headers, IHttp, IHttpConnector, IHttpConstructors, IResponse, Payload } from '../contracts/http';
import { HttpDriver } from './http/http-driver';
/**
 * Http Connector is service class that provides http functionality.
 *
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
export declare class HttpConnector implements IHttpConnector {
    private _defaultDestination;
    private readonly _drivers;
    constructor(constructors?: IHttpConstructors, defaultDestination?: string | null);
    /**
     * Return default destination.
     */
    defaultDestination(): string;
    /**
     * Perform delete http request.
     */
    delete(target: string, data?: Payload, headers?: Headers, options?: null): Promise<IResponse>;
    /**
     * Return instance of requested destination driver.
     * @param destination
     */
    destination(destination: string): IHttp;
    /**
     * Perform get http request.
     */
    get(target: string, params?: Payload, headers?: Headers, options?: null): Promise<IResponse>;
    /**
     * Perform post http request.
     */
    post(target: string, data?: Payload, headers?: Headers, options?: null): Promise<IResponse>;
    /**
     * Perform put http request.
     */
    put(target: string, data: Payload, headers?: Headers, options?: null): Promise<IResponse>;
    /**
     * Registering new destination.
     * @param name
     * @param driver
     * @param setAsDefault
     */
    register(name: string, driver: HttpDriver, setAsDefault?: boolean): void;
    /**
     * Setter for default destination field.
     * Value cannot be override during runtime.
     *
     * @param name
     */
    setDefaultDestination(name: string): void;
    /**
     *
     * @private
     */
    private get defaultDriver();
}
