import { AppConfig, RouterDriver, StoreDriver } from '@/contracts/bootstrapper'

import { modules } from './modules'
import { interfaces } from 'inversify'
import ContainerModuleCallBack = interfaces.ContainerModuleCallBack

export const config: AppConfig<ContainerModuleCallBack> = {
  router: RouterDriver.VueRouter,
  store: StoreDriver.Vuex,
  modules,
}
