import { Container as Inversify } from 'inversify'

import {
  AppConfig, BootstrapDriver,
  Bootstrapper as Abstract,
  Platform,
  RoutesStack,
  StoreStack
} from '@/contracts/bootstrapper'
import { IConfiguration } from "@/contracts/configuration"

import { Configuration } from '@/configuration'
import { Container } from '@/container'
import { services } from '@/services'
import { routerFactory, storeFactory } from '@/bootstrap/factories'

export class Bootstrapper implements Abstract {
  protected config: IConfiguration
  protected container: Container
  protected routerBootstrapper: BootstrapDriver<RoutesStack>
  protected storeBootstrapper: BootstrapDriver<StoreStack>

  constructor (config: AppConfig, platform: Platform) {
    this.config = new Configuration(config)
    this.container = this.createContainer()

    this.routerBootstrapper = routerFactory(config.byFile('router'))
    this.storeBootstrapper = storeFactory(config.byFile('state'))
  }

  /**
   *
   */
  public async boot (): Promise<void> {
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
        this.container.createModule(m.binder, m.async),
        m.async
      )
    }

    // this.routesStack = routing //?
    // this.storeStack = stateTree //?
  }

  /**
   * Returns app configuration.
   */
  public getConfiguration (): IConfiguration {
    return this.config
  }

  /**
   * Returns actual Ioc Container.
   */
  public getContainer (): Inversify {
    return this.container.getContainer()
  }

  /**
   * Returns Routes Stack object.
   */
  public getRoutesStack (): RoutesStack {
    return this.routerBoootstrapper.stack()
  }

  /**
   * Returns Store Stack object.
   */
  public getStoreStack (): StoreStack {
    return this.storeBoootstrapper.stack()
  }

  /**
   * Creates new instance of Ioc Container.
   * @private
   */
  private createContainer (): Container {
    const container = new Container()
    container.createContainer(
      this.config.has('container') ? this.config.byFile('container') : {}
    )

    return container
  }
}
