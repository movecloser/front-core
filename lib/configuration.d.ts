import { AppConfig } from './contracts/bootstrapper';
import { IConfiguration } from './contracts/configuration';
/**
 * Configuration is config files holder.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
export declare class Configuration implements IConfiguration {
    private config;
    constructor(config: AppConfig);
    /**
     * Returns file (top level section) of configuration.
     * @param name
     */
    byFile<Expected>(name: string): Expected;
    /**
     *  Provides access to config by given key.
     *  Key is string consisting of keys connected by dots.
     *  'http.base.url' or 'router.mode'
     */
    byKey<Expected>(key: string, shouldThrow?: boolean, defaultValue?: any): Expected;
    /**
     * Returns true if given filename exists in config's top level structure.
     */
    has(file: string): boolean;
    /**
     * Returns complete configuration as single object.
     */
    toObject(): AppConfig;
}
