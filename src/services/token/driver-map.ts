import { TokenDriver } from '../../contracts'

import { SingleToken } from './single'
import { DoubleToken } from './double'
import { SolidToken } from './solid'

export const tokenDriversMap = {
  [TokenDriver.Single]: SingleToken,
  [TokenDriver.Double]: DoubleToken,
  [TokenDriver.Solid]: SolidToken
}
