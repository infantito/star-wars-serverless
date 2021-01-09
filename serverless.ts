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
    dynamodb: {
      start: {
        stages: [`\${self:provider.stage}`],
        port: 8000,
        dbPath: './offline/dynamodb',
        migration: true,
        seed: true,
      },
      seed: {
        dev: {
          sources: [
            {
              table: 'People',
              sources: ['./offline/dynamodb/people.json'],
            },
          ],
        },
      },
    },
    'serverless-offline': {
      useChildProcesses: true,
    },
  },
  plugins: [
    'serverless-webpack',
    'serverless-dotenv-plugin',
    'serverless-dynamodb-local',
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
      PEOPLE_TABLE: process.env.PEOPLE_TABLE,
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
        Properties: {
          TableName: `\${self:provider.environment.PEOPLE_TABLE}`,
          AttributeDefinitions: [{ AttributeName: 'name', AttributeType: 'S' }],
          KeySchema: [{ AttributeName: 'name', KeyType: 'HASH' }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
}

module.exports = serverlessConfiguration
