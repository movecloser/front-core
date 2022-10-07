import { BootstrapDriver, ContainerFactory, StoreStack } from '../../contracts/bootstrapper';
import { Container } from '../../container';
import { IConfiguration } from '../../contracts';
export declare class VuexBootstrapper implements BootstrapDriver<StoreStack> {
    private container;
    private configuration;
    private _stack;
    constructor(container: Container, configuration: IConfiguration);
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
