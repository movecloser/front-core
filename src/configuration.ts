import { AppConfig } from '@/contracts/bootstrapper'
import { IConfiguration } from '@/contracts/configuration'

export class Configuration implements IConfiguration {
  constructor (private config: AppConfig) {}

  byFile<Expected>(name: string): Expected {
    if (!this.config[name]) {
      throw new Error(`Key ${name} is not a valid config key`)
    }

    return this.config[name]
  }

  byKey<Expected>(key: string, shouldThrow: boolean = true, defaultValue: any = null): Expected {
    const keys: string[] = key.split('.')
    //

    return {} as Expected
  }

  has (file: string): boolean {
    return file in this.config
  }

  public toObject (): AppConfig {
    return this.config
  }
}
