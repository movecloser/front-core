import { Subscription } from 'rxjs';
import { EventbusCallback, IEventbus, IObserver } from '../contracts/eventbus';
/**
 * Eventbus based on RxJS.
 *
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
export declare class Eventbus implements IEventbus {
    private _stream$;
    constructor();
    /**
     * Emit new event to bus.
     */
    emit<Data>(name: string, payload?: any): void;
    /**
     * Register new observer.
     */
    observe(observer: IObserver): Subscription;
    /**
     * Handle event of type.
     */
    handle<Data>(name: string, callback: EventbusCallback<Data>): Subscription;
    /**
     * Handle event of type only once.
     */
    handleOnce<Data>(name: string, callback: EventbusCallback<Data>): Subscription;
}
