import { AsyncContainerModule, Container as Inversify, ContainerModule } from 'inversify'
import { IContainer, ContainerOptions } from '@/contracts/container'

/**
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
export class Container implements IContainer<Inversify, ContainerModule, AsyncContainerModule> {
  /**
   * Container instance.
   * @private
   */
  private container!: Inversify

  /**
   * Returns new instance of IOC container.
   * @param config
   */
  public createContainer (config: ContainerOptions = {}): void {
    this.container = new Inversify(config)
  }

  /**
   *
   * @param binder
   * @param async
   */
  public createModule (binder: any, async: boolean = false): ContainerModule| AsyncContainerModule {
    if (async) {
      return new AsyncContainerModule(binder)
    }

    return new ContainerModule(binder)
  }

  /**
   * Returns instance of Service by it's identifier.
   * @param identifier
   */
  public get<ServiceContract>(identifier: any): ServiceContract {
    return this.container.get<ServiceContract>(identifier)
  }

  /**
   * Returns instance of IOC container.
   */
  public getContainer (): Inversify {
    return this.container
  }

  /**
   * Load module into the container.
   * @param module
   * @param async
   */
  public async loadModule (module: ContainerModule | AsyncContainerModule, async: boolean = false): Promise<void> {
    if (async) {
      await this.container.loadAsync(module as AsyncContainerModule)
    } else {
      this.container.load(module as ContainerModule)
    }
  }

  /**
   * Unload module from the container.
   * @param module
   */
  public unloadModule (module: ContainerModule | AsyncContainerModule): void {
    this.container.unload(module)
  }
}

export { injectable as Injectable } from 'inversify'
