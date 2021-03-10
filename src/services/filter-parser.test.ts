import { ConjunctionOperator, FilterOperator, FiltersConfig } from '../contracts/filter-parser'
import { IncorrectValueError, MissingParameter } from '../exceptions/errors'
import { composeQueryParams, parseQueryParams } from './filter-parser'

describe('Test filter parser method', () => {
  test(
    'Expect [composeQueryParams] method to return QueryParams when basic values provided',
    () => {
      const toParse: FiltersConfig = {
        name: 'stefan',
        age: 69,
        active: true,
        passive: false
      }
      const expected = {
        name: 'stefan',
        age: 69,
        active: 1,
        passive: 0
      }

      expect(composeQueryParams(toParse)).toEqual(expected)
    }
  )

  test(
    'Expect [composeQueryParams] method to return QueryParams when FiltersConfig provided',
    () => {
      const toParse: FiltersConfig = {
        name: {
          operator: FilterOperator.Like,
          value: 'stefan'
        }
      }
      const expected = {
        name: 'lk:stefan'
      }

      expect(composeQueryParams(toParse)).toEqual(expected)
    }
  )

  test(
    'Expect [composeQueryParams] method to return QueryParams when FiltersConfig[] provided',
    () => {
      const toParse: FiltersConfig = {
        rate: [
          {
            operator: FilterOperator.LessThan,
            value: 3
          }, {
            conjunction: ConjunctionOperator.Or,
            operator: FilterOperator.GreaterThan,
            value: 4
          }
        ]
      }

      const expected = {
        rate: 'lt:3,or:gt:4'
      }

      expect(composeQueryParams(toParse)).toEqual(expected)
    }
  )

  test(
    'Expect [composeQueryParams] method to trim empty params',
    () => {
      const toParse: FiltersConfig = {
        rate: [
          {
            operator: FilterOperator.Equal,
            value: ''
          }
        ],
        test: ''
      }

      const expected = {}

      expect(composeQueryParams(toParse)).toEqual(expected)
    }
  )

  test(
    'Expect [composeQueryParams] method to throw IncorrectValueError when incorrect config provided',
    () => {
      const toParse: FiltersConfig = {
        // @ts-ignore
        rate: () => {
        }
      }

      expect(() => composeQueryParams(toParse)).toThrow(IncorrectValueError)
    }
  )

  test(
    'Expect [composeQueryParams] method to throw IncorrectValueError when incorrect value provided',
    () => {
      const toParse: FiltersConfig = {
        // @ts-ignore
        rate: null
      }

      expect(() => composeQueryParams(toParse)).toThrow(IncorrectValueError)
    }
  )

  test(
    'Expect [composeQueryParams] method to throw MissingParameter when incorrect value provided',
    () => {
      const toParse: FiltersConfig = {
        rate: {
          // @ts-ignore
          test: true
        }
      }

      expect(() => composeQueryParams(toParse)).toThrow(MissingParameter)
    }
  )

  test(
    'Expect [composeQueryParams] method to throw IncorrectValueError when incorrect FiltersConfig[] provided',
    () => {
      const toParse: FiltersConfig = {
        rate: [
          {
            operator: FilterOperator.LessThan,
            // @ts-ignore
            value: null
          }, {
            conjunction: ConjunctionOperator.Or,
            operator: FilterOperator.GreaterThan,
            value: 4
          }
        ]
      }

      expect(() => composeQueryParams(toParse)).toThrow(IncorrectValueError)
    }
  )

  test('Expect [parseQueryParams] method to return Filer when simple QueryParam given.', () => {
    const toExpect = { rate: 5 }
    const toParse = { rate: '5' }

    expect(parseQueryParams(toParse)).toEqual(toExpect)
  })

  test('Expect [parseQueryParams] method to return Filter with operator', () => {
    const toExpect = { rate: { operator: FilterOperator.GreaterThan, value: 5 } }
    const toParse = { rate: 'gt:5' }

    expect(parseQueryParams(toParse)).toEqual(toExpect)
  })

  test('Expect [parseQueryParams] method to return Filter as full FilterParams', () => {
    const toExpect = {
      rate: { operator: FilterOperator.GreaterThan, value: 5, conjunction: ConjunctionOperator.Or }
    }
    const toParse = { rate: 'or:gt:5' }

    expect(parseQueryParams(toParse)).toEqual(toExpect)
  })

  test('Expect [parseQueryParams] method to return Filter with multiple values', () => {
    const toExpect = {
      firstname: 'john',
      lastname: [
        { value: 'john', conjunction: ConjunctionOperator.Or },
        { operator: FilterOperator.Like, value: 'jane' }
      ]
    }
    const toParse = { firstname: 'john', lastname: 'john,lk:jane' }

    expect(parseQueryParams(toParse)).toEqual(toExpect)
  })
})
