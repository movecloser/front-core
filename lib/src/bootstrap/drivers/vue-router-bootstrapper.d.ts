import { BootstrapDriver, ContainerFactory, RoutesStack } from '../../contracts/bootstrapper';
import { Container } from '../../container';
export declare class VueRouterBootstrapper implements BootstrapDriver<RoutesStack> {
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
    stack(): RoutesStack;
    /**
     * Prefixes the given route's name with the provided string.
     * @param route - The route which `name` property is to be prefixed.
     * @param prefix - The prefix that is to be prepended to the route's `name` property.
     */
    private prefixRouteName;
}
