import { AxiosRequestConfig } from 'axios';
import { Headers, IResponse, Methods, Payload } from '../../contracts/http';
import { HttpDriver } from './http-driver';
/**
 * Provides axios instance for http calls.
 *
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
export declare class AxiosDriver extends HttpDriver {
    private instance;
    constructor(axiosConfig: AxiosRequestConfig, debug: boolean);
    /**
     * Performs http request using axios.
     */
    protected _call(method: Methods, target: string, data: Payload, headers: Headers, options: any): Promise<IResponse>;
    /**
     * Constructing payload based on axios requirements.
     */
    private static composePayload;
}
