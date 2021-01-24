import { ContainerOptions, Interfaces } from './container';
import { IConfiguration } from './configuration';
import { IHttpConnectorConfig } from './http';
import { ResourcesRegistry } from './connector';
import { Container } from '../container';
import { IModuleConstructor } from '../module';
export interface AppConfig extends AnyObject {
    container?: ContainerOptions;
    http?: IHttpConnectorConfig;
    middlewares?: symbol[];
    modules: IModuleConstructor[];
    resources?: ResourcesRegistry;
    router?: RouterDriver;
    store?: StoreDriver;
}
export interface BootstrapDriver<Stack> {
    applyModule(name: string, callback: ContainerFactory): void;
    stack(): Stack;
}
export declare type ContainerFactory = (container: Container) => any;
export interface IBootstrapper {
    boot(): void;
    getConfiguration(): IConfiguration;
    getContainer(): Container;
    getRoutesStack(): RoutesStack;
    getStoreStack(): StoreStack;
}
export declare type ProvidersFactory = (config: IConfiguration) => Interfaces.ContainerModuleCallBack | Interfaces.AsyncContainerModuleCallBack;
export declare type RoutesStack = AnyObject | any[];
export declare type StoreStack = AnyObject | any[];
export declare enum RouterDriver {
    None = "none",
    VueRouter = "vue-router"
}
export declare enum StoreDriver {
    None = "none",
    Vuex = "vuex"
}
export interface AnyObject {
    [key: string]: any;
}
