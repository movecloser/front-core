import { ContainerFactory, ProvidersFactory } from './contracts/bootstrapper';
export declare function AppModule(registry: ModuleRegistry): (target: ModuleConstructor) => IModuleConstructor;
export interface IModule {
    name: string;
    observers: symbol[];
    providers: ProvidersFactory | null;
    providersAsync: boolean;
    routes: RoutesFactory | null;
    state: StoreFactory | null;
}
export declare type IModuleConstructor = new () => IModule;
export declare abstract class Module implements IModule {
    name: string;
    observers: symbol[];
    providers: ProvidersFactory | null;
    providersAsync: boolean;
    routes: RoutesFactory | null;
    state: StoreFactory | null;
}
declare type ModuleConstructor = new () => Module;
export interface ModuleRegistry {
    name: string;
    observers?: symbol[];
    providers?: ProvidersFactory;
    providersAsync?: boolean;
    routes?: RoutesFactory;
    state?: StoreFactory;
}
export declare type RoutesFactory = ContainerFactory;
export declare type StoreFactory = ContainerFactory;
export {};
