import { BootstrapDriver, RoutesStack } from '@/contracts/bootstrapper'
import { Container } from '@/container'

export class VueRouterBootstrapper implements BootstrapDriver<RoutesStack> {
  constructor (private container: Container) {}

  private _stack: RoutesStack = []

  /**
   * Applies callback to bootstrapper stack.
   * @param name
   * @param callback
   */
  public applyModule (name: string, callback: (name: string, container: Container) => any): void {
    if ('push' in this._stack) {
      this._stack.push(callback(name, this.container))
    }
  }

  /**
   * Return stack for current bootstrapper.
   */
  public stack (): RoutesStack {
    return this._stack
  }
}
