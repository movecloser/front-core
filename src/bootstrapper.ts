import { Container as Inversify } from 'inversify'

import {AppConfig, Bootstrapper, Platform, RoutesStack, StoreStack} from '@/contracts/bootstrapper'
import { Container } from '@/container'
import { services } from './services'
import { Configuration } from '@/configuration'

export class Bootstraper implements Bootstrapper {
  protected config: AppConfig
  protected container: Container
  protected platform: Platform

  protected routesStack: RoutesStack = []  // @fixme Array is temp
  protected storeStack: StoreStack = [] // @fixme Array is temp

  constructor(config: AppConfig, platform: Platform) {
    this.config = new Configuration(config)
    this.container = this.createContainer()

    this.platform = platform
  }

  /**
   *
   */
  public async boot(): Promise<void> {
    const { modules, router, store } = this.config.toObject()
    // const routing = []
    // const stateTree = {}

    const providers: any[] = [
      {
        binder: services(this.config),
        async: false
      }
    ]

    // for (let module of modules) {
    //   providers.push({
    //     binder: module.providers,
    //     async: module.providersAsync
    //   })
    //
    //   routing.push(...module.routes(this.container))
    //
    //   Object.assign(tree, module.state(this.container))
    // }

    for (const m of providers) {
      await this.container.loadModule(
        createModule(m.binder, m.async),
        m.async
      )
    }

    // this.routesStack = routing //?
    // this.storeStack = stateTree //?
  }

  /**
   * Returns actual Ioc Container.
   */
  public getContainer(): Inversify {
    return this.container.getContainer()
  }

  // /getconfiguration

  /**
   * Returns Routes Stack object.
   */
  public getRoutesStack(): RoutesStack {
    return this.routesStack
  }

  /**
   * Returns Store Stack object.
   */
  public getStoreStack(): StoreStack {
    return this.storeStack
  }

  /**
   * Creates new instance of Ioc Container.
   * @private
   */
  private createContainer(): Container {
    const container = new Container()
    container.createContainer(
      ('container' in this.config) ? this.config.container : {}
    )

    return container
  }
}
