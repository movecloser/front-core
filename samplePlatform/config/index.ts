import { AppConfig } from '../../src/contracts/bootstrapper'

import { modules } from './modules'
import { test } from './test'

export const config: AppConfig = {
  router: 'vue-router',
  store: 'vuex',
  modules,
  test
}
