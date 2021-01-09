import type { AWS } from '@serverless/typescript'

import * as functions from './src/functions'

/**
 * IAMCredential
 * https://gist.githubusercontent.com/ServerlessBot/7618156b8671840a539f405dea2704c8/raw/a76e80cdbf2e9808352c3fec79a9625fa345a00d/IAMCredentials.json
 */
const serverlessConfiguration: AWS = {
  service: 'star-wars-api',
  useDotenv: true,
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: [
    'serverless-webpack',
    'serverless-dotenv-plugin',
    'serverless-offline',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: 'dev',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PEOPLE_DYNAMO_TABLE: '${self:service}-People-${opt:stage}',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:DescribeTable',
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem',
        ],
        Resource:
          'arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/*',
      },
    ],
    lambdaHashingVersion: '20201221',
  },
  functions: { ...functions },
  resources: {
    Resources: {
      PeopleTable: {
        Type: 'AWS::DynamoDB::Table',
        DeletionPolicy: 'Retain',
        Properties: {
          TableName: `\${self:service}-people-\${opt:stage}`,
          AttributeDefinitions: [
            { AttributeName: 'peopleId', AttributeType: 'S' },
          ],
          KeySchema: [{ AttributeName: 'peopleId', KeyType: 'HASH' }],
          BillingMode: 'PAY_PER_REQUEST',
        },
      },
    },
  },
}

module.exports = serverlessConfiguration
