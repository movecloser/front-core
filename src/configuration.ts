import { AppConfig } from '@/contracts/bootstrapper'

export class Configuration implements IConfiguration {
  constructor (private config: AppConfig) {}

  byFile (name: string): any {
    if (!this.config[name]) {
      throw new Error(`Key ${name} is not a valid config key`)
    }

    return this.config[name]
  }

  byKeys (key: string, shouldThrow: boolean = true, defaultValue: any = null): ConfigurationValue {
    const keys: string[] = key.split('.')
    //

    return {}
  }

  public toObject (): AppConfig {
    return this.config
  }
}


type ConfigurationFile = string|number|boolean|ConfigurationObject

type ConfigurationValue = ConfigurationObject

interface ConfigurationObject {
  [key: string]: any
}
export interface IConfiguration {
  byFile (name: string): ConfigurationFile
  toObject (): AppConfig
}

