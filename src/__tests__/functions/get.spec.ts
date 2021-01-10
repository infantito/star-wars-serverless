import { handler } from '../../functions/people/get'
import { eventGenerator } from '../utils'
import mock from '../utils/mock.json'
import dynamodb from '../../libs/dynamodb'

describe('Get People', () => {
  let uid: string = null

  beforeAll(async () => {
    uid = Date.now().toString(36)

    const now = new Date().toISOString()

    await dynamodb
      .put({
        TableName: process.env.PEOPLE_TABLE,
        Item: {
          id: uid,
          ...mock.post.body,
          fecha_creacion: now,
          fecha_edicion: now,
        },
      })
      .promise()
  })

  it('should return a people', async () => {
    expect.assertions(1)

    const event = eventGenerator<null, { id: string }>({
      pathParametersObject: {
        id: uid,
      },
      method: 'GET',
    })

    const response = await handler(event, null, null)

    expect(response).toBeDefined()
  })

  it('should not return a people', async () => {
    expect.assertions(1)

    const event = eventGenerator<null, { id: string }>({
      pathParametersObject: {
        id: 'unknown',
      },
      method: 'GET',
    })

    const response = await handler(event, null, null)

    expect(response).toBeDefined()
  })
})
