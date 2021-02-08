import { BehaviorSubject } from 'rxjs';
import { IModal, ModalPayload, ModalRegistry, ModalState } from '../contracts';
export declare class ModalConnector implements IModal {
    protected _registry: ModalRegistry<any>;
    protected _state: ModalState;
    protected _stream$: BehaviorSubject<ModalState>;
    constructor(registry: ModalRegistry<any>);
    /**
     * Method to trigger closing of a modal.
     * @param key
     */
    close(key?: string | null): void;
    /**
     * Returns current component from state.
     */
    component<C>(): C;
    /**
     * Resolve component from registry by it's name.
     * @param name
     */
    getComponent<C>(name: string): C;
    /**
     * Returns boolean if modal is currently opened.
     */
    get isOpened(): boolean;
    /**
     * Returns name of current modal component.
     */
    get name(): string | null;
    /**
     * Returns array of registered components.
     */
    getRegistry<C>(): ModalRegistry<C>;
    /**
     * Method to trigger modal opening.
     * @param payload
     */
    open(key: string, payload?: ModalPayload): void;
    /**
     * Method to asynchronously trigger modals opening.
     * @param key
     * @param promise
     * @param payload
     */
    openAsync(key: string, promise: Promise<any>, payload?: ModalPayload): void;
    /**
     * Returns payload of currently opened modal.
     */
    get payload(): ModalPayload;
    /**
     * Method to subscribe for modals stream.
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
