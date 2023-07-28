// Copyright (c) 2021 Move Closer

import { ITokenConstructor, TokenDriver } from '../../contracts'

import { SingleToken } from './single'
import { DoubleToken } from './double'
import { SolidToken } from './solid'

export const tokenDriversMap: Record<TokenDriver, ITokenConstructor> = {
  [TokenDriver.Single]: SingleToken,
  [TokenDriver.Double]: DoubleToken,
  [TokenDriver.Solid]: SolidToken
}
