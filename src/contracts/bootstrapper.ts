import { Container } from 'inversify'

import { ContainerOptions } from '@/contracts/container'
import { IConfiguration } from '@/contracts/configuration'
import { IModuleConstructor } from '@/support/modules'

export interface AppConfig {
  container?: ContainerOptions
  modules: IModuleConstructor[]
  router: RouterDriver
  store: StoreDriver
  [key: string]: any
}

export interface Bootstrapper {
  boot (): void
  getConfiguration (): IConfiguration
  getContainer (): Container
  getRoutesStack (): RoutesStack
  getStoreStack (): StoreStack
}

export enum Platform {
  React = 'react',
  Vue = 'vue'
}

export type RoutesStack = AnyObject | any[]
export type StoreStack = AnyObject | any[]

export enum RouterDriver {
  None = 'none',
  VueRouter = 'vue-router'
}

export enum StoreDriver {
  // Mobx = 'mobx',
  None = 'none',
  // Redux ='redux',
  Vuex = 'vuex'
}

interface AnyObject {
  [key: string]: any
}
