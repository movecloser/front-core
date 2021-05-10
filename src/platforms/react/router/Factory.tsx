import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router'

import { composeValidPath, Module } from './Module'
import { ModuleRoute, RoutesFactoryProps } from './contracts'

/**
 * This component uses provided map to print out a module routing.
 *
 * @author Łukasz Jakubowski <lukasz.jakubowski@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @licence MIT
 */
export function Factory (props: RoutesFactoryProps) {
  const hasGlobalPrefix: boolean = typeof props.globalPrefix === 'string' || false

  return (
    <Switch>
      {
        [ ...props.moduleRoutes.map((m: ModuleRoute, i: number) => {
          // We should consider if there's a global prefix set & if module
          // is skipping it or not.
          const prefix: string = hasGlobalPrefix && !Boolean(m.skipGlobalPrefix)
            ? composeValidPath([ props.globalPrefix as string, m.prefix ]) : m.prefix
          const strict: boolean = typeof m.strict === 'boolean' ? m.strict : true

          return (
            <Route key={`route-${i}`} path={prefix}>
              <Module prefix={prefix} layout={m.layout} routes={m.routes} auth={props.auth}
                      useGuards={props.useGuards} strict={strict}
                      errorPage={props.errorPage}/>
            </Route>
          )
        }), <Redirect key={`route-fallback`} to={props.fallBackUrl || '/'}/>]
      }
    </Switch>
  )
}
