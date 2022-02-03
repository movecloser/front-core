// Copyright (c) 2021 Move Closer

import { BootstrapDriver, ContainerFactory, StoreStack } from '../../contracts/bootstrapper'

export class NoneBootstrapper implements BootstrapDriver<StoreStack> {
  /**
   * Applies callback to bootstrapper stack.
   */
  public applyModule (name: string, callback: ContainerFactory): void {
  }

  /**
   * Return stack for current bootstrapper.
   */
  public stack (): StoreStack {
    return []
  }
}
