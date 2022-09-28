// Copyright (c) 2021 Move Closer

import { Container } from '../container'
import { RouterDriver, StoreDriver } from '../contracts/bootstrapper'
import { NoneBootstrapper } from './drivers/none-bootstrapper'
import { ReactRouterBootstrapper } from './drivers/react-router-bootstraper'
import { VueRouterBootstrapper } from './drivers/vue-router-bootstrapper'
import { VuexBootstrapper } from './drivers/vuex-bootstrapper'
import { IConfiguration } from '../contracts'

/**
 * Decide which of predefined router driver to use.
 */
/* istanbul ignore next */
export const routerFactory = (routerType: RouterDriver, container: Container, configuration?: IConfiguration): any => {
  switch (routerType) {
    case RouterDriver.VueRouter:
      return new VueRouterBootstrapper(container, configuration)
    case RouterDriver.ReactRouter:
      return new ReactRouterBootstrapper(container)
    case RouterDriver.None:
      return new NoneBootstrapper()
    default:
      throw new Error(`Unsupported router driver [${routerType}].`)
  }
}

/**
 * Decide which of predefined store driver to use.
 */
/* istanbul ignore next */
export const storeFactory = (storeType: StoreDriver, container: Container): any => {
  switch (storeType) {
    case StoreDriver.Vuex:
      return new VuexBootstrapper(container)
    case StoreDriver.None:
      return new NoneBootstrapper()
    default:
      throw new Error(`Unsupported store driver [${storeType}].`)
  }
}
