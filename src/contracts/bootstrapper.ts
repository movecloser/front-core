import { ContainerOptions, Interfaces } from './container'
import { IConfiguration } from './configuration'
import { IHttpConnectorConfig } from './http'
import { ResourcesRegistry } from './connector'

import { Container } from '../container'
import { IModuleConstructor } from '../module'

export interface AppConfig extends AnyObject {
  container?: ContainerOptions
  http?: IHttpConnectorConfig
  middlewares?: symbol[],
  modules: IModuleConstructor[]
  resources?: ResourcesRegistry
  router: RouterDriver
  store: StoreDriver
  services?: ProvidersFactory
}

export interface BootstrapDriver<Stack> {
  applyModule (name: string, callback: ContainerFactory): void
  stack (): Stack
}

export type ContainerFactory = (container: Container) => any

export interface IBootstrapper {
  boot (): void
  getConfiguration (): IConfiguration
  getContainer (): Container
  getRoutesStack (): RoutesStack
  getStoreStack (): StoreStack
}

export type ProvidersFactory = (config: IConfiguration) => Interfaces.ContainerModuleCallBack | Interfaces.AsyncContainerModuleCallBack

export type RoutesStack = AnyObject | any[]
export type StoreStack = AnyObject | any[]

export enum RouterDriver {
  None = 'none',
  ReactRouter = 'react-router',
  VueRouter = 'vue-router'
}

export enum StoreDriver {
  // Mobx = 'mobx',
  None = 'none',
  Vuex = 'vuex'
}

export interface AnyObject {
  [key: string]: any
}
