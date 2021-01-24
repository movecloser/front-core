import { Observable } from 'rxjs';
import { IStreamBus, StreamFactory, StreamList } from '../contracts/services';
/**
 * Provides access to stream based bus channels.
 *
 * @author  Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 */
export declare class StreamBus implements IStreamBus {
    private _registry;
    constructor(streams: StreamList);
    get(stream: string): Observable<any>;
    register(stream: string, factory: StreamFactory, force?: boolean): boolean;
    unregister(stream: string): boolean;
}
