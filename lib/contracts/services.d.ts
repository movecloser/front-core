import { Moment } from 'moment';
import { Observable } from 'rxjs';
export declare const DateTimeType: unique symbol;
export declare const DocumentType: unique symbol;
export interface IBaseDateTime {
    difference(start: string, end?: string): number;
    nowToFormat(format: string): string;
    parseToFormat(date: string, format: string): string;
}
export interface ILegacyDateTime extends IBaseDateTime {
    now: Moment;
    parse(date: string): Moment;
}
export declare type IDateTime = IBaseDateTime;
export interface IDocument {
    addEventListener(name: any, handler: (this: Document, ev: any) => any, options?: any): void;
    call(method: string, params?: any[]): any;
    removeEventListener(name: any, handler: (this: Document, ev: any) => any, options?: any): void;
}
export interface IModal {
    component<C>(): C;
    getComponent<C>(name: string): C;
    getRegistry<C>(): ModalRegistry<C>;
    isOpened: boolean;
    name: string | null;
    payload: ModalPayload;
    close(key?: string | null): void;
    open<Payload>(key: string, payload?: Payload, config?: ModalConfig): void;
    openAsync<Payload>(key: string, promise: Promise<any>, payload?: Payload, config?: ModalConfig): void;
    register<C>(register: ModalRegistry<C>): void;
    subscribe(callback: (open: ModalState) => any): void;
}
export interface ModalConfig {
    lockScroll?: boolean;
    [key: string]: any;
}
export interface ModalPayload {
    [key: string]: any;
}
export interface ModalRegistry<ComponentConstructor> {
    [key: string]: ComponentConstructor;
}
export interface ModalState {
    component: string | null;
    opened: boolean;
    payload: ModalPayload;
    config: ModalConfig;
}
export declare const ModalType: unique symbol;
export interface IWindow {
    call: (method: string, params: any[]) => any;
    document: IDocument;
    isActive: boolean;
    isClient: boolean;
    isDesktop: boolean;
    isMobile: boolean;
    isPhone: boolean;
    isServer: boolean;
    isTablet: boolean;
    native: Window | null;
    addEventListener(name: any, handler: (this: Window, ev: any) => any, options?: any): void;
    onFocus(callback: () => void): void;
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
