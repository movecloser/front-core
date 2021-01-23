import { ContainerOptions, Interfaces } from '@/contracts/container'
import { IConfiguration } from '@/contracts/configuration'
import { IHttpConnectorConfig } from '@/contracts/http'
import { ResourcesRegistry } from '@/contracts/connector'

import { Container } from '@/container'
import { IModuleConstructor } from '@/module'

export interface AppConfig extends AnyObject {
  container?: ContainerOptions
  http?: IHttpConnectorConfig
  middlewares?: symbol[],
  modules: IModuleConstructor[]
  resources?: ResourcesRegistry
  router: RouterDriver
  store: StoreDriver
}

export interface BootstrapDriver<Stack> {
  applyModule (name: string, callback: ContainerFactory): void
  stack (): Stack
}

export interface Bootstrapper {
  boot (): void
  getConfiguration (): IConfiguration
  getContainer (): Container
  getRoutesStack (): RoutesStack
  getStoreStack (): StoreStack
}

export type ContainerFactory = (container: Container) => any

export type ProvidersFactory = (config: IConfiguration) => Interfaces.ContainerModuleCallBack | Interfaces.AsyncContainerModuleCallBack

export type RoutesStack = AnyObject | any[]
export type StoreStack = AnyObject | any[]

export enum RouterDriver {
  None = 'none',
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
