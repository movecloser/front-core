import {Bootstraper as AbstractBootstraper} from '@/support/bootstrapper'
import globalConfig from '../../../config'

export class Bootstraper extends AbstractBootstraper {
 // constructor (appConfig: AppConfig) {}
}

new Bootstraper(globalConfig)

interface AppConfig {
  [key: string]: any,
  router:
}
