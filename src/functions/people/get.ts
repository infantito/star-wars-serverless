import 'source-map-support/register'

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { formatJSONResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'

import schema from './schema'

const get: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  return formatJSONResponse({
    message: 'Welcome to the exciting Serverless world!',
  })
}

export const handler = middyfy(get)
