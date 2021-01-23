import {
  MappingConfig,
  MappingFunction,
  MappingInstruction,
  MappingTypes
} from '@/contracts/support'
import { MappingError } from '@/exceptions/errors'

/**
 * Adapter to connect api response with data model required by frontend
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 */

/**
 * Convert array of Model objects
 *
 * @param mapping
 * @param {Array} toMap
 * @param preserve
 * @return Array
 */

/* istanbul ignore next */
export function mapCollection<T> (
  toMap: any[],
  mapping: MappingConfig,
  preserve: boolean = true
): T[] {
  return toMap.map((item: any) => {
    return mapModel<T>(item, mapping, preserve)
  })
}

/**
 * Converts Intention object to format required by server side.
 * @param toMap
 * @param mapping
 */
export function mapIntention<T> (toMap: any, mapping: MappingConfig): T {
  const mapped = {}
  mapByStructure(mapped, toMap, mapping)
  return mapped as T
}

/**
 * Convert single Model object
 *
 * @param mapping
 * @param {Object} toMap.
 * @param preserve
 * @return Object
 */
export function mapModel<T> (toMap: any, mapping: MappingConfig, preserve: boolean = true): T {
  const mapped = {}
  mapByConfig(mapped, toMap, mapping, preserve)
  return mapped as T
}


/**
 * Provides mapping based on {type} given in config.
 * Operates on single objects (collections are fired in loop)
 * Is called internally by methods: Model and Collection
 * Instructions should be prepared in this manned:
 *  [as it should be]: [as it is]
 *
 * @return Array
 * @param mapped
 * @param mapping
 * @param item
 * @param preserve
 */
function mapByConfig (mapped: any, item: any, mapping: MappingConfig, preserve: boolean): void {
  Object.keys(item).forEach(key => {
    mapped[key] = item[key]
  })

  for (const [ key, instruction ] of Object.entries(mapping)) {
    if (typeof instruction === 'string') {
      mapped[key] = item[instruction]

      if (!preserve) {
        if (key === instruction) {
          continue
        }
        delete mapped[instruction]
      }

      continue
    }

    if (typeof instruction === 'object' && instruction !== null) {
      switch (instruction.type) {
        case MappingTypes.Adapter:
          if (typeof instruction.map === 'undefined' || typeof instruction.value !== 'string') {
            throw new MappingError(
              'Invalid instruction. Map in not a MappingConfig or value is not a string.')
          }

          mapByConfig(mapped[key], item[instruction.value], instruction.map, false)
          continue

        case MappingTypes.Function:
          if (typeof instruction.value !== 'function') {
            throw new MappingError('Invalid instruction. Value is not a function.')
          }

          const callbackFunction: MappingFunction = instruction.value as MappingFunction
          mapped[key] = callbackFunction(item)

          continue
      }
    }

    throw new MappingError('Invalid mapping instruction type given.')
  }
}

/**
 * Provides mapping based on items initial structure. This mapping works
 * in opposite way than mapByConfig. Instructions should be prepared in this manned:
 *  [as it is]: [as it should be]
 *
 * @return Array
 * @param mapped
 * @param mapping
 * @param item
 */
function mapByStructure (mapped: any, item: any, mapping: MappingConfig): void {
  for (const [ key, value ] of Object.entries(item)) {
    if (!mapping.hasOwnProperty(key) || mapping[key] === 'undefined' || mapping[key] === null) {
      continue
    }

    const instruction: string | MappingInstruction = mapping[key]

    if (typeof instruction === 'string') {
      mapped[instruction] = value

    } else {
      if (typeof instruction.value !== 'function') {
        throw new MappingError('Invalid instruction. Value is not a function.')
      }

      if (typeof instruction.target !== 'string') {
        throw new MappingError('Invalid instruction. Missing target.')
      }

      const callbackFunction: MappingFunction = instruction.value as MappingFunction
      mapped[instruction.target as string] = callbackFunction(item)
    }
  }
}

