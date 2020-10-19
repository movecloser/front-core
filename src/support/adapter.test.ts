import { mapCollection, mapModel, MappingConfig, MappingTypes } from './adapter'
import { MappingError } from '../../src/exceptions/errors'
import { AbstractIntention } from '../../src/shared/intention'


const mappingConfig: MappingConfig = {
  id: 'id',
  firstName: 'first_name',
  lastName: 'last_name',
  fullName: {
    type: MappingTypes.Function,
    value: (item: any): any => {
      return `${item['first_name']} ${item['last_name']}`
    }
  }
}

describe('Test adapter methods', () => {
  test('Expect [mapModel] method to return properly mapped object (preserve: false)', () => {
    const toMap = {
      id: 1,
      first_name: 'John',
      last_name: 'Testington'
    }
    const expectedWithoutPreserve = {
      id: 1,
      firstName: 'John',
      lastName: 'Testington',
      fullName: 'John Testington'
    }
    const mapped = mapModel(toMap, mappingConfig, false)

    expect(typeof mapped).toEqual('object')
    expect(mapped).toEqual(expectedWithoutPreserve)
  })

  test('Expect [mapModel] method to return properly mapped object (preserve: true)', () => {
    const toMap = {
      id: 1,
      first_name: 'John',
      last_name: 'Testington'
    }
    const expectedWithPreserve = {
      id: 1,
      firstName: 'John',
      first_name: 'John',
      lastName: 'Testington',
      last_name: 'Testington',
      fullName: 'John Testington'
    }
    const mapped = mapModel(toMap, mappingConfig, true)

    expect(typeof mapped).toEqual('object')
    expect(mapped).toEqual(expectedWithPreserve)
  })

  test('Expect [mapModel] method to throw error when incorrect mapping function provided.', () => {
    const toMap = {
      id: 1,
      first_name: 'John',
      last_name: 'Testington'
    }

    const mappingConfig: MappingConfig = {
      firstName: 'first_name',
      lastName: 'last_name',
      fullName: {
        type: MappingTypes.Function,
        value: 'wrong mapping function'
      }
    }

    expect(() => mapModel(toMap, mappingConfig)).toThrow(MappingError)
  })

  test('Expect [mapModel] method to throw error when null provided as mapping function.', () => {
    const toMap = {
      id: 1,
      first_name: 'John',
      last_name: 'Testington'
    }

    const mappingConfig: MappingConfig = {
      firstName: 'first_name',
      lastName: 'last_name',
      //@ts-ignore
      fullName: null
    }

    expect(() => mapModel(toMap, mappingConfig)).toThrow(MappingError)
  })

  test('Expect [mapCollection] method to return properly mapped object', () => {
    const toMap = [
      {
        id: 1,
        first_name: 'John',
        last_name: 'Testington'
      },
      {
        id: 2,
        first_name: 'Bruce',
        last_name: 'Testingsmore'
      },
      {
        id: 3,
        first_name: 'Frank',
        last_name: 'Testingood'
      }
    ]
    const expected = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Testington',
        fullName: 'John Testington'
      },
      {
        id: 2,
        firstName: 'Bruce',
        lastName: 'Testingsmore',
        fullName: 'Bruce Testingsmore'
      },
      {
        id: 3,
        firstName: 'Frank',
        lastName: 'Testingood',
        fullName: 'Frank Testingood'
      }
    ]

    const preserveResult = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Testington',
        fullName: 'John Testington',
        first_name: 'John',
        last_name: 'Testington'
      },
      {
        id: 2,
        firstName: 'Bruce',
        lastName: 'Testingsmore',
        fullName: 'Bruce Testingsmore',
        first_name: 'Bruce',
        last_name: 'Testingsmore'
      },
      {
        id: 3,
        firstName: 'Frank',
        lastName: 'Testingood',
        fullName: 'Frank Testingood',
        first_name: 'Frank',
        last_name: 'Testingood'
      }
    ]
    const mapped = mapCollection(toMap, mappingConfig, false)
    const mappedPreserve = mapCollection(toMap, mappingConfig, true)

    expect(typeof mapped).toEqual('object')
    expect(mapped.hasOwnProperty('length')).toEqual(true)

    expect(mapped).toEqual(expected)
    expect(mappedPreserve).toEqual(preserveResult)
  })

  test('Expect [mapModel] to use nested mapping adapter.', () => {
    const toMap = {
      type: 'photo_gallery',
      image: {
        url: 'http://imagepath.com',
        size: 'xl'
      }
    }

    const nestedMapping: MappingConfig = {
      imagePath: 'url',
      size: {
        type: MappingTypes.Function,
        value: (item: any) => {
          return item.size === 'xl' ? 'big' : 'small'
        }
      }
    }

    const mappingConfig: MappingConfig = {
      type: 'type',
      image: {
        type: MappingTypes.Adapter,
        value: 'image',
        map: nestedMapping,
      }
    }

    const expected = {
      type: 'photo_gallery',
      image: {
        imagePath: 'http://imagepath.com',
        size: 'big'
      }
    }

    const mapped = mapModel(toMap, mappingConfig)

    expect(mapped).toEqual(expected)
  })

  test('Expect [mapModel] to throw MappingError when mapping adapter is incomplete.', () => {
    const toMap = {
      type: 'photo_gallery',
      image: {
        url: 'http://imagepath.com',
        size: 'xl'
      }
    }

    const mappingConfig: MappingConfig = {
      type: 'type',
      image: {
        type: MappingTypes.Adapter,
        //@ts-ignore
        map: null,
      }
    }

    expect(() => mapModel(toMap, mappingConfig)).toThrow(MappingError)
  })

  test('Expect [mapIntention] to map intention by string.', () => {

    interface TestIntentionPayload {
      firstName: string
    }
    class TestIntention extends AbstractIntention<TestIntentionPayload> {
      protected map: MappingConfig = {
        // first_name: 'firstName'
        firstName: 'first_name'
      }
    }

    const payload = {
      firstName: 'Stefan'
    }

    const intention = new TestIntention(payload)

    const result = {
      first_name: 'Stefan'
    }

    expect(intention.toRequest()).toEqual(result)
  })

  test('Expect [mapIntention] to skip field when instruction is not provided.', () => {

    interface TestIntentionPayload {
      firstName: string
    }
    class TestIntention extends AbstractIntention<TestIntentionPayload> {
      protected map: MappingConfig = {
        // @ts-ignore
        firstName: null
      }
    }

    const payload = {
      firstName: 'Stefan'
    }

    const intention = new TestIntention(payload)

    expect(intention.toRequest()).toEqual({ })
  })

  test('Expect [mapIntention] to map intention by function.', () => {
    interface TestIntentionPayload {
      types: object[]
    }
    class TestIntention extends AbstractIntention<TestIntentionPayload> {
      protected map: MappingConfig = {
        types: {
          type: MappingTypes.Function,
          target: 'types',
          value: (item) => item.types.map((type: any) => type.id)
        }
      }
    }

    const payload = {
      types: [
        { name: 'A', id: 1},
        { name: 'B', id: 2},
        { name: 'C', id: 3}
      ]
    }
    const intention = new TestIntention(payload)
    const result = { types: [1, 2, 3] }

    expect(intention.toRequest()).toEqual(result)
  })

  test('Expect [mapIntention] to throw error when mapping function is not provided.', () => {
    interface TestIntentionPayload {
      types: object[]
    }
    class TestIntention extends AbstractIntention<TestIntentionPayload> {
      protected map: MappingConfig = {
        types: {
          type: MappingTypes.Function,
          target: '',
          // @ts-ignore
          value: null
        }
      }
    }

    const payload = {
      types: [
        { name: 'A', id: 1},
        { name: 'B', id: 2},
        { name: 'C', id: 3}
      ]
    }
    const intention = new TestIntention(payload)

    expect(() => intention.toRequest()).toThrow(MappingError)
  })

  test('Expect [mapIntention] to throw error when mapping target is not provided.', () => {
    interface TestIntentionPayload {
      types: object[]
    }
    class TestIntention extends AbstractIntention<TestIntentionPayload> {
      protected map: MappingConfig = {
        types: {
          type: MappingTypes.Function,
          // @ts-ignore
          target: null,
          // @ts-ignore
          value: () => {}
        }
      }
    }

    const payload = {
      types: [
        { name: 'A', id: 1},
        { name: 'B', id: 2},
        { name: 'C', id: 3}
      ]
    }
    const intention = new TestIntention(payload)

    expect(() => intention.toRequest()).toThrow(MappingError)
  })

})
