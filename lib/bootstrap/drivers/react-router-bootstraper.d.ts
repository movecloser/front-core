import { Container } from '../../container';
import { BootstrapDriver, ContainerFactory, StoreStack } from '../../contracts/bootstrapper';
import { IConfiguration } from '../../contracts';
export declare class ReactRouterBootstrapper implements BootstrapDriver<StoreStack> {
    private container;
    private configuration;
    private _stack;
    constructor(container: Container, configuration: IConfiguration);
    /**
     * Applies callback to bootstrapper stack.
     */
    applyModule(name: string, callback: ContainerFactory): void;
    /**
     * Return stack for current bootstrapper.
     */
    stack(): StoreStack;
}
