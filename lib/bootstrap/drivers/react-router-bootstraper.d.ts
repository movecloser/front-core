import { Container } from '../../container';
import { BootstrapDriver, ContainerFactory, StoreStack } from '../../contracts/bootstrapper';
export declare class ReactRouterBootstrapper implements BootstrapDriver<StoreStack> {
    private container;
    private _stack;
    constructor(container: Container);
    /**
     * Applies callback to bootstrapper stack.
     */
    applyModule(name: string, callback: ContainerFactory): void;
    /**
     * Return stack for current bootstrapper.
     */
    stack(): StoreStack;
}
