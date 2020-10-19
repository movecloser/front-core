import { FilterParams, Filters, FiltersConfig } from '@/contracts/repositories'
import { IncorrectValueError, MissingParameter } from '@/exceptions/errors'

export const parse = (filters: FiltersConfig): Filters => {
  let result: Filters = {}

  for (const key of Object.keys(filters)) {
    const config = filters[key]
    const configType = typeof config

    if (config === null || config === 'undefined') {
      throw new IncorrectValueError('Filter value must be defined')
    }

    if (configType === 'string') {
      result[key] = `${config}`
      continue
    }

    if (configType === 'boolean') {
      result[key] = config ? 1 : 0
      continue
    }

    if (configType === 'number') {
      // @ts-ignore
      result[key] = config
      continue
    }

    if (configType === 'object' && !Array.isArray(config)) {
      // @ts-ignore
      result[key] = parseFilterParams(config)
      continue
    }

    if (configType === 'object' && Array.isArray(config)) {
      result[key] = config.map((params: FilterParams) => parseFilterParams(params)).join(',')
      continue
    }

    throw new IncorrectValueError('Provided filters config does not match with FiltersConfig interface')
  }

  return result
}

const parseFilterParams = (config: FilterParams): string => {
  let filterString = ''

  if (!config.hasOwnProperty('operator') || !config.hasOwnProperty('value')) {
    throw new MissingParameter('Keys [operator] and [value] are required.')
  }

  if (config.value === null || config.value === 'undefined') {
    throw new IncorrectValueError('Filter value must be defined')
  }

  filterString = `${config['operator']}:${config['value']}`

  if (config.hasOwnProperty('conjunction')) {
    filterString =`${config['conjunction']}:${filterString}`
  }

  return filterString
}
