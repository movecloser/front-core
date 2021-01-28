export interface GuardUser {
  canAccess (module: string): boolean
  canPerform (action: string): boolean
}

export interface ModuleRoute {
  accessor?: string
  layout: (props?: any) => JSX.Element
  prefix: string
  routes: RouteConfig[]
}

export interface RouteConfig {
  path: string
  component?: (props?: any) => JSX.Element
  guard?: (auth: GuardUser) => boolean
  meta?: RouteMeta
  redirect?: string
}

export interface RouteMeta {
  [key: string]: any
}

export interface RoutesFactoryProps {
  auth?: GuardUser
  errorPage?: (props?: any) => JSX.Element
  moduleRoutes: ModuleRoute[]
  useGuards: boolean
}

export interface RoutesModuleProps {
  auth?: GuardUser
  errorPage?: (props?: any) => JSX.Element
  layout: (props?: any) => JSX.Element
  prefix: string
  routes: RouteConfig[]
  useGuards: boolean
}