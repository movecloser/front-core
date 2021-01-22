import { BootstrapDriver, RoutesStack } from '@/contracts/bootstrapper'

export class VuexBootstrapper implements BootstrapDriver<RoutesStack> {
  applyModule (): void {

  }

  stack (): RoutesStack {
    return {}
  }
}
