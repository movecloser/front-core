import {
  ConjunctionOperator,
  Filter, FilterOperator,
  FilterParams,
  FiltersConfig,
  QueryParams,
  QueryParserSeparators
} from '../contracts/filter-parser'
import { IncorrectValueError, MissingParameter } from '../exceptions/errors'

const defaultSeparators = {
  operators: ':',
  values: ','
}

/**
 * Compose QueryParams from FiltersConfig.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 */
export function composeQueryParams (
  filters: FiltersConfig,
  separators: QueryParserSeparators = defaultSeparators
): QueryParams {
  let result: QueryParams = {}

  for (const key of Object.keys(filters)) {
    const config: Filter = filters[key]

    if (config === null || config === 'undefined') {
      throw new IncorrectValueError('Filter value must be defined')
    }

    switch (typeof config) {
      case 'string':
        result[key] = `${config}`
        continue
      case 'boolean':
        result[key] = config ? 1 : 0
        continue
      case 'number':
        result[key] = config
        continue
      case 'object':
        if (!Array.isArray(config)) {
          result[key] = stringifyFilter(config, separators.operators)
        } else {
          result[key] = config.map(
            (params: FilterParams) => stringifyFilter(params, separators.operators)
          ).join(separators.values)
        }
        continue
      default:
        throw new IncorrectValueError(
          'Provided filters config does not match with FiltersConfig interface'
        )
    }
  }

  return result
}

/**
 * Parse QueryParams to FiltersConfig.
 *
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 */
export function parseQueryParams (
  query: QueryParams,
  separators: QueryParserSeparators = defaultSeparators
): FiltersConfig {
  let result: FiltersConfig = {}

  for (const [ key, value ] of Object.entries(query)) {
    result[key] = parseFilter(
      String(value).split(separators.values),
      separators.operators
    )
  }

  return result
}

function parseFilter (filters: string[], separator: string): Filter {
  const decomposeFilter = (filter: string): string | number | FilterParams => {
    const parts: string[] = filter.split(separator)

    if (parts.length === 1) {
      return parseValue(parts[0])
    }

    const params: FilterParams = { value: '' }
    for (const part of parts) {
      if (Object.values(ConjunctionOperator).includes(part as ConjunctionOperator)) {
        params.conjunction = part as ConjunctionOperator
        continue
      }

      if (Object.values(FilterOperator).includes(part as FilterOperator)) {
        params.operator = part as FilterOperator
        continue
      }

      params.value = parseValue(part)
    }

    return params
  }

  const parseValue = (value: string): string | number => {
    return isNaN(Number(value)) ? value : Number(value)
  }

  if (filters.length > 1) {
    return filters.map((filter: string) => {
      const decoded = decomposeFilter(filter)

      return typeof decoded === 'object'
        ? decoded : { value: decoded, conjunction: ConjunctionOperator.Or }
    })
  }

  return decomposeFilter(filters.length ? filters[0] : '')
}

function stringifyFilter (config: FilterParams, separator: string): string {
  let filterString = ''

  if (!config.hasOwnProperty('operator') || !config.hasOwnProperty('value')) {
    throw new MissingParameter('Keys [operator] and [value] are required.')
  }

  if (config.value === null || config.value === 'undefined') {
    throw new IncorrectValueError('Filter value must be defined')
  }

  filterString = `${config['operator']}${separator}${config['value']}`

  if (config.hasOwnProperty('conjunction')) {
    filterString = `${config['conjunction']}${separator}${filterString}`
  }

  return filterString
}
