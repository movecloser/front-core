import { Subscription } from 'rxjs';
export declare type EventbusCallback<Data> = (event: EventPayload<Data>) => void;
export interface EventPayload<Data> {
    name: string;
    payload?: Data;
}
export declare const EventbusType: unique symbol;
export interface IEventbus {
    emit(name: string, payload?: any): void;
    observe(observer: IObserver): Subscription;
    handle<Data>(name: string, callback: EventbusCallback<Data>): Subscription;
    handleOnce<Data>(name: string, callback: EventbusCallback<Data>): void;
}
export interface IObserver {
    observableEvents: ObservableEvents;
    [key: string]: any;
}
export interface ObservableEvents {
    [key: string]: string;
}
