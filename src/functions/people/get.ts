import 'source-map-support/register'

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'

import schema from './schema'

const get: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  debugger
  return formatJSONResponse({
    message: 'Welcome to the exciting Serverless world!',
  })
}

export const handler = middyfy(get)
