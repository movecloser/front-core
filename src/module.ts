import { ContainerFactory, ProvidersFactory } from '@/contracts/bootstrapper'

export function AppModule (registry: ModuleRegistry) {
  return function _AppModule (target: ModuleConstructor): IModuleConstructor {
    return <typeof target><ModuleConstructor>class extends target {
      constructor () {
        super()
        this.name = registry.name
        this.observers = (
          registry.hasOwnProperty('observers') &&
          typeof registry.observers !== 'undefined' &&
          Array.isArray(registry.observers)
        ) ? registry.observers : []

        this.providers = (
          registry.hasOwnProperty('providers') &&
          typeof registry.providers !== 'undefined'
        ) ? registry.providers : null

        this.routes = (
          registry.hasOwnProperty('routes') &&
          typeof registry.routes !== 'undefined'
        ) ? registry.routes : null

        this.state = (
          registry.hasOwnProperty('state') &&
          typeof registry.state !== 'undefined'
        ) ? registry.state : null
      }
    }
  }
}

export interface IModule {
  name: string
  observers: symbol[]
  providers: ProvidersFactory | null
  providersAsync: boolean
  routes: RoutesFactory | null
  state: StoreFactory | null
}

export type IModuleConstructor = new () => IModule

export abstract class Module implements IModule {
  name: string = ''
  observers: symbol[] = []
  providers: ProvidersFactory | null = null
  providersAsync: boolean = false
  routes: RoutesFactory | null = null
  state: StoreFactory | null = null
}

type ModuleConstructor = new () => Module

export interface ModuleRegistry {
  name: string
  observers?: symbol[]
  providers?: ProvidersFactory
  providersAsync?: boolean
  routes?: RoutesFactory
  state?: StoreFactory
}

export type RoutesFactory = ContainerFactory
export type StoreFactory = ContainerFactory
