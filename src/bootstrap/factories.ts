import { Container } from '@/container'
import { RouterDriver, StoreDriver } from '@/contracts/bootstrapper'
import { VuexBootstrapper } from '@/bootstrap/drivers/vuex-bootstrapper'
import { VueRouterBootstrapper } from '@/bootstrap/drivers/vue-router-bootstrapper'

export const routerFactory = (routerType: RouterDriver, container: Container): any => {

  switch (routerType) {
    case RouterDriver.VueRouter:
      return new VueRouterBootstrapper(container)
    default:
      throw new Error(`Unsupported router driver [${routerType}].`)
  }
}

export const storeFactory = (storeType: StoreDriver, container: Container ): any => {
  switch (storeType) {
    case StoreDriver.Vuex:
      return new VuexBootstrapper(container)
    default:
      throw new Error(`Unsupported state driver [${storeType}].`)
  }
}

