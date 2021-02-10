export enum ConjunctionOperator {
  Or = 'or',
  And = 'and'
}

export type Filter = string | number | boolean | FilterParams | FilterParams[]

export enum FilterOperator {
  Equal = 'eq',
  GreaterEqual = 'ge',
  GreaterThan = 'gt',
  LessEqual = 'le',
  LessThan = 'lt',
  Like = 'lk',
  NotEqual = 'ne'
}

export interface FilterParams {
  conjunction?: ConjunctionOperator
  operator?: FilterOperator
  value: string | number | boolean
}

export interface FiltersConfig {
  [key: string]: Filter
}

export interface QueryParams {
  [key: string]: string | boolean | number | undefined
}

export interface QueryParserSeparators {
  operators: string
  values: string
}
