import { AppConfig } from '@/contracts/bootstrapper'
import { IConfiguration } from '@/contracts/configuration'

export class Configuration implements IConfiguration {
  constructor (private config: AppConfig) {}

  byFile<Expected>(name: string): Expected {
    if (!this.config[name]) {
      throw new Error(`Key [${name}] is not a valid config key.`)
    }

    return this.config[name] as Expected
  }

  byKey<Expected>(path: string, shouldThrow: boolean = true, defaultValue: any = null): Expected {
    const keys: string[] = path.split('.')
    let temp = this.config

    for (const key of keys) {
      if (!temp.hasOwnProperty(key)) {
        throw new Error(`Key [${key}] is not a valid config key.`)
      }

      temp = temp[key]
    }

    return temp as Expected
  }

  has (file: string): boolean {
    return file in this.config
  }

  public toObject (): AppConfig {
    return this.config
  }
}
