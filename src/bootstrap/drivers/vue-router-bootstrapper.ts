import { RouteConfig } from 'vue-router'

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
  public applyModule (name: string, callback: (container: Container) => any): void {
    if ('push' in this._stack) {
      const routes = callback(this.container).map((route: RouteConfig) => {
        return this.prefixRouteName(route, name)
      })

      this._stack = [
        ...this.stack,
        ...routes
      ]
    }
  }

  /**
   * Return stack for current bootstrapper.
   */
  public stack (): RoutesStack {
    return this._stack
  }

  /**
   * Prefixes the given route's name with the provided string.
   * @param route - The route which `name` property is to be prefixed.
   * @param prefix - The prefix that is to be prepended to the route's `name` property.
   */
  private prefixRouteName (route: RouteConfig, prefix: string): RouteConfig {
    if (route.hasOwnProperty('name')) {
      route.name = `${prefix}.${route.name}`
    }

    if (route.children) {
      route.children = route.children.map(child => this.prefixRouteName(child, route.name || prefix))
    }

    return route
  }
}
