import { Response } from '@/services/http/response'

describe('Test Response methods', () => {
  test('Expect method [hasErrors] to return true when errors object is provided', () => {
    const response = new Response(400, {}, {}, { failed: true })

    expect(response.hasErrors()).toEqual(true)
  })

  test('Expect method [hasErrors] to return false when errors object is null', () => {
    const response = new Response(400, {}, {}, null)

    expect(response.hasErrors()).toEqual(false)
  })

  test('Expect method [hasErrors] to return true when errors object is array', () => {
    const response = new Response(400, {}, {}, [
      {error1: true},
      {error2: true}
    ])

    expect(response.hasErrors()).toEqual(true)
  })

  test('Expect method [isSuccessful] to return true when response meets success criteria', () => {
    const response = new Response(222, {}, {}, null)

    expect(response.isSuccessful()).toEqual(true)
  })

  test('Expect method [isSuccessful] to return true when response is not successful', () => {
    const response = new Response(500, {}, {}, null)

    expect(response.isSuccessful()).toEqual(false)
  })
})
