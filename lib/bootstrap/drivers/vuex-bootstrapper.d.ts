import { BootstrapDriver, ContainerFactory, StoreStack } from '../../contracts/bootstrapper';
import { Container } from '../../container';
export declare class VuexBootstrapper implements BootstrapDriver<StoreStack> {
    private container;
    private _stack;
    constructor(container: Container);
    /**
     * Applies callback to bootstrapper stack.
     * @param name
     * @param callback
     */
    applyModule(name: string, callback: ContainerFactory): void;
    /**
     * Return stack for current bootstrapper.
     */
    stack(): StoreStack;
}
