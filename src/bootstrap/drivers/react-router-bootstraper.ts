/*
 * Copyright (c) 2021 Move Closer
 */

/* istanbul ignore file */

import { Container } from '../../container'
import {
  BootstrapDriver,
  ContainerFactory,
  RoutesStack,
  StoreStack
} from '../../contracts/bootstrapper'
import { ModuleRoute } from '../../platforms/react'

export class ReactRouterBootstrapper implements BootstrapDriver<StoreStack> {
  private _stack: RoutesStack = []

  constructor (private container: Container) {
  }

  /**
   * Applies callback to bootstrapper stack.
   */
  public applyModule (name: string, callback: ContainerFactory): void {
    const routes: ModuleRoute = callback(this.container)

    this._stack.push(routes)
  }

  /**
   * Return stack for current bootstrapper.
   */
  public stack (): StoreStack {
    return this._stack
  }
}
