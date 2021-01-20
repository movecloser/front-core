import { Container } from 'inversify'
import { ContainerOptions } from '@/contracts/container'

export interface AppConfig{
  container?: ContainerOptions
  [key: string]: any
}

export interface Bootstrapper {
  boot(): void
  getContainer (): Container
  getRoutesStack (): RoutesStack
  getStoreStack(): StoreStack
}

export enum Platform {
  React = 'react',
  Vue = 'vue'
}

export type RoutesStack = AnyObject|any[]
export type StoreStack = AnyObject|any[]

interface AnyObject {
  [key: string]: any
}
