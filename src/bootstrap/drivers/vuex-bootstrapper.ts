import { BootstrapDriver, RoutesStack } from '@/contracts/bootstrapper'

export class VuexBootstrapper implements BootstrapDriver<RoutesStack> {
  applyModule (name: string, callback: () => any): void {

  }

  stack (): RoutesStack {
    return {}
  }
}
