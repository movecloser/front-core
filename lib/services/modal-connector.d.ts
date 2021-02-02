import { BehaviorSubject } from 'rxjs';
import { IModal, ModalPayload, ModalRegistry, ModalState } from '../contracts';
export declare class ModalConnector implements IModal {
    protected _registry: ModalRegistry<any>;
    protected _state: ModalState;
    protected _stream$: BehaviorSubject<ModalState>;
    constructor(registry: ModalRegistry<any>);
    /**
     *
     * @param key
     */
    close(key?: string | null): void;
    /**
     *
     */
    component<C>(): C;
    /**
     *
     */
    get isOpened(): boolean;
    /**
     *
     */
    get name(): string | null;
    /**
     *
     // * @param key
     * @param payload
     */
    open(key: string, payload?: ModalPayload): void;
    /**
     *
     * @param key
     * @param promise
     * @param payload
     */
    openAsync(key: string, promise: Promise<any>, payload?: ModalPayload): void;
    /**
     *
     */
    get payload(): ModalPayload;
    /**
     *
     * @param callback
     */
    subscribe(callback: (open: ModalState) => any): void;
    /**
     * Locks the window's scroll.
     * @private
     *
     * @author Stanisław Gregor <stanislaw.gregor@movecloser.pl>
     */
    private lockScroll;
    /**
     * Unlocks the window's scroll.
     * @private
     *
     * @author Stanisław Gregor <stanislaw.gregor@movecloser.pl>
     */
    private unlockScroll;
}
export default ModalConnector;
