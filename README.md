# 🎯 Front-Core [![GitHub version](https://badge.fury.io/gh/movecloser%2Ffront-core.svg)](https://badge.fury.io/gh/movecloser%2Ffront-core)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

### **Front-Core** is micro-framework that enables rapid development of a complex web applications.

This package is a summary of our development experience. It contains a set of functionalities that were missing at the beginning of each project and which we often implemented anew.
The included solutions should help in developing scalable and maintainable code.

The base concept is composed around the app modules - a small part of a context. **Front-Core** is 
built as UI library agnostic, so it fits to several solutions well.

### Supported UI Libraries

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)

### Core functionalities and concepts offered by the **Front-Core**:
- **IoC container** to resolve dependency injection across whole project (using inversify).
- Implementation of **repository pattern** to help abstract data sources and business logic.
- Classes for **Models** and **Collections** - helping to organize the application logic around 
  the provided data.
- Adapters for mapping **request** and **response** payload, which help to ensure greater code 
  stability and independence of external services. 
- **Validation service** - support for stream-based validation.
- **AuthService** - A service responsible for user authorization and token management.
- Number of auxiliary classes such as **Local Storage** (access to browser memory), **Datetime** 
  (date manipulation), **Filter Parser** (parsing query string from object) & even more.
---

## 🔗 Quick Links
- [Bootstrapping](#-bootstrapping)
- [Modules](#-modules)
- [Config](#-config)
- [IoC](#-ioc)
- [Models & Collections](#-models--collections)
- [Http Connector](#-http-connector)
- [Services](#-services)
- [License](#-license)
- [Made by](#-made-by)

 ## 📚Main Concepts

## ⚪ Bootstrapping
How to start?

**Sample app booting configuration (with Router & State Manager, without UI lib)**

```typescript
export interface BootedApp {
  configuration: IConfiguration
  container: Container
  routes: RoutesStack
  store: StoreStack
}

export async function createApp (): Promise<BootedApp> {
  const bootstrapper = new Bootstrapper(config)
  await bootstrapper.boot()

  const configuration: IConfiguration = bootstrapper.getConfiguration()
  const container: Container = bootstrapper.getContainer()
  const routes: RoutesStack = bootstrapper.getRoutesStack()
  const store: StoreStack = bootstrapper.getStoreStack()

  return { configuration, container, routes, store }
}
```

```typescript
createApp().then((context: BootedApp) => {
  const { configuration, container, routes, store } = context
  ...
}
```

**Another sample app config (Vue.js)**

```typescript

import { Bootstrapper, Container, IConfiguration } from '@movecloser/front-core'
import VueRouter, { RouteConfig } from 'vue-router'

import { config } from '@/config'
import { createRouter } from '@/bootstrap/router'

export interface BootedApp {
  configuration: IConfiguration
  container: Container
  router: VueRouter
}

export async function createApp (): Promise<BootedApp> {
  const bootstrapper = new Bootstrapper(config)
  await bootstrapper.boot()

  const configuration: IConfiguration = bootstrapper.getConfiguration()
  const container: Container = bootstrapper.getContainer()

  const router = createRouter(
    bootstrapper.getRoutesStack() as RouteConfig[]
  )

  return { configuration, container, router }
}

```

Key difference is that Vue will create router instance at this point.

```typescript

import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

/**
 * Creates router instance with all add-ons.
 */
export const createRouter = (
  routes: RouteConfig[]
): VueRouter => {
  const baseUrl = config.baseUrl
  const router = new VueRouter({
    base: baseUrl,
    mode: 'history',
    routes
  })
  
  // Sample VueRouter hook.
  router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
    ...
  })

  return router
}
```

##### Starting new instance of Vue

```typescript
import 'reflect-metadata'
import Vue from 'vue'

import { createApp } from '@/bootstrap/app'
import App from './App.vue'

createApp().then((app: BootedApp) => {
  const { configuration, container, router } = app

  new Vue({
    router,
    container,
    configuration,
    render: h => h(App)
  }).$mount('#app')
})

```

##### Properties of `BootedApp` object

- `configuration` - Configuration is a list of all registered config files. Can be passed down the tree of application components, providing access to all application config variables.
- `container` - Container contains registered dependencies. Must be accessible in order to resolve injectable services at component level.
- `routes` - List of routes collected from each [module](#modules) of application. Should be passed to application router, as many libraries doesn't allow modifying route list at runtime.

[![](https://img.shields.io/badge/back%20to%20top-%E2%86%A9-blue)](#-quick-links)
## ⚪ Modules

Front-core supports the development of applications with a clear division into modules - i.e. specialized fragments that perform specific tasks in the system.
The module may consist of a separate models, services, repositories, own ui with corresponding routing and necessary helpers. The module is created with typescript decorator function.

**Sample module declaration for User module.**

```typescript

@AppModule({
  name: 'user',
  providers: (config: IConfiguration) => {
    return (bind: Interfaces.Bind) => {
      bind<IUsersRepository>(UsersRepositoryType).to(UsersRepository)
    }
  },
  boot: (container: Container) => {
    const connector: IConnector = container.get(ApiConnectorType)
    connector.useResources(apiResources)
  },
  routes: routesFactory
})
export class UserModule extends Module {}
```

##### Properties:
- `name` - Name of module.
- `providers` - Factory function, which registers dependencies specific for this module.
- `boot` -  Function to be executed, as module is mounted to app.
- `routes` - Factory function returning array of module routes (as RouteConfig) to register in application router.
- `state` - Factory function returning a partial of your state management (e.g. Vuex).

---

### Router
To enable router, there must be present additional field in config.

At this moment, router is available for React and Vue.js.
```typescript
export const config: AppConfig = {
  ...
  router: RouterDriver.ReactRouter, ()
  ...
}
```

##### Available Router Drivers
```typescript
export declare enum RouterDriver {
    None = "none",
    ReactRouter = "react-router",
    VueRouter = "vue-router"
}
```
##### Example of Router implementation in Vue
When creating new app in Vue, you must pass whole router instance. This step is mandatory only in vue.
```typescript
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

/**
 * Creates router instance with all add-ons.
 */
export const createRouter = (
  routes: RouteConfig[]
): VueRouter => {
  const baseUrl = config.baseUrl
  const router = new VueRouter({
    base: baseUrl,
    mode: 'history',
    routes
  })

  return router
}
```

##### Example of Router implementation in React
```typescript
import React, { Suspense, useContext, useEffect } from 'react'
import { BrowserRouter, Redirect } from 'react-router-dom'
import { RoutesFactory } from '@movecloser/front-core/lib/platforms/react'

import { AppContext } from './context'
import { LoaderScreen } from './LoaderScreen'

export function App () {
  const { isBooting, routes, configuration } = useContext(AppContext)
  
  return isBooting
    ? <LoaderScreen/>
    : (<Suspense fallback={<LoaderScreen/>}>
        <BrowserRouter>
          <RoutesFactory
            fallBackUrl={configuration.authRoute}
            moduleRoutes={routes || []}
            globalPrefix='/app'
          />
              
        </BrowserRouter>
              
      </Suspense>
    )
}
```
[![](https://img.shields.io/badge/back%20to%20top-%E2%86%A9-blue)](#-quick-links)
## ⚪ Config


Config is designed to merge all available application parameters in one place.
It can be API configuration, access keys to external services, or global settings for used dependencies.

**Example of `index` config for entire app.**
```typescript
export const config: AppConfig = {
  appRoute: '/app',
  alerts,
  auth,
  http,
  loginRoute: '/auth/login',
  modals,
  modules,
  navigation,
  resources,
  router: RouterDriver.ReactRouter,
  store: StoreDriver.None,
  services,
  toasts,
}
```
**Example of simple config file.**

Here the configuration file is used to manage settings that would otherwise be scattered throughout the application.

Centralized configuration helps to organize the code and achieve a better separation of responsibilities.

```typescript
export const toasts: ToastOptions = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined
}
```

**Example of `service` object from configuration, where number of generic services are registered.**

What is important - inside config file You can access other configs.
```typescript
export const services: ProvidersFactory = (config: IConfiguration) => {
  return (bind: Interfaces.Bind) => {
    bind<IAlertsRepository>(AlertsRepositoryType).to(AlertsRepository)

    bind<IAlertsService>(AlertsServiceType).toDynamicValue((context: Interfaces.Context) => {
      return new AlertsService(
        config.byFile('alerts'),
        context.container.get(AlertsRepositoryType),
        context.container.get<WindowService>(WindowType)
      )
    }).inSingletonScope()

    bind<INotificationsRepository>(NotificationsRepositoryType).to(NotificationsRepository)

    bind<INotificationsService>(NotificationsServiceType).toDynamicValue((context: Interfaces.Context) => {
      return new NotificationsService(
        context.container.get(AuthServiceType),
        context.container.get(NotificationsRepositoryType)
      )
    }).inSingletonScope()
  }
}
```

[![](https://img.shields.io/badge/back%20to%20top-%E2%86%A9-blue)](#-quick-links)
## ⚪ IoC
This package supports dependency injection. It is achieved with help of [inversify](https://inversify.io/).
The IoC mechanism helps to get closer to the object-oriented programming paradigm and the SOLID guidelines.
Thanks to this mechanism, it is possible to manage dependencies at the highest level of the application. In addition, it facilitates testing of individual business logic components and reduces the architectural complexity caused by external dependencies.

**Declaration of injectable service**
```typescript
@Injectable()
export class UsersService {
  ...
}
```

**Declaration of service identifier.**
Symbol helps ensure uniqueness of key.
```typescript
const UsersServiceType = Symbol.for("UsersService") 
```

**Registration of service**
```typescript
bind<IUsersService>(UsersServiceType).to(UsersService)
```

**Registration at module level**
```typescript
@AppModule({
  name: 'users',
  providers: () => {
    return (bind: Interfaces.Bind) => {
      // Here you can register your services
      bind<IUsersService>(UsersServiceType).to(UsersService)
    }
  },
  boot: (container: Container) => {
    // Here is examople of resolved dependency. 
    // ApiConnectorType is registered at project level.
    const connector: IConnector = container.get(ApiConnectorType)
    connector.useResources(apiResources)
  },
  routes: routesFactory,
  ...
})
export class AuthModule extends Module {}
```

Usage in code

```typescript
// Here, to variable `service` will be assigned service resolved after provided identifier
const service = container.get<Interface>(identifier)
```

Example using Inject decorator in vue
```typescript
import { Inject } from '@plugin/inversify'

@Component()
export default class App extends Vue {
  @Inject(UserServiceType)
  private userService!: IUserService
  ...
  
}
```


For issues with DI please visit [inversify wiki page](https://github.com/inversify/InversifyJS/blob/master/wiki/readme.md)

[![](https://img.shields.io/badge/back%20to%20top-%E2%86%A9-blue)](#-quick-links)
## ⚪ ️Models & Collections

Models are a concept borrowed from backend frameworks.
They serve as a extension of objects which, from the perspective of the system, have their own identity.
Models can have properties and methods.
Properties can be secured against adding invalid records.
You can also set default values ​​for your model.

### Magic and  Non-magic models.

A new model instance can be created in one of two ways:
1. `Model.create ()`
2. `new Model ()`

The method of creation is important for the later behavior of the model.

In the case of the first option (static `create` method), the so-called Magic Model. It is a version that uses the proxy mechanism to use dot notation. In this case, not only methods but also model properties can be accessed using the dot.

Alternatively, a Non-magic Model will be created. The main difference is that you cannot use a dot to retrieve model values. Instead, use the `get` and `set` methods.

We recommend creating models using the `create` factory method whenever the requirements for a 
supported browser do not disqualify the use of the [Proxy object](https://caniuse.com/proxy).

### Basic Implementation:

```typescript
export interface UserData {
  avatar?: Avatar
  id?: string
  firstName: string
  lastName: string
}

export interface IUser extends IModel<UserData> {
  fullName (): string
}

export class User extends Model<UserData> implements IUser {
  protected boot (): void {
    this.initialValues = {}

    this.modelProperties = [
      'avatar',
      'firstName',
      'id',
      'lastName',
    ]
  }
  
  public fullName (): string {
    return `${this._data.firstName} ${this._data.lastName}`
  }
}

User.hydrate<UserModel>({ ...data })

new User(data)

```

##### Properties:
- `initialValues`: ModelPayload = {} - List of values to be set as default for given model.

- `modelProperties`: string[] - List of allowed properties - should reflect contract for model data. Values not present in that list will be ignored by model.

- `_data`: ModelPayload = {} - Internal property that stores actual Payload of Model.

##### Methods:

- `boot` (): void - Abstract Method, that is called from Constructor. This is where **initialValues** and **modelProperties** can be set.

- `applyIntention`<Payload extends object>(intention: IIntention<Payload>) - Provides way to update model data with intention, which is helper class used to perform various actions.

- `clone`<T>(): T - Returns Instance of current model with cloned data.

- `create`<T extends object, M extends IModel<T> = IModel<T>> (payload: ModelPayload = {}): Model<T, M>` - Static method used to instantiate new Models.

- `get` (property: string, defaultValue: any = null): any - Accessor for model properties. Alternative to dot notation.

- `hasOne`<R> (model: ModelConstructor<R>, value: ModelPayload) - This method allows model to establish relation to another model. This is useful, when accurate representation of data should include nested objects. Model contains data which has own identity (for example: User model contains ShippingAddressModel and OrganizationModel)

- `hasMany`<R> (model: ModelConstructor<R>, values: ModelPayload[]) - This method allows model to establish relation to another model, but indicates multiplicity.

- `hydrate`<T extends object, M extends IModel<T> = IModel<T>> (payload: ModelPayload): Model<T, M>` - Method for inserting data into previously created models.

- `set` (property: string, value: any): boolean - Setter for model properties. Alternative to dot notation.

- `toObject` (): T - Method that returns payload of Model as plain object.

---

### Collections
Collection is an extension of classic Array with some new features and Model awareness.
They are used by wrap multiple similar objects or [Models](#models)

```typescript
new Collection<UserModel>(newUsers, newUsersMeta)
```

##### Properties:

- `meta` - Meta is used to preserve optional meta-information about stored data, like resource pagination, request query or applied filters.

##### Methods:

- `first` (): T -  Returns first element of collection.

- `getItem` (callback: Function): T | false - Returns element of collection, which fulfills the condition specified in callback.

- `hasItem` (callback: Function): boolean - Returns true when in collection exists element fulfilling the condition specified in callback.

- `hasItems` (): boolean - Checks if collection has any elements.

- `isEmpty` (): boolean - Checks if collection has no elements.

- `last` (): T | false - Returns last element of collection.

---

### Adapters
The adapter is an auxiliary class for mapping objects from external sources to a format supported by the application.
It helps to become invulnerable to unexpected changes in external services, what results in increased security.

Our experience shows that adapters are especially helpful during development - when you need to mock inaccessible values.
Additionally, it helps with debugging by allowing you to overwrite individual object values.
Thanks to this, it is easier to reproduce scenarios in which, for example, API does not return data correctly, or the returned types are no longer supported.

**Sample mapping config:**

```typescript
import { MappingConfig, MappingTypes } from '@movecloser/front-core'

import { organizationAdapterMap } from 'organization.adapter'
import { formatAddress } from 'helpers'

export const userAdapterMap: MappingConfig = {
  avatar: 'avatar',
  email: 'email',
  firstName: 'firstName',
  id: 'id',
  lastName: 'lastName',
  address: {
    type: MappingTypes.Function,
    value: item => {
      return formatAddress(item.address)
    },
  },
  phone: 'phoneNumber',
  organization: {
    type: MappingTypes.Adapter,
    map: organizationAdapterMap,
    value: 'organization'
  },
  createdAt: 'created_at'
}
```
##### Adapter types:
- `Simple` - Basic change of key without altering value.
- `Function` - Can be used to transform value.
- `Adapter` - Suitable for mapping complex objects.

##### Adapted class methods:

- `mapCollection`<T> (toMap: any[], mapping: MappingConfig, preserve: boolean = true) - To convert array of objects into mapped collection.
- `mapModel`<T> (toMap: any, mapping: MappingConfig, preserve: boolean = true): T - To convert single item into mapped object.
- `mapIntention`<T> (toMap: any, mapping: MappingConfig): T - Opposite mechanizm to basic adapted. Intentions are meant to be transforming objects to shape required by external services. This mapping is usually performed before sending HTTP request which requires specific data structure. 

`preserve` flag is used to determine how to handle original payload provided for mapping. If false, values not mentioned in mapping configuration will be omitted.

[![](https://img.shields.io/badge/back%20to%20top-%E2%86%A9-blue)](#-quick-links)
## ⚪ HTTP

The Http class is built as a universal wrapper for the http query client.
It helps to keep the implementation separate from the application's business logic.
Thanks to this, the application can utilize many connections with different configurations (e.g. working with data from different REST APIs or integrating several systems).

In fact, queries are executed using an instance of a specific http client (eg [Axios] (https://github.com/axios/axios)) that fulfills the IHttp contract.

Such a structure allows not only to use many connections in parallel,
but also does not limit the use of one library responsible for query execution.

##### Http Connector interfaces

```typescript
export interface IHttpConnector {
  defaultDestination (): string
  destination (destination: string): IHttp
  register (name: string, driver: IHttp, setAsDefault?: boolean): void
  setDefaultDestination (name: string): void
  delete (target: string, data?: Payload, headers?: Headers, options?: any): Promise<IResponse>
  get (target: string, params?: Payload, headers?: Headers, options?: any): Promise<IResponse>
  post (target: string, data?: Payload, headers?: Headers, options?: any): Promise<IResponse>
  put (target: string, data?: Payload, headers?: Headers, options?: any): Promise<IResponse>
}
```

##### Interfaces

```typescript
export interface IHttpConstructors {
  [key: string]: IHttpConstructor
}

export interface IHttpConnectorConfig {
  default: string
  drivers: IHttpConstructors,
}

export type IHttpConstructor = () => IHttp

export interface IHttp {
  delete (target: string, data?: Payload, headers?: Headers, options?: any): Promise<IResponse>
  get (target: string, params?: Payload, headers?: Headers, options?: any): Promise<IResponse>
  post (target: string, data?: Payload, headers?: Headers, options?: any): Promise<IResponse>
  put (target: string, data?: Payload, headers?: Headers, options?: any): Promise<IResponse>
}
```

---
### Connections

Intergrating with a specific third-party service
or api may mean the need to set up the endpoints suite and additional configuration.
We can treat the set of parameters of a given integration as an independent Connection.

In Front-Core connection is expressed by fabric function, which returns instance of http driver with all necessary configurations.
The link includes in its congregation the base url, authorization details, required headers.
It may also contain a method to serialize parameters from the query address.

The use of a specific Connection is indicated by means of an optional `connection` field in the` ResourceDefinition` type.
It is possible to set a default connection using the `default` field in the `IHttpConnectorConfig` type

Connections should be configured in the `config/http.ts` file.

##### Sample http config file

```typescript
import { AxiosDriver } from '@movecloser/front-core/lib/services/http/axios-driver'
import { IHttpConnectorConfig } from '@movecloser/front-core'

export const http: IHttpConnectorConfig = {
  drivers: {
    api: () => {
      return new AxiosDriver({
        baseURL: process.env.REACT_APP_HTTP_URL,
        headers: {
          'Accept': 'application/json',
          'Public-Key': process.env.REACT_APP_HTTP_PUBLIC_KEY,
          'Accept-Language': 'en-GB'
        },
        // This is required for query params to have URL-unsafe characters encoded
        paramsSerializer: params => {
          const newParams = { ...params }

          for (const key in newParams) {
            if (typeof params[key] === 'undefined') {
              delete newParams[key]
            }
          }

          return new URLSearchParams(newParams).toString()
        },
      }, process.env.REACT_APP_DEBUG === 'true')
    },
    otherApi: () => {
      return new AxiosDriver({
        baseURL: process.env.REACT_APP_HTTP_OTHER_API_URL,
        headers: {
          'Accept': 'application/json',
        }
      }, process.env.REACT_APP_DEBUG === 'true')
    }
  },
  default: 'api'
}
```

---
### Resources

Resources are helper classes for constructing http queries.
They contain complete information on the basis of which the target endpoint, action, required properties and the authorization method is solved.
If the Connector answers the question of WHERE to send requests, then Resource answers the question of HOW to construct them.

The resource registry can be defined at the level of the module `([module name] /resources.ts)`  or at the global level, e.g. `config / resources.ts`.

##### Summary of http connector interfaces.

```typescript
export type ResourcesRegistry = {
  [key: string]: ResourceDefinition
}

export type ResourceDefinition = {
  prefix: string | null
  methods: ResourceMethod,
  connection?: string
}

export type ResourceMethod = {
  [key: string]: Resource
}

export type Resource = {
  url: string
  method: Methods
  params?: string[]
  shorthand?: string
  auth?: boolean
  meta?: MetaPayload
}

export enum Methods {
  Delete = 'delete',
  Get = 'get',
  Post = 'post',
  Put = 'put'
}

export interface MetaPayload {
  [key: string]: any
}
```

##### Sample resources file
```typescript
export const apiResources: ResourcesRegistry = {
  user: {                    // Key for given namespace.
    connection: 'api',       // Name of connection for specific request.
    prefix: 'api/v1',        // Prefix for endpoints.
    methods: {
      fetch: {               // Resource key.
        url: 'me',           // Part of endpoint path (excluding prefix).
        method: Methods.Get, // Http request method.
        auth: true           // Decides if autorization headers should be attached to request.
      },
      update: {
        url: 'me',
        method: Methods.Put,
        auth: true,
        meta: { toast: true }, // Additional data. Meta can be utilised inside middlewares.
        shorthand: 'updateMe'  // Shorthand is useful to override formname in validation.
      },
    }
  }
}
```

---
### ApiConnector
`ApiConnector` is a class that uses` HttpConnector` internally.
Has access to configuration resources, Httpconenctor and Middlewares.
Its responsibility is to find the appropriate resource for a given query and pass it to `HttpConnector`,
which will construct and execute the query based on the given driver.

At this level resource is partially parsed, as url must contain paths with resolved variables.
In addition, `ApiConnector`, depending on the configuration, can handle side-effects through the middleware mechanism.
Example of such mechanic is `AuthMiddleware` - it uses `beforeCall` method to add authorization headers when needed. 

##### Interfaces related to ApiConnector
```typescript
export type FoundResource = {
  connection: string
  url: string
  method: Methods
  shorthand: string
  auth: boolean
  meta: MetaPayload
}

export interface IConnector {
  call (
    resource: string,
    action: string,
    params?: Params,
    body?: Payload,
    headers?: Headers,
    responseType?: ResponseType
  ): Promise<IResponse>
  findResource (resource: string, action: string, params: Params): FoundResource
  useMiddlewares (list: ConnectorMiddleware[]): void
  useResources (list: ResourcesRegistry): void
}
```

---
### Middlewares

Middleware is an auxiliary class responsible for the side effects that occur with the execution of the http query.
<br/>
The middleware class can contain two methods:

- `beforeCall`- Executes before the actual query and is used to transform headers and body.

- `afterCall`- It is executed after the query and has access to the answer object. It can be used to run an action depending on the received data (e.g. validation support or modal display)


```typescript
export interface ConnectorMiddleware {
  afterCall: (response: IResponse, resource: FoundResource) => void
  beforeCall: (
    resource: FoundResource,
    headers: Headers,
    body: Payload
  ) => ({ headers: Headers, body: Payload })
}
```
[![](https://img.shields.io/badge/back%20to%20top-%E2%86%A9-blue)](#-quick-links)


## ⚪ Services
The package includes a number of universal services.
- [AuthorizationService](src/services/authorization.ts) - Complex tool for managing user token and auth state.
- [DateTimeService](src/services/datetime.ts) - Set of function to work with time.
- [DocumentService](src/services/document.ts) - Class providing universal access to browser DocumentAPI.
- [EventBus](src/services/eventbus.ts) - Implementation of event bus using rx.js.
- [ModalConnector](src/services/modal-connector.ts) - Class responsible for managing behaviour of modals at application level.
- [StreamBus](src/services/streambus.ts) - Provides access to stream-based bus channels.
- [ValidationService](src/services/validation.ts) - Helper class used to handle validation across whole application.
- [WindowService](src/services/window.ts) - Class providing universal access to browser WindowAPI.

---
### Authorization

The package includes a ready-made solution for authorization in the application.
The included [authorization service](src/services/authorization.ts) allows you to manage authorization tokens along with launching the token refresh action.

##### Interface of config file for AuthService
```typescript
export interface AuthConfig {
  tokenName: string
  refreshThreshold: number // 15s
  validThreshold: number   // 1s
  tokenDriver: TokenDriver
}
```

##### Methods of AuthService
`<U>` - is generic type for User object used in application.

```typescript
export interface Authentication<U> extends AuthProvider {
  deleteToken (): void
  getUserId (): string | number | null
  listen (callback: AuthEventCallback): Subscription
  refreshToken (): void
  setDriver (driver: TokenDriver): this
  setToken (token: Token, isPersistent?: boolean): void
  setUser (user: U): void
  token: Token | null
  user: U | null
}
```

##### Types of support tokens
```typescript
export enum TokenDriver {
  Single = 'single', // separate key for signing request and refresh
  Double = 'double', // separate key for signing request and refresh
  Solid = 'solid'    // non refreshable (without expire date)
}
```

##### Types of emitted events
Changes in state of authorization service, are dispatched through entire application via rx.js stream.
Here is list of events types:
```typescript
export enum AuthEventType {
  Authenticated = 'authenticated',
  Booted = 'booted',
  BootedWithToken = 'booted_with_token',
  Booting = 'booting',
  Invalidated = 'invalidated',
  Refresh = 'refresh'
}
```

---
### DateTime

A class containing methods for manipulating time and date formatting. The current implementation uses `Moment.js`, which is now a somewhat obsolete package. Therefore, it is planned to move to `date-fns` in the near future.

##### Interface of DateTime service.
```typescript
export interface IDateTime {
  difference (start: string, end?: string): number // Calculate difference between two given dates. 
  now: Moment // Return current time as date object. 
  nowToFormat (format: string): string // Parse current time to given format
  parse (date: string): Moment // Parse string to date object.
  parseToFormat (date: string, format: string): string // Parse given date string to specified format (eg DD-MM-YYYY).
}
```

---
### Document

A simple class containing accessors to the browser native object `Window`. Useful especially for Server-Side Rendering. SSR solutions in modern frontend frameworks differ slightly from applications run in the browser. Executing code in the `Node JS` context does not imply access to the` window` object. Using WindowService ensures that the `window` object is checked for availability and reduces the risk of run-time errors.

##### Interfaces of Document service.
```typescript
export interface IDocument {
  addEventListener (name: any, handler: (this: Document, ev: any) => any, options?: any): void
  call (method: string, params?: any[]): any
  removeEventListener (name: any, handler: (this: Document, ev: any) => any, options?: any): void
}
```

---
### EventBus

Event bus implementation based on the use of the `Rx.js` stream. It improves the implementation of event-based architecture. It is especially useful when the business logic assumes the flow of processes between separated application layers.

##### Interfaces of EventBus
```typescript
export type EventbusCallback<Data> = (event: EventPayload<Data>) => void

export interface EventPayload<Data> {
  name: string
  payload?: Data
}

export const EventbusType = Symbol.for('IEventbus')

export interface IEventbus {
  emit (name: string, payload?: any): void
  observe (observer: IObserver): Subscription
  handle<Data> (name: string, callback: EventbusCallback<Data>): Subscription
  handleOnce<Data> (name: string, callback: EventbusCallback<Data>): void
}

export interface IObserver {
  observableEvents: ObservableEvents
  [key: string]: any
}

export interface ObservableEvents {
  [key: string]: string
}
```

---
### ModalConnector

A solution that organizes work with such UI elements as modals. With the help of the stream built, it allows you to run the modal from anywhere in the application. All available modals are stored in a registry with the type `ModalsRegistry`.
The current implementation does not allow opening many modals at the same time, but they can be combined - e.g. closing the first modal starts the next one.

To open a modal, use the `open` method.
It takes the name / key of a specific modal as the first parameter. The next parameter is `payload`, in which we can transfer the necessary data and methods. The last, optional parameter is config in which we can control the modal's behavior and display size.

##### Interface of ModalConnector
```typescript
export interface IModal {
  component <C> (): C
  getComponent<C> (name: string): C
  getRegistry<C> (): ModalRegistry<C>
  isOpened: boolean
  name: string|null
  payload: ModalPayload
  close (key?: string|null): void
  open<Payload> (key: string, payload?: (Payload extends ModalPayload ? ModalPayload : any), config?: ModalConfig): void
  openAsync<Payload> (key: string, promise: Promise<any>, payload?: (Payload extends ModalPayload ? ModalPayload : any), config?: ModalConfig): void
  subscribe (callback: (open: ModalState) => any): void
}
```

##### Additional interfaces related to modal service.
```typescript
// Configuration object for modal.
export interface ModalConfig {
  [key: string]: any
}

// Payload of modal.
export interface ModalPayload {
  [key: string]: any
}

// Registry of modals available in app.
export interface ModalRegistry<ComponentConstructor> {
  [key: string]: ComponentConstructor
}

// State of current modal.
export interface ModalState {
  component: string|null
  opened: boolean
  payload: ModalPayload
  config: ModalConfig
}
```

---
### Validation
[ValidationService](src/services/validation.ts) included in the package offers a universal and easy-to-implement solution for validating inquiries to external service providers.
The service is based on the Rxjs stream.

The principle of operation is as follows:
1. When UI is rendered each form field starts listening to validationStream. Each event contains fieldname, formName, and payload with validation errors. 
2. For the response of a Http query with the status 422 (Unprocessable Content), an event is emitted containing validation errors from an external
3. Form field receives appropriate payload and can handle error state.

##### Subscribing to validation service
```typescript
  validation.onErrors(formName, name, (errors: string[]) => {
    if (errors.length) {
      setErrorsToDisplay(errors)
    }
  })
```

##### Methods:
- `clearForm` (form: string): void 
- `onClear` (form: string, callback: (value: ValidationEvent) => void): Subscription 
- `onErrors` (form: string, field: string, callback: ValidationErrorCallback): Subscription 
- `onFormErrors` (form: string, callback: ValidationErrorCallback): Subscription 
- `pushErrors` (form: string, errors: ErrorsPayload, message: string|null = null): void

---
### Window

As with `DocumentService`, it provides an envelope to the native browser object -` Window`. Adds an availability check in case of code running in the context of `Node Js`.

In addition, it takes auxiliary functions that support popular applications such as checking the size of the window, detecting the `focus` event in the browser window, fastening listers and scrolling the page to a given element.

##### Interface of WindowService
```typescript
export interface IWindow {
  call: (method: string, params: any[]) => any
  document: IDocument
  isActive: boolean
  isClient: boolean
  isDesktop: boolean
  isMobile: boolean
  isPhone: boolean
  isServer: boolean
  isTablet: boolean
  native: Window | null
  addEventListener (name: any, handler: (this: Window, ev: any) => any, options?: any): void
  onFocus (callback: () => void): void
  scrollTo(options?: ScrollToOptions): void;
  scrollTo(x: number, y: number): void;
  redirect (target: string): void
  removeEventListener (name: any, handler: (this: Window, ev: any) => any, options?: any): void
}
```

[![](https://img.shields.io/badge/back%20to%20top-%E2%86%A9-blue)](#-quick-links)

## ⚖️ License
[MIT](LICENSE)


## 🚀 Made by

[<img src="https://movecloser.co/wp-content/themes/movecloser/assets/img/logo-white.svg" alt="MoveCloser" style="filter: drop-shadow(0 0 5px rgba(0,0,0,0.3));"/>](https://movecloser.co)

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/move-closer-sp-z-o-o-/mycompany/)
[![Instagram](https://img.shields.io/badge/movecloserdev-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white)](https://www.instagram.com/movecloserdev/)
[![Facebook](https://img.shields.io/badge/Facebook-%231877F2.svg?style=for-the-badge&logo=Facebook&logoColor=white)](https://www.facebook.com/movecloserpl/)
