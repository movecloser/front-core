import { Headers, IHttp, IResponse, Payload } from '../../contracts/http';
export declare abstract class HttpDriver implements IHttp {
    protected _debug: boolean;
    constructor(debug?: boolean);
    /**
     * Perform delete http request.
     */
    delete(target: string, data?: Payload, headers?: Headers, options?: null): Promise<IResponse>;
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
    protected abstract _call(method: string, target: string, data: Payload, headers: Headers, options?: any): Promise<IResponse>;
    protected _logResponse(target: string, method: string, status: number, request: any, response: any): void;
    protected composeSuccessResponse(status: number, data: any, headers: any): IResponse;
    protected composeFailResponse(status: number, data: any, headers: any, errors: any): IResponse;
}
