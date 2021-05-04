import { IDocument, IWindow } from '../contracts/services';
/**
 * Provides window object access and functionalities.
 *
 * @author  Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 */
export declare class WindowService implements IWindow {
    /**
     * Service that implements IDocument.
     *
     * @var IDocument
     */
    private readonly _document;
    /**
     * Determine if window object is available (Client vs SSR).
     *
     * @var boolean
     */
    private readonly _isDefined;
    /**
     * Indicates whether window tab is focused.
     *
     * @var boolean
     */
    isActive: boolean;
    constructor(document: IDocument);
    /**
     * Add listener to document object (if defined)
     *
     * @return void
     */
    addEventListener(name: any, handler: (this: Window, ev: any) => any, options?: any): void;
    /**
     * Call method in parent object based on name.
     *
     * @param {String} method
     * @param {Array} params
     * @return any
     */
    call(method: string, params: any[]): any;
    /**
     * Return IDocument service.
     *
     * @return IDocument
     */
    get document(): IDocument;
    /**
     * Determine if applications runs in web browser.
     *
     * @return boolean
     */
    get isClient(): boolean;
    /**
     * Return pathname from window location.
     */
    static get pathname(): string;
    /**
     * Return native window object or null
     *
     * @return window | null
     */
    get native(): Window | null;
    /**
     * Determine if global window object is defined.
     *
     * @return boolean
     */
    static get isDefined(): boolean;
    /**
     * Determines whether the website is being viewed on the tablet screen.
     *
     * @return boolean
     */
    get isDesktop(): boolean;
    /**
     * Determine if applications at mobile device
     *
     * @return boolean
     */
    get isMobile(): boolean;
    /**
     * Determines whether the website is being viewed on the phone screen.
     *
     * @return boolean
     */
    get isPhone(): boolean;
    /**
     * Determine if applications runs at server.
     *
     * @return boolean
     */
    get isServer(): boolean;
    /**
     * Determines whether the website is being viewed on the tablet screen.
     *
     * @return boolean
     */
    get isTablet(): boolean;
    /**
     * Redirects to given url
     *
     * @return void
     */
    redirect(target: string): void;
    /**
     * Register window focus/blur listeners.
     * @private
     */
    private registerTabListeners;
    /**
     * Removes listener from document object (if defined)
     *
     * @return void
     */
    removeEventListener(name: any, handler: (this: Window, ev: any) => any, options?: any): void;
    scrollTo(options: ScrollToOptions | number | undefined, y?: number): void;
}
