// Copyright (c) 2022 Move Closer

/* istanbul ignore file */

import { RouteConfig } from 'vue-router'

import { BootstrapDriver, ContainerFactory, IConfiguration, RoutesStack } from '../../contracts'
import { Container } from '../../container'

export class VueRouterBootstrapper implements BootstrapDriver<RoutesStack> {
  private _stack: RoutesStack = []

  constructor (private container: Container, private configuration: IConfiguration) {
  }

  /**
   * Applies callback to bootstrapper stack.
   */
  public applyModule (name: string, callback: ContainerFactory): void {
    const routes = callback(this.container, this.configuration).map((route: RouteConfig) => {
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
