// Copyright (c) 2022 Move Closer

/* istanbul ignore file */

import { BootstrapDriver, ContainerFactory, StoreStack } from '../../contracts/bootstrapper'
import { Container } from '../../container'
import { IConfiguration } from '../../contracts'

export class VuexBootstrapper implements BootstrapDriver<StoreStack> {
  private _stack: StoreStack = {}

  constructor (private container: Container, private configuration: IConfiguration) {
  }

  /**
   * Applies callback to bootstrapper stack.
   * @param name
   * @param callback
   */
  public applyModule (name: string, callback: ContainerFactory): void {
    Object.assign(this._stack, { [name]: callback(this.container, this.configuration) })
  }

  /**
   * Return stack for current bootstrapper.
   */
  public stack (): StoreStack {
    return this._stack
  }
}
