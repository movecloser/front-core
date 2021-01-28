import { AsyncContainerModule, Container as Inversify, ContainerModule } from 'inversify';
import { IContainer, ContainerOptions } from './contracts/container';
/**
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
export declare class Container implements IContainer<Inversify, ContainerModule, AsyncContainerModule> {
    /**
     * Container instance.
     * @private
     */
    private container;
    /**
     * Returns new instance of IOC container.
     * @param config
     */
    createContainer(config?: ContainerOptions): void;
    /**
     *
     * @param binder
     * @param async
     */
    createModule(binder: any, async?: boolean): ContainerModule | AsyncContainerModule;
    /**
     * Returns instance of Service by it's identifier.
     * @param identifier
     */
    get<ServiceContract>(identifier: any): ServiceContract;
    /**
     * Returns instance of IOC container.
     */
    getContainer(): Inversify;
    /**
     * Load module into the container.
     * @param module
     * @param async
     */
    loadModule(module: ContainerModule | AsyncContainerModule, async?: boolean): Promise<void>;
    /**
     * Unload module from the container.
     * @param module
     */
    unloadModule(module: ContainerModule | AsyncContainerModule): void;
}
export { inject as Inject, injectable as Injectable } from 'inversify';
