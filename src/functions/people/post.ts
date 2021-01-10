import 'source-map-support/register'

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import dynamodb from '@libs/dynamodb'

import schema from './schema'
// import People from '@models/people'

const create: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async event => {
  try {
    const response = await dynamodb
      .put({
        TableName: process.env.PEOPLE_TABLE,
        Item: {
          name: Date.now().toString(36),
        },
      })
      .promise()

    console.log({ response })
  } catch (error) {
    console.error({ error })
  } finally {
    return formatJSONResponse({
      message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    })
  }
}

export const handler = middyfy(create)
