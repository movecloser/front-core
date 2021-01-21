export interface IContainer<C, M, N> {
  createContainer: (config?: ContainerOptions) => void
  getContainer: () => C
  loadModule: (module: M | N, async?: boolean) => Promise<void>
  unloadModule: (module: M | N, async?: boolean) => void
}

export interface ContainerOptions {
  [key: string]: string
}

export { injectable as Injectable, interfaces as Interfaces } from 'inversify'
