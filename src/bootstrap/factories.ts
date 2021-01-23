import { Container } from '@/container'
import { RouterDriver, StoreDriver } from '@/contracts/bootstrapper'

import { VuexBootstrapper } from './drivers/vuex-bootstrapper'
import { VueRouterBootstrapper } from './drivers/vue-router-bootstrapper'

/**
 * Decide which of predefined router driver to use.
 */
export const routerFactory = (routerType: RouterDriver, container: Container): any => {
  switch (routerType) {
    case RouterDriver.VueRouter:
      return new VueRouterBootstrapper(container)
    default:
      throw new Error(`Unsupported router driver [${routerType}].`)
  }
}

/**
 * Decide which of predefined store driver to use.
 */
export const storeFactory = (storeType: StoreDriver, container: Container ): any => {
  switch (storeType) {
    case StoreDriver.Vuex:
      return new VuexBootstrapper(container)
    default:
      throw new Error(`Unsupported store driver [${storeType}].`)
  }
}
