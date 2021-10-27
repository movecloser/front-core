/*
 * Copyright (c) 2021 Move Closer
 */

import { AppConfig, BootstrapDriver, IBootstrapper as Abstract, RoutesStack, StoreStack } from './contracts/bootstrapper';
import { IConfiguration } from './contracts/configuration';
import { Container } from './container';
/**
 * Bootstrapper is responsible for booting the app with entire dependencies & base setup.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
export declare class Bootstrapper implements Abstract {
    protected config: IConfiguration;
    protected container: Container;
    protected routerBootstrapper: BootstrapDriver<RoutesStack>;
    protected storeBootstrapper: BootstrapDriver<StoreStack>;
    constructor(config: AppConfig);
    /**
     * Bootstrapper init method.
     */
    boot(): Promise<void>;
    /**
     * Returns app configuration.
     */
    getConfiguration(): IConfiguration;
    /**
     * Returns Container instance.
     */
    getContainer(): Container;
    /**
     * Returns Routes Stack object.
     */
    getRoutesStack(): RoutesStack;
    /**
     * Returns Store Stack object.
     */
    getStoreStack(): StoreStack;
    /**
     * Creates new instance of Ioc Container.
     */
    private createContainer;
}
