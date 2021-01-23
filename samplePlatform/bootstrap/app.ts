import { Bootstrapper } from '@/bootstrapper'
import { Container } from '@/container'

import { config } from '../config'
import { createRouter, RouteConfig } from './router'
import { createStore, StoreModules } from './store'

export const createApp: any = async () => {
  const bootstrapper = new Bootstrapper(config)
  await bootstrapper.boot()

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
