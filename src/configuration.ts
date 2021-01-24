import { AppConfig } from './contracts/bootstrapper'
import { IConfiguration } from './contracts/configuration'

/**
 * Configuration is config files holder.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
export class Configuration implements IConfiguration {
  constructor (private config: AppConfig) {
  }

  /**
   * Returns file (top level section) of configuration.
   * @param name
   */
  public byFile<Expected> (name: string): Expected {
    if (!this.config[name]) {
      throw new Error(`Key [${name}] is not a valid config key.`)
    }

    return this.config[name] as Expected
  }

  /**
   *  Provides access to config by given key.
   *  Key is string consisting of keys connected by dots.
   *  'http.base.url' or 'router.mode'
   */
  public byKey<Expected> (
    key: string,
    shouldThrow: boolean = true,
    defaultValue: any = null
  ): Expected {
    if (key.length === 0) {
      throw new Error('Given key is empty.')
    }

    let foundValue: any = this.config

    const keys: string[] = key.split('.')
    for (const k of keys) {
      if (foundValue.hasOwnProperty(k) && typeof foundValue[k] !== 'undefined') {
        foundValue = foundValue[key]
        continue
      }

      if (shouldThrow) {
        throw new Error(`Key [${k}] is not a valid config key.`)
      }

      foundValue = defaultValue
      break
    }

    return foundValue as Expected
  }

  /**
   * Returns true if given filename exists in config's top level structure.
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
