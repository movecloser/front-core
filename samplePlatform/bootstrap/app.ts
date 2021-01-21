import { Container } from 'inversify'

import { Bootstrapper } from '@/bootstrapper'
import { config } from '../config'
import { Platform } from '@/contracts/bootstrapper'

import { createRouter, RouteConfig } from './router'
import { createStore, StoreModules } from './store'

export const createApp: any = () => {
  const bootstrapper = new Bootstrapper(config, Platform.Vue)
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
