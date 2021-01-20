import { AsyncContainerModule, Container, ContainerModule } from 'inversify'
import { RouteConfig } from 'vue-modules/types/index'
import { Module as VuexModule, ModuleTree } from 'vuex/types/index'

export function AppModule (registry: ModuleRegistry) {
  return function _AppModule (target: ModuleConstructor): ModuleConstructor {
    return <typeof target><ModuleConstructor> class extends target {
      constructor () {
        super()
        this.name = registry.name
        this.moduleObservers = (
          registry.hasOwnProperty('observers') &&
          typeof registry.observers !== 'undefined' &&
          Array.isArray(registry.observers)
        ) ? registry.observers : null

        this.moduleProviders = (
          registry.hasOwnProperty('providers') &&
          typeof registry.providers !== 'undefined'
        ) ? registry.providers : null

        this.moduleRoutes = (
          registry.hasOwnProperty('routes') &&
          typeof registry.routes !== 'undefined'
        ) ? registry.routes : []

        this.moduleState = (
          registry.hasOwnProperty('state') &&
          typeof registry.state !== 'undefined'
        ) ? registry.state : {}
      }
    }
  }
}

export interface IModule {
  observers: () => symbol[]
  providers: () => ProviderConfig|null
  routes: (container: Container) => RouteConfig[]
  state: (container: Container) => VuexModule<any, any>|null
}

export type IModuleConstructor = new () => IModule

export interface IModulesBootstraper {
  resolvedProviders (): ProviderConfig[]
  resolvedRouting (): RouteConfig[]
  resolvedStates (): ModuleTree<any>
  setContainer (container: Container): void
}

export abstract class Module implements IModule {
  name: string|null = null
  moduleObservers: symbol[]|null = null
  moduleProviders: ProviderConfig|null = null
  moduleRoutes: RoutesFactory|RouteConfig[]|null = null
  moduleState: StoreFactory|VuexModule<any, any>|null = null

  observers (): symbol[] {
    if (typeof this.moduleObservers === 'undefined' || this.moduleObservers === null) {
      return []
    }

    return this.moduleObservers
  }

  providers () : ProviderConfig|null {
    return this.moduleProviders
  }

  routes (container: Container): RouteConfig[] {
    if (typeof this.moduleRoutes === 'undefined' || this.moduleRoutes === null) {
      return []
    }

    const routes: RouteConfig[] = typeof this.moduleRoutes === 'function'
      ? this.moduleRoutes(container) : this.moduleRoutes

    return routes.map(item => {
      if (this.name !== null && this.name.length && item.hasOwnProperty('name')) {
        item.name = `${this.name}.${item.name}`
      }

      return item
    })
  }

  state (container: Container): ModuleTree<any>|null {
    if (typeof this.moduleState === 'undefined' || this.moduleState === null) {
      return null
    }

    const state: ModuleTree<any> = {}
    state[this.name as string] = typeof this.moduleState === 'function'
      ? this.moduleState(container) : this.moduleState

    return state
  }
}

type ModuleConstructor = new () => Module

export interface ModuleRegistry {
  name: string
  observers?: symbol[]
  providers?: ProviderConfig
  routes?: RoutesFactory|RouteConfig[]
  state?: StoreFactory|VuexModule<any, any>
}

export interface ProviderConfig {
  module: ContainerModule|AsyncContainerModule
  type: ProviderType
}

export enum ProviderType {
  Async = 'async',
  Sync = 'sync'
}

export type RoutesFactory = (container: Container) => RouteConfig[]

export type StoreFactory = (container: Container) => VuexModule<any, any>
