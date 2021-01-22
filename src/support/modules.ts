import { Container } from 'inversify'
import { ProvidersFactory } from '@/contracts/bootstrapper'

export function AppModule<C> (registry: ModuleRegistry<C>) {
  return function _AppModule (target: ModuleConstructor<C>): IModuleConstructor<C> {
    return <typeof target><ModuleConstructor<C>> class extends target {
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

export interface IModule<C> {
  observers: symbol[]
  providers: ProvidersFactory<C>|null
  routes: RoutesFactory|null
  state: StoreFactory|null
}

export type IModuleConstructor<C> = new () => IModule<C>

export abstract class Module<C> implements IModule<C> {
  name: string|null = null
  observers: symbol[] = []
  providers: ProvidersFactory<C>|null = null
  routes: RoutesFactory|null = null
  state: StoreFactory|null = null
}

type ModuleConstructor<C> = new () => Module<C>

export interface ModuleRegistry<C> {
  name: string
  observers?: symbol[]
  providers?: ProvidersFactory<C>
  routes?: RoutesFactory
  state?: StoreFactory
}

export type  RoutesFactory = (container: Container) => any

export type StoreFactory = (container: Container) => any
