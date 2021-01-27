import * as React from 'react'
import { Route, Switch } from 'react-router'

import { Module } from './Module'
import { ModuleRoute, RoutesFactoryProps } from './contracts'

/**
 * This component uses provided map to print out a module routing.
 *
 * @author Łukasz Jakubowski <lukasz.jakubowski@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @licence MIT
 */
export function Factory (props: RoutesFactoryProps) {
  const moduleRoutes: ModuleRoute[] = props.moduleRoutes.filter((m: ModuleRoute) => {
    if (!props.useGuards) return true
    // Let's determine if auth has an access to the module. If not we cannot register
    // it's routing.
    return typeof props.auth !== 'undefined' && m.accessor
      ? props.auth.canAccess(m.accessor) : false
  })

  return (
    <Switch>
      {
        moduleRoutes.map((m: ModuleRoute, i: number) => {
          return (
            <Route key={`route-${i}`} path={m.prefix}>
              <Module prefix={m.prefix} layout={m.layout} routes={m.routes} auth={props.auth}
                      useGuards={props.useGuards} errorPage={props.errorPage}/>
            </Route>
          )
        })
      }
    </Switch>
  )
}
