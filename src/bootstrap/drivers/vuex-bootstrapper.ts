import { BootstrapDriver, RoutesStack, StoreStack } from '@/contracts/bootstrapper'
import { Container } from '@/container'

export class VuexBootstrapper implements BootstrapDriver<StoreStack> {
  constructor (private container: Container) {}

  private _stack: StoreStack = {}

  /**
   * Applies callback to bootstrapper stack.
   * @param name
   * @param callback
   */
  public applyModule (name: string, callback: (name: string, container: Container) => any): void {
    Object.assign(this._stack, callback(name, this.container))
  }

  /**
   * Return stack for current bootstrapper.
   */
  public stack (): StoreStack {
    return this._stack
  }
}
