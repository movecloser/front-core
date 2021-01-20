import { Container } from 'inversify'

export const createRouter = (container: Container, routesStack: RouteConfig[]): VueRouter => {
  return { ...routesStack } as VueRouter
}

interface VueRouter {}
export interface RouteConfig {}
