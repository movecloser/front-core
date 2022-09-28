import { Container } from '../container';
import { RouterDriver, StoreDriver } from '../contracts/bootstrapper';
import { IConfiguration } from '../contracts';
/**
 * Decide which of predefined router driver to use.
 */
export declare const routerFactory: (routerType: RouterDriver, container: Container, configuration?: IConfiguration | undefined) => any;
/**
 * Decide which of predefined store driver to use.
 */
export declare const storeFactory: (storeType: StoreDriver, container: Container) => any;
