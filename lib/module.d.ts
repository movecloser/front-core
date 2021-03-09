import { BootMethod, ContainerFactory, ProvidersFactory } from './contracts/bootstrapper';
/**
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
export declare function AppModule(registry: ModuleRegistry): (target: ModuleConstructor) => IModuleConstructor;
export interface IModule {
    boot: BootMethod | null;
    name: string;
    providers: ProvidersFactory | null;
    providersAsync: boolean;
    routes: RoutesFactory | null;
    state: StoreFactory | null;
}
export declare type IModuleConstructor = new () => IModule;
export declare abstract class Module implements IModule {
    boot: BootMethod | null;
    name: string;
    providers: ProvidersFactory | null;
    providersAsync: boolean;
    routes: RoutesFactory | null;
    state: StoreFactory | null;
}
declare type ModuleConstructor = new () => Module;
export interface ModuleRegistry {
    boot?: BootMethod;
    name: string;
    providers?: ProvidersFactory;
    providersAsync?: boolean;
    routes?: RoutesFactory;
    state?: StoreFactory;
}
export declare type RoutesFactory = ContainerFactory;
export declare type StoreFactory = ContainerFactory;
export {};
