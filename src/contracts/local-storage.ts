import { NativeLocalStorageProvider, CrossDomainLocalStorageProvider } from '../services/local-storage'

export type NativeLocalStorageConfig = {}

export interface CrossDomainLocalStorageConfig {
  // allowedOrigins: string[]
  domain: string
  iframeId?: string
  iframePath: string
}

export type LocalStorageConfig = NativeLocalStorageConfig | CrossDomainLocalStorageConfig

export interface ILocalStorageConstructor {
  new (config?: LocalStorageConfig): ILocalStorage
}

export interface ILocalStorage {
  get (key: string): string | null | Promise<string | null>
  isSet (key: string): boolean
  remove (key: string): void
  set (key: string, value: string): void
}

export enum LocalStorageDriver {
  Native = 'native',
  CrossDomain = 'cross-domain'
}

export const localStorageDriversMap: Record<LocalStorageDriver, ILocalStorageConstructor> = {
  [LocalStorageDriver.Native]: NativeLocalStorageProvider,
  [LocalStorageDriver.CrossDomain]: CrossDomainLocalStorageProvider
}

export const LocalStorageType = Symbol.for('LocalStorageType')
