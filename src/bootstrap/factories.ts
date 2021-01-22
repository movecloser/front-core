import { RouterDriver, StoreDriver } from '@/contracts/bootstrapper'
import { VuexBootstrapper } from '@/bootstrap/drivers/vuex-bootstrapper'

export const routerFactory = (routerType): any => {

  switch (routerType) {
    case RouterDriver.VueRouter:
      return new //
    default:
      throw new Error(`Unsupported router driver [${routerType}].`)
  }
}

export const storeFactory = (storeType): any => {
  switch (storeType) {
    case StoreDriver.Vuex:
      return new VuexBootstrapper()
    default:
      throw new Error(`Unsupported state driver [${storeType}].`)
  }
}

