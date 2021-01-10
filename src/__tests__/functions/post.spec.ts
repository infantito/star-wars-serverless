import { handler } from '../../functions/people/post'
import { eventGenerator } from '../utils'
import mock from '../utils/mock.json'

describe('Post People', () => {
  it('should create a people', async () => {
    expect.assertions(1)

    const event = eventGenerator<typeof mock.post.body, null>({
      body: mock.post.body,
      method: 'POST',
    })

    const response = await handler(event, null, null)

    expect(response).toBeDefined()
  })
})
