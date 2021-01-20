import { AsyncContainerModule, Container as Inversify, ContainerModule } from 'inversify'
import { IModuleConstructor } from '@/support/modules'

export class Container implements IContainer<Inversify, ContainerModule, AsyncContainerModule> {
  /**
   * Container
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

interface IContainer<C, M, N> {
  createContainer: (config?: ContainerOptions) => void
  getContainer: () => C
  loadModule: (module: M | N, async?: boolean) => Promise<void>
  unloadModule: (module: M | N, async?: boolean) => void
}

interface ContainerOptions {
  [key: string]: string
}

export const registry: IModuleConstructor[] = [
  // register modules here.
]
