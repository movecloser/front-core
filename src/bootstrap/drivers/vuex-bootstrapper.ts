import { BootstrapDriver, StoreStack } from '@/contracts/bootstrapper'
import { Container } from '@/container'
import { ContainerFactory } from '@/module'

export class VuexBootstrapper implements BootstrapDriver<StoreStack> {
  private _stack: StoreStack = {}

  constructor (private container: Container) {}

  /**
   * Applies callback to bootstrapper stack.
   * @param name
   * @param callback
   */
  public applyModule (name: string, callback: ContainerFactory): void {
    Object.assign(this._stack, { name: callback(this.container) })
  }

  /**
   * Return stack for current bootstrapper.
   */
  public stack (): StoreStack {
    return this._stack
  }
}
