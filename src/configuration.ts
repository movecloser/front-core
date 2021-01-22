import { AppConfig } from '@/contracts/bootstrapper'
import { IConfiguration } from '@/contracts/configuration'

export class Configuration implements IConfiguration {
  constructor (private config: AppConfig) {}

  /**
   * Returns file (top level section) of configuration.
   * @param name
   */
  public byFile<Expected>(name: string): Expected {
    if (!this.config[name]) {
      throw new Error(`Key [${name}] is not a valid config key.`)
    }

    return this.config[name] as Expected
  }

  /**
   *  Provides access to config by given key.
   *  Key is string consisting of keys connected by dots.
   *  'http.base.url' or 'router.mode'
   * @param key
   * @param shouldThrow
   * @param defaultValue
   */
  public byKey<Expected>(key: string, shouldThrow: boolean = true, defaultValue: any = null): Expected {
    const keys: string[] = key.split('.')
    let temp = this.config

    for (const k of keys) {
      if (!temp.hasOwnProperty(k)) {
        throw new Error(`Key [${k}] is not a valid config key.`)
      }

      temp = temp[key]
    }

    return temp as Expected
  }

  /**
   * Returns true if given filename exists in config's top level structure.
   * @param file
   */
  public has (file: string): boolean {
    return file in this.config
  }

  /**
   * Returns complete configuration as single object.
   */
  public toObject (): AppConfig {
    return this.config
  }
}
