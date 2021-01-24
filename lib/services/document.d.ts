import { IDocument } from '../contracts/services';
/**
 * Provides window object access and functionalities.
 *
 * @author  Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 */
export declare class DocumentService implements IDocument {
    /**
     * Determine if window object is available (Client vs SSR).
     *
     * @var boolean
     */
    private _isDefined;
    constructor();
    /**
     * Add listener to document object (if defined)
     *
     * @return void
     */
    addEventListener(name: any, handler: (this: Document, ev: any) => any, options?: any): void;
    /**
     * Call method in parent object based on name.
     *
     * @param {String} method
     * @param {Array} params
     * @return any
     */
    call(method: string, params: any[]): any;
    /**
     * Removes listener from document object (if defined)
     *
     * @return void
     */
    removeEventListener(name: any, handler: (this: Document, ev: any) => any, options?: any): void;
}
