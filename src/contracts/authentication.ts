import { Subscription } from 'rxjs'

export interface AuthConfig {
  tokenName: string
  refreshThreshold: number // 15s
  validThreshold: number   // 1s
}

export interface AuthEvent {
  type: AuthEventType
  token?: Token
}

export type AuthEventCallback = (event: AuthEvent) => void

export enum AuthEventType {
  Booted = 'booted',
  Booting = 'booting',
  Invalidated = 'invalidated',
  Refresh = 'refresh'
}

export interface AuthHeader {
  Authorization: string
}

export interface Authentication<U> extends AuthProvider {
  deleteToken (): void
  getUserId (): string | number | null
  listen (callback: AuthEventCallback): Subscription
  setToken (token: Token): void
  setUser (user: U): void
  token: Token | null
  user: U | null
}

export interface AuthProvider {
  check (): boolean
  getAuthorizationHeader (): AuthHeader
}

export interface IUser {
  id: string | number
}

export interface Token {
  accessToken: string
  expiresAt: string
  tokenType: string
}

export const AuthServiceType = Symbol.for('Authentication')
