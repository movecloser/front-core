import { LazyExoticComponent } from 'react';
import { IUser } from '../../../contracts';
export interface GuardUser extends IUser {
    canAccess(module: string): boolean;
    canPerform(action: string): boolean;
}
export interface ModuleRoute {
    accessor?: string;
    layout: (props?: any) => JSX.Element;
    prefix: string;
    routes: RouteConfig[];
    skipGlobalPrefix?: boolean;
    strict?: boolean;
}
export interface RouteConfig {
    path: string;
    component?: ((props?: any) => JSX.Element) | LazyExoticComponent<any>;
    guard?: <User extends GuardUser = GuardUser>(auth: User) => boolean;
    meta?: RouteMeta;
    redirect?: string;
}
export interface RouteMeta {
    [key: string]: any;
}
export interface RoutesFactoryProps {
    auth?: GuardUser;
    errorPage?: (props?: any) => JSX.Element;
    fallBackUrl?: string;
    globalPrefix?: string;
    moduleRoutes: ModuleRoute[];
    useGuards: boolean;
}
export interface RoutesModuleProps {
    auth?: GuardUser;
    errorPage?: (props?: any) => JSX.Element;
    layout: (props?: any) => JSX.Element;
    prefix: string;
    routes: RouteConfig[];
    strict: boolean;
    useGuards: boolean;
}
