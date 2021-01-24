import { RouterDriver, StoreDriver } from '../contracts/bootstrapper';
import { Container } from '../container';
/**
 * Decide which of predefined router driver to use.
 */
export declare const routerFactory: (routerType: RouterDriver, container: Container) => any;
/**
 * Decide which of predefined store driver to use.
 */
export declare const storeFactory: (storeType: StoreDriver, container: Container) => any;
