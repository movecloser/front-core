import { AppConfig, RouterDriver, StoreDriver } from '@/contracts/bootstrapper'

import { modules } from './modules'

export const config: AppConfig = {
  router: RouterDriver.VueRouter,
  store: StoreDriver.Vuex,
  modules,
}
