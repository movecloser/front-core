import { Container } from 'inversify'

export const createStore = (container: Container, storeStack: StoreModules): Store => {
  return { ...storeStack } as Store
}

interface Store {}
export interface StoreModules {}
