import { BootstrapDriver, ContainerFactory, StoreStack } from '../../contracts/bootstrapper';
export declare class NoneBootstrapper implements BootstrapDriver<StoreStack> {
    /**
     * Applies callback to bootstrapper stack.
     */
    applyModule(name: string, callback: ContainerFactory): void;
    /**
     * Return stack for current bootstrapper.
     */
    stack(): StoreStack;
}
