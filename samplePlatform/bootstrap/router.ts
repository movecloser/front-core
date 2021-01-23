import { Container } from 'src/container'

export const createRouter = (container: Container, routesStack: RouteConfig[]): VueRouter => {
  return { ...routesStack } as VueRouter
}

interface VueRouter {}
export interface RouteConfig {}
