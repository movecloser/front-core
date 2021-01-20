import { Container } from 'inversify'

import { Bootstraper } from '@/bootstrapper'
import { config } from '../config'

import { createRouter, RouteConfig } from './router'
import { createStore, StoreModules } from './store'

export const createApp: any = () => {
  const bootstrapper = new Bootstraper(config)
  bootstrapper.boot()

  const container: Container = bootstrapper.getContainer()

 return {
    container,
    router: createRouter(
      container,
      bootstrapper.getRoutesStack() as RouteConfig[]
    ),
    store: createStore(
      container,
      bootstrapper.getStoreStack() as StoreModules
    )
 }
}
