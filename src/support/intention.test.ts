// Copyright (c) 2021 Move Closer

import { MappingConfig, MappingTypes } from '../contracts/support'

import { AbstractIntention } from '../support/intention'

describe('Test intention methods', () => {
  test('Expect intention [toModel] to return intention payload', () => {
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
          value: () => {
          }
        }
      }
    }

    const payload = {
      types: [
        { name: 'A', id: 1 },
        { name: 'B', id: 2 },
        { name: 'C', id: 3 }
      ]
    }
    const intention = new TestIntention(payload)

    expect(intention.toModel()).toEqual(payload)
  })

  test('Expect intention [toRequest] to return mapped payload', () => {
    interface TestIntentionPayload {
      firstName: string
    }

    class TestIntention extends AbstractIntention<TestIntentionPayload> {
      protected map: MappingConfig = {
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
})
