import { EventbusType, IEventbus } from '@/contracts/eventbus'
import {
  AppConfig, BootstrapDriver,
  IBootstrapper as Abstract,
  RoutesStack,
  StoreStack
} from '@/contracts/bootstrapper'
import { IConfiguration } from "@/contracts/configuration"

import { Configuration } from '@/configuration'
import { Container } from '@/container'
import { IModule } from '@/module'
import { routerFactory, storeFactory } from '@/bootstrap/factories'
import { services } from '@/services'

export class Bootstrapper implements Abstract {
  protected config: IConfiguration
  protected container: Container
  protected routerBootstrapper: BootstrapDriver<RoutesStack>
  protected storeBootstrapper: BootstrapDriver<StoreStack>

  constructor (config: AppConfig) {
    this.config = new Configuration(config)
    this.container = this.createContainer()

    this.routerBootstrapper = routerFactory(config.byFile('router'), this.container)
    this.storeBootstrapper = storeFactory(config.byFile('state'), this.container)
  }

  /**
   * Bootstrapper init method.
   */
  public async boot (): Promise<void> {
    const { modules, router, store } = this.config.toObject()

    await this.container.loadModule(
      this.container.createModule(services(this.config))
    )

    const providers: any[] = []
    const observers: symbol[] = []
    const useRouter: boolean = !!router
    const useStore: boolean = !!store

    for (let m of modules) {
      const module: IModule = new m()

      if (module.providers) {
        providers.push({
          binder: module.providers,
          async: module.providersAsync
        })
      }

      if (module.observers) {
        observers.push(...module.observers)
      }

      if (useRouter && module.routes) {
        this.routerBootstrapper.applyModule(module.name, module.routes)
      }

      if (useStore && module.state) {
        this.storeBootstrapper.applyModule(module.name, module.state)
      }
    }

    for (const m of providers) {
      await this.container.loadModule(
        this.container.createModule(m.binder, m.async),
        m.async
      )
    }

    const eventbus: IEventbus = this.container.get(EventbusType)
    for (const observer of observers) {
      eventbus.observe(
        this.container.get(observer)
      )
    }
  }

  /**
   * Returns app configuration.
   */
  public getConfiguration (): IConfiguration {
    return this.config
  }

  /**
   * Returns Container instance.
   */
  public getContainer (): Container {
    return this.container
  }

  /**
   * Returns Routes Stack object.
   */
  public getRoutesStack (): RoutesStack {
    return this.routerBootstrapper.stack()
  }

  /**
   * Returns Store Stack object.
   */
  public getStoreStack (): StoreStack {
    return this.storeBootstrapper.stack()
  }

  /**
   * Creates new instance of Ioc Container.
   */
  private createContainer (): Container {
    const container = new Container()
    container.createContainer(
      this.config.has('container') ? this.config.byFile('container') : {}
    )

    return container
  }
}
