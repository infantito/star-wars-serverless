import * as dynamoose from 'dynamoose'

const ddb = new dynamoose.aws.sdk.DynamoDB({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.SERVERLESS_REGION,
})

dynamoose.aws.ddb.set(ddb)
