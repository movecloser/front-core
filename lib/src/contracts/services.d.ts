import { Moment } from 'moment';
import { Observable } from 'rxjs';
export declare const DateTimeType: unique symbol;
export declare const DocumentType: unique symbol;
export interface IDateTime {
    difference(start: string, end?: string): number;
    now: Moment;
    nowToFormat(format: string): string;
    parse(date: string): Moment;
    parseToFormat(date: string, format: string): string;
}
export interface IDocument {
    addEventListener(name: any, handler: (this: Document, ev: any) => any, options?: any): void;
    call(method: string, params: object): any;
    removeEventListener(name: any, handler: (this: Document, ev: any) => any, options?: any): void;
}
export interface IWindow {
    addEventListener(name: any, handler: (this: Window, ev: any) => any, options?: any): void;
    call: (method: string, params: any[]) => any;
    document: IDocument;
    isClient: boolean;
    isDesktop: boolean;
    isMobile: boolean;
    isPhone: boolean;
    isServer: boolean;
    isTablet: boolean;
    native: Window | null;
    scrollTo(options?: ScrollToOptions): void;
    scrollTo(x: number, y: number): void;
    redirect(target: string): void;
    removeEventListener(name: any, handler: (this: Window, ev: any) => any, options?: any): void;
}
export interface IStreamBus {
    get(stream: string): Observable<any>;
    register(stream: string, factory: StreamFactory, force?: boolean): boolean;
    unregister(stream: string): boolean;
}
export declare const StreamBusType: unique symbol;
export declare type StreamFactory = () => Observable<any>;
export interface StreamList {
    [key: string]: StreamFactory;
}
export interface StreamRegistry {
    [key: string]: Observable<any>;
}
export declare const WindowType: unique symbol;
