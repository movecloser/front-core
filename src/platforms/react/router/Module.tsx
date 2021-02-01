import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router'

import { RouteConfig, RoutesModuleProps } from './contracts'

/**
 * Compose valid router path by trimming trailling slashes & prevent againts
 * any slash duplication.
 */
export function composeValidPath (parts: string[]): string {
  const fullPath: string = parts.map((p: string) => p.replace(/^\/+|\/+$/g, '')).join('/')
  return `/${fullPath}`
}

/**
 * This component renders single module taking guard function into consideration.
 *
 * @author Łukasz Jakubowski <lukasz.jakubowski@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @licence MIT
 */
export const Module = (props: RoutesModuleProps) => {
  return (
    <props.layout>
      <Switch>
        {
          props.routes.map((r: RouteConfig, i: number) => {
            // Let's determine if we should consider redirection. !NOTE: redirection has higher
            // priority over component.
            let shouldRedirect: boolean = typeof r.component !== 'function' || 'redirect' in r
            const fullPath: string = props.prefix !== '/'
              ? composeValidPath([ props.prefix, r.path ]) : r.path

            if (!shouldRedirect && props.useGuards) {
              // Let's determine if `auth` has access to given Route. There are 2 scenarios:
              // 1. There's no user provided but route has guard method.
              // 2. The guard method returns false.
              shouldRedirect = (
                typeof props.auth === 'undefined' && typeof r.guard === 'function'
              ) || (
                typeof props.auth !== 'undefined' && typeof r.guard === 'function' &&
                !r.guard(props.auth)
              )
            }

            return shouldRedirect ? (
              <Redirect from={fullPath} to={r.redirect || props.prefix}
                        key={`route-${props.prefix}-${i}`}/>
            ) : (
              <Route exact path={fullPath} render={(componentProps: any) => (
                // @ts-ignore
                <r.component {...componentProps}/>
              )} key={`route-${props.prefix}-${i}`}/>
            )
          })
        }
        {
          props.errorPage ? (
            <Route component={props.errorPage}/>
          ) : null
        }
      </Switch>
    </props.layout>
  )
}
