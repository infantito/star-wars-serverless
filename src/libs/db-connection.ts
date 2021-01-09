import * as dynamoose from 'dynamoose'

const { NODE_ENV } = process.env

const ddb = new dynamoose.aws.sdk.DynamoDB({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.SERVERLESS_REGION,
})

if (NODE_ENV === 'development') {
  dynamoose.aws.ddb.local()
} else {
  dynamoose.aws.ddb.set(ddb)
}
