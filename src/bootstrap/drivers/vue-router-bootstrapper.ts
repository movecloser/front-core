/*
 * Copyright (c) 2021 Move Closer
 */

/* istanbul ignore file */

import { RouteConfig } from 'vue-router'

import { BootstrapDriver, ContainerFactory, RoutesStack } from '../../contracts/bootstrapper'
import { Container } from '../../container'

export class VueRouterBootstrapper implements BootstrapDriver<RoutesStack> {
  private _stack: RoutesStack = []

  constructor (private container: Container) {
  }

  /**
   * Applies callback to bootstrapper stack.
   */
  public applyModule (name: string, callback: ContainerFactory): void {
    const routes = callback(this.container).map((route: RouteConfig) => {
      return this.prefixRouteName(route, name)
    })

    this._stack = [
      ...this._stack as Array<RouteConfig>,
      ...routes
    ]
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
      route.children = route.children.map((child: RouteConfig) => this.prefixRouteName(
        child,
        route.name || prefix
      ))
    }

    return route
  }
}
