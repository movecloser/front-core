/*
 * Copyright (c) 2021 Move Closer
 */

import { Subscription } from 'rxjs'

export interface AuthConfig {
  tokenName: string
  refreshThreshold: number // 15s
  validThreshold: number   // 1s
  tokenDriver: TokenDriver
}

export interface AuthEvent {
  type: AuthEventType
  token?: IToken
}

export type AuthEventCallback = (event: AuthEvent) => void

export enum AuthEventType {
  Authenticated = 'authenticated',
  Booted = 'booted',
  BootedWithToken = 'booted_with_token',
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
  refreshToken (): void
  setDriver (driver: TokenDriver): this
  setToken (token: Token, isPersistent?: boolean): void
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
  expiresAt: string | null
  tokenType: string
  refreshToken?: string
}

export interface ITokenConstructor {
  new (payload: Token): IToken
  recreateFromStorage (tokenName: string): Token | null
}

export interface IToken {
  accessToken: string
  calculateTokenLifetime (): number
  isRefreshable (): boolean
  refreshToken: string
  token: Token
}

export const AuthServiceType = Symbol.for('Authentication')

export enum TokenDriver {
  Single = 'single',
  Double = 'double',
  Solid = 'solid'
}
