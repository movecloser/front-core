import { BootstrapDriver, RoutesStack } from '@/contracts/bootstrapper'
import { Container } from '@/container'

export class VueRouterBootstrapper implements BootstrapDriver<RoutesStack> {
  constructor (private container: Container) {}

  public applyModule (name: string, callback: () => any): void {

  }

  public stack (): RoutesStack {
    return {}
  }
}
