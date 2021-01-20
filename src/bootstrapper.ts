import { Container as Inversify } from 'inversify'
import {AppConfig, Bootstrapper, Platform, RoutesStack, StoreStack} from '@/contracts/bootstrapper'
import { Container } from '@/container';

export class Bootstraper implements Bootstrapper {
  protected config: AppConfig
  protected container: Container
  protected platform: Platform

  protected routesStack: RoutesStack = []  // @fixme Array is temp
  protected storeStack: StoreStack = [] // @fixme Array is temp

  constructor(config: AppConfig, platform: Platform) {
    this.config = config
    this.container = this.createContainer()

    this.platform = platform
  }

  public boot(): void {
    // 0. Load usługi
    // 1. Pobrać modules
    // 2. Iterować po modules
  }

  public getContainer(): Inversify {
    return this.container.getContainer()
  }

  public getRoutesStack(): RoutesStack {
    return this.routesStack
  }

  public getStoreStack(): StoreStack {
    return this.storeStack
  }

  private createContainer(): Container {
    const container = new Container()
    container.createContainer(
      ('container' in this.config) ? this.config.container : {}
    )

    return container
  }
}
