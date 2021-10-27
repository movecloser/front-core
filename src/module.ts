/*
 * Copyright (c) 2021 Move Closer
 */

import { BootMethod, ContainerFactory, ProvidersFactory } from './contracts/bootstrapper'

/**
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */

/* istanbul ignore next */
export function AppModule (registry: ModuleRegistry) {
  return function _AppModule (target: ModuleConstructor): IModuleConstructor {
    return <typeof target><ModuleConstructor>class extends target {
      constructor () {
        super()
        this.name = registry.name

        this.boot = (
          registry.hasOwnProperty('boot') &&
          typeof registry.boot !== 'undefined'
        ) ? registry.boot : null

        this.providers = (
          registry.hasOwnProperty('providers') &&
          typeof registry.providers !== 'undefined'
        ) ? registry.providers : null

        this.providersAsync = (
          registry.hasOwnProperty('providersAsync') &&
          typeof registry.providersAsync !== 'undefined'
        ) ? registry.providersAsync : false

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
  boot: BootMethod | null
  name: string
  providers: ProvidersFactory | null
  providersAsync: boolean
  routes: RoutesFactory | null
  state: StoreFactory | null
}

export type IModuleConstructor = new () => IModule

export abstract class Module implements IModule {
  boot: BootMethod | null = null
  name: string = ''
  providers: ProvidersFactory | null = null
  providersAsync: boolean = false
  routes: RoutesFactory | null = null
  state: StoreFactory | null = null
}

type ModuleConstructor = new () => Module

export interface ModuleRegistry {
  boot?: BootMethod
  name: string
  providers?: ProvidersFactory
  providersAsync?: boolean
  routes?: RoutesFactory
  state?: StoreFactory
}

export type RoutesFactory = ContainerFactory
export type StoreFactory = ContainerFactory
